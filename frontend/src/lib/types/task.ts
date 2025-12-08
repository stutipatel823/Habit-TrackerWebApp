export interface Task {
  id?: string;
  user_id: string;
  title: string;
  icon: string;
  color: string;
  is_recurring: boolean;
  recurring_rule?: string;
  created_at?: string;
  updated_at?: string;
}

export interface TaskCreate {
  user_id: string;
  title: string;
  icon: string;
  color: string;
  is_recurring?: boolean; // optional, defaults to false in backend
}

export interface MockTask {
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