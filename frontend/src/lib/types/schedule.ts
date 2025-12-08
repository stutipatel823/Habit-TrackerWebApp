// src/lib/types/schedule.ts
export type ScheduleItem = {
  schedule_id: string;
  user_id: string;
  task_id: string;
  habit_id: string;
  start_tim: string;
  end_time: string;
};

export type ScheduleWithTaskItem = {
  schedule_id: string;
  title: string;
  icon: string;
  color: string;
  start_time: string;
  end_time: string;
  is_habit: boolean;
  duration: number; 
};

export interface PositionedScheduleItem extends ScheduleWithTaskItem {
  dayIndex: number;
  top: number;
  height: number;
}

export interface CreateScheduleItem {
  task_id: string;
  user_id: string;
  start_time: string;
  end_time: string;
}
