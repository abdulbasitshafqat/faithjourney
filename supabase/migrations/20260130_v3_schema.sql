-- Create profiles table linked to auth.users
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE
);

-- Create progress table for "Continue Reading"
CREATE TABLE IF NOT EXISTS public.user_progress (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  last_surah_id INTEGER,
  last_ayah_id INTEGER,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Create streaks table for Gamification
CREATE TABLE IF NOT EXISTS public.user_streaks (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  current_streak INTEGER DEFAULT 0,
  last_activity_date DATE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_streaks ENABLE ROW LEVEL SECURITY;

-- Policies for Profiles
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR SELECT USING ( true );
CREATE POLICY "Users can insert their own profile." ON public.profiles FOR INSERT WITH CHECK ( auth.uid() = id );
CREATE POLICY "Users can update own profile." ON public.profiles FOR UPDATE USING ( auth.uid() = id );

-- Policies for Progress
CREATE POLICY "Users can view own progress." ON public.user_progress FOR SELECT USING ( auth.uid() = user_id );
CREATE POLICY "Users can insert own progress." ON public.user_progress FOR INSERT WITH CHECK ( auth.uid() = user_id );
CREATE POLICY "Users can update own progress." ON public.user_progress FOR UPDATE USING ( auth.uid() = user_id );

-- Policies for Streaks
CREATE POLICY "Users can view own streaks." ON public.user_streaks FOR SELECT USING ( auth.uid() = user_id );
CREATE POLICY "Users can insert own streaks." ON public.user_streaks FOR INSERT WITH CHECK ( auth.uid() = user_id );
CREATE POLICY "Users can update own streaks." ON public.user_streaks FOR UPDATE USING ( auth.uid() = user_id );

-- Function to handle new user signup (Auto-create profile)
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url, updated_at)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url', now());
  
  -- Initialize streaks
  INSERT INTO public.user_streaks (user_id, current_streak, last_activity_date)
  VALUES (new.id, 0, NULL);
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
