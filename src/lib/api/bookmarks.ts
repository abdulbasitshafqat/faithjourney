import { supabase } from '@/lib/supabase';

export interface Bookmark {
    id: string;
    user_id: string;
    item_id: string;
    type: 'hadith' | 'dua';
    metadata: Record<string, unknown>;
    created_at: string;
}

export async function toggleBookmark(
    itemId: string,
    type: 'hadith' | 'dua',
    metadata: Record<string, unknown>
) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('You must be logged in to bookmark items.');

    // Check if it's already bookmarked
    const { data: existing } = await supabase
        .from('bookmarks')
        .select('id')
        .eq('user_id', user.id)
        .eq('item_id', itemId)
        .eq('type', type)
        .single();

    if (existing) {
        // Remove bookmark
        const { error } = await supabase
            .from('bookmarks')
            .delete()
            .eq('id', existing.id);
        if (error) throw error;
        return { action: 'removed' };
    } else {
        // Add bookmark
        const { error } = await supabase
            .from('bookmarks')
            .insert({
                user_id: user.id,
                item_id: itemId,
                type,
                metadata
            });
        if (error) throw error;
        return { action: 'added' };
    }
}

export async function getBookmarks(type?: 'hadith' | 'dua') {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    let query = supabase
        .from('bookmarks')
        .select('*')
        .eq('user_id', user.id);

    if (type) {
        query = query.eq('type', type);
    }

    const { data, error } = await query.order('created_at', { ascending: false });
    if (error) throw error;
    return data as Bookmark[];
}

export async function isItemBookmarked(itemId: string, type: 'hadith' | 'dua') {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const { data, error } = await supabase
        .from('bookmarks')
        .select('id')
        .eq('user_id', user.id)
        .eq('item_id', itemId)
        .eq('type', type)
        .maybeSingle();

    if (error && error.code !== 'PGRST116') throw error;
    return !!data;
}

export async function checkBookmarksBatch(itemIds: string[], type: 'hadith' | 'dua') {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return {};

    const { data, error } = await supabase
        .from('bookmarks')
        .select('item_id')
        .eq('user_id', user.id)
        .eq('type', type)
        .in('item_id', itemIds);

    if (error) throw error;

    const status: Record<string, boolean> = {};
    itemIds.forEach(id => status[id] = false);
    data?.forEach(b => status[b.item_id] = true);

    return status;
}
