// src/lib/types/schedule.ts
export type ScheduleItem = {
  item_id: string;
  title: string;
  icon: string;
  color: string;
  start_time: string;
  end_time: string;
  is_habit: boolean;
  duration: number; 
};

export interface PositionedScheduleItem extends ScheduleItem {
  dayIndex: number;
  top: number;
  height: number;
}