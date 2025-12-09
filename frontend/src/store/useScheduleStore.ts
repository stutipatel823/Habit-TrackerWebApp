// src/store/useScheduleStore.ts
import { create } from "zustand";
import { getExpectedScheduleItems, deleteExpectedScheduleItem, createExpectedScheduleItem } from "@/api/expected_api";
import type { ScheduleWithTaskItem, ScheduleItem } from "@/lib/types/schedule";

interface ScheduleStore {
  items: (ScheduleWithTaskItem | ScheduleItem)[];
  fetchWeek: (start: Date, end: Date) => Promise<void>;
  addItem: (item: ScheduleItem) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
}

export const useScheduleStore = create<ScheduleStore>((set, get) => ({
  items: [],
  fetchWeek: async (start, end) => {
    const items = await getExpectedScheduleItems(start, end);
    set({ items });
  },
  addItem: async (item) => {
    await createExpectedScheduleItem(item);
    set(state => ({ items: [...state.items, item] }));
  },
  removeItem: async (id) => {
    await deleteExpectedScheduleItem(id);
    set(state => ({ items: state.items.filter(i => i.schedule_id !== id) }));
  },
}));
