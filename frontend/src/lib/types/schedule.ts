// src/lib/types/schedule.ts
export type ScheduleItem = {
  schedule_id: string;
  title: string;
  start_time: string;
  end_time: string;
  color: string;
  icon: string;
  is_habit: boolean;
  duration?: number; // computed on frontend
};
