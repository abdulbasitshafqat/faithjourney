"use client";

import { useEffect } from "react";

// Extend navigator interface for TypeScript compatibility
interface WebMCPNavigator extends Navigator {
  modelContext?: {
    registerTool: (
      tool: {
        name: string;
        description: string;
        inputSchema: Record<string, unknown>;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        execute: (input: any) => unknown;
        annotations?: Record<string, unknown>;
      },
      options?: { signal: AbortSignal }
    ) => void;
  };
}

export function useWebMCP() {
  useEffect(() => {
    const nav = navigator as WebMCPNavigator;

    // Check for browser capability
    if (!nav.modelContext || typeof nav.modelContext.registerTool !== "function") {
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;

    try {
      // 1. Get daily spiritual goals
      nav.modelContext.registerTool({
        name: "get_daily_spiritual_goals",
        description: "Retrieves the user's daily spiritual goal text, completion status, and set date.",
        inputSchema: { type: "object", properties: {} },
        execute() {
          const text = localStorage.getItem("daily_goal_text") || "";
          const completed = localStorage.getItem("daily_goal_completed") === "true";
          const date = localStorage.getItem("daily_goal_date") || "";
          return { text, completed, date };
        },
        annotations: { readOnlyHint: true }
      }, { signal });

      // 2. Set daily spiritual goals
      nav.modelContext.registerTool({
        name: "set_daily_spiritual_goals",
        description: "Sets or updates the daily spiritual goal text and resets completion status.",
        inputSchema: {
          type: "object",
          properties: {
            goalText: { type: "string", description: "The text describing the daily goal (e.g. 'Read Surah Mulk' or 'Complete 33 Tasbih')." }
          },
          required: ["goalText"]
        },
        execute(input: { goalText: string }) {
          const today = new Date().toISOString().split("T")[0];
          localStorage.setItem("daily_goal_text", input.goalText);
          localStorage.setItem("daily_goal_completed", "false");
          localStorage.setItem("daily_goal_date", today);
          
          // Trigger custom event so reactive UI updates automatically
          window.dispatchEvent(new Event("fj_goals_updated"));
          return { success: true, message: `Goal set to: "${input.goalText}"` };
        }
      }, { signal });

      // 3. Get Tasbih status
      nav.modelContext.registerTool({
        name: "get_tasbih_status",
        description: "Retrieves the current Tasbih counter, today's total counts, and the last update date.",
        inputSchema: { type: "object", properties: {} },
        execute() {
          const count = parseInt(localStorage.getItem("tasbih-count") || "0", 10);
          const totalToday = parseInt(localStorage.getItem("tasbih-total-today") || "0", 10);
          const lastDate = localStorage.getItem("tasbih-last-date") || "";
          return { count, totalToday, lastDate };
        },
        annotations: { readOnlyHint: true }
      }, { signal });

      // 4. Increment Tasbih counter
      nav.modelContext.registerTool({
        name: "increment_tasbih_counter",
        description: "Increments the user's active Tasbih counter and updates the daily total.",
        inputSchema: {
          type: "object",
          properties: {
            amount: { type: "integer", description: "The amount to increment the counter by (defaults to 1).", minimum: 1 }
          }
        },
        execute(input: { amount?: number }) {
          const increment = input.amount ?? 1;
          const currentCount = parseInt(localStorage.getItem("tasbih-count") || "0", 10);
          const currentTotal = parseInt(localStorage.getItem("tasbih-total-today") || "0", 10);
          
          const newCount = currentCount + increment;
          const newTotal = currentTotal + increment;
          const today = new Date().toISOString().split("T")[0];

          localStorage.setItem("tasbih-count", newCount.toString());
          localStorage.setItem("tasbih-total-today", newTotal.toString());
          localStorage.setItem("tasbih-last-date", today);

          // Dispatch event to update state in React
          window.dispatchEvent(new Event("fj_tasbih_updated"));
          return { success: true, count: newCount, totalToday: newTotal, date: today };
        }
      }, { signal });

      // 5. Get Application settings
      nav.modelContext.registerTool({
        name: "get_settings",
        description: "Retrieves the user's configuration settings including language, prayer time calculation method, and school.",
        inputSchema: { type: "object", properties: {} },
        execute() {
          const language = localStorage.getItem("fj_language") || "en";
          const timeFormat = localStorage.getItem("fj_timeFormat") || "12h";
          const method = localStorage.getItem("fj_method") || "1";
          const school = localStorage.getItem("fj_school") || "1";
          const notifications = localStorage.getItem("fj_notifications") !== "false";
          return { language, timeFormat, method, school, notifications };
        },
        annotations: { readOnlyHint: true }
      }, { signal });

    } catch (error) {
      console.warn("Failed to register WebMCP tools:", error);
    }

    // Cleanup: abort signals to unregister tools upon unmount/re-render
    return () => {
      controller.abort();
    };
  }, []);
}
