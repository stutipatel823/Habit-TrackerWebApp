export interface Task {
  id: string;
  user_id: string;
  task_id?: string;
  habit_id?:string;
  title: string;
  description: string;
  color: string;
  category: string;
  expected_at: string;
  actual_at: string;
  created_at: string;
  duration: number;
}