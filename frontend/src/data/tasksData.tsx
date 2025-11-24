import { Task } from "@/lib/types/task";

export const tasks: Task[] = [
  // --- Existing tasks ---
  {
    id: "1a2b3c4d-1111-2222-3333-444455556666",
    user_id: "u1234567-aaaa-bbbb-cccc-111122223333",
    habit_id: "h1111111-aaaa-bbbb-cccc-111122223333",
    title: "☀️ Morning Run",
    description: "Run 3 miles around the park",
    color: "#FF5733",
    category: "Health",
    expected_at: "2025-11-03T07:00:00Z",
    actual_at: "2025-11-03T07:15:00Z",
    created_at: "2025-11-02T22:00:00Z",
    duration: 15
  },
  {
    id: "2b3c4d5e-2222-3333-4444-555566667777",
    user_id: "u1234567-aaaa-bbbb-cccc-111122223333",
    habit_id: "h2222222-aaaa-bbbb-cccc-111122223333",
    title: "📚 Read a Book",
    description: "Read 20 pages of a personal development book",
    color: "#33FF57",
    category: "Education",
    expected_at: "2025-11-03T08:00:00Z",
    actual_at: "2025-11-03T08:10:00Z",
    created_at: "2025-11-02T22:05:00Z",
    duration: 30
  },
  {
    id: "3c4d5e6f-3333-4444-5555-666677778888",
    user_id: "u1234567-aaaa-bbbb-cccc-111122223333",
    habit_id: "h3333333-aaaa-bbbb-cccc-111122223333",
    title: "🧘‍♂️ Meditation",
    description: "Meditate for 15 minutes",
    color: "#3357FF",
    category: "Wellness",
    expected_at: "2025-11-03T09:00:00Z",
    actual_at: "2025-11-03T09:05:00Z",
    created_at: "2025-11-02T22:10:00Z",
    duration: 30
  },
  {
    id: "4d5e6f7g-4444-5555-6666-777788889999",
    user_id: "u1234567-aaaa-bbbb-cccc-111122223333",
    habit_id: "h3333333-aaaa-bbbb-cccc-111122223333",
    title: "🧘‍♂️ Meditation",
    description: "Meditate for 15 minutes",
    color: "#3357FF",
    category: "Wellness",
    expected_at: "2025-11-04T09:00:00Z",
    actual_at: "2025-11-04T09:05:00Z",
    created_at: "2025-11-04T22:10:00Z",
    duration: 45
  },

  // --- New tasks for October 27, 2025 ---
  {
    id: "a1b2c3d4-aaaa-bbbb-cccc-ddddeeeeffff",
    user_id: "u1234567-aaaa-bbbb-cccc-111122223333",
    habit_id: "h1111111-aaaa-bbbb-cccc-111122223333",
    title: "☀️ Morning Run",
    description: "Run 2.5 miles around the park",
    color: "#FF5733",
    category: "Health",
    expected_at: "2025-11-18T07:00:00Z",
    actual_at: "2025-11-18T07:20:00Z",
    created_at: "2025-10-26T22:00:00Z",
    duration: 20
  },
  {
    id: "b2c3d4e5-bbbb-cccc-dddd-eeeeffff0000",
    user_id: "u1234567-aaaa-bbbb-cccc-111122223333",
    habit_id: "h2222222-aaaa-bbbb-cccc-111122223333",
    title: "📖 Study Time",
    description: "Review notes for the upcoming presentation",
    color: "#33FF57",
    category: "Education",
    expected_at: "2025-11-18T08:30:00Z",
    actual_at: "2025-11-18T08:40:00Z",
    created_at: "2025-10-26T22:05:00Z",
    duration: 45
  },
  {
    id: "c3d4e5f6-cccc-dddd-eeee-ffff11112222",
    user_id: "u1234567-aaaa-bbbb-cccc-111122223333",
    habit_id: "h4444444-aaaa-bbbb-cccc-111122223333",
    title: "🍳 Healthy Breakfast",
    description: "Prepare oatmeal and fruit smoothie",
    color: "#FFD133",
    category: "Health",
    expected_at: "2025-11-18T09:15:00Z",
    actual_at: "2025-11-18T09:25:00Z",
    created_at: "2025-10-26T22:15:00Z",
    duration: 30
  },
  {
    id: "d4e5f6g7-dddd-eeee-ffff-111122223333",
    user_id: "u1234567-aaaa-bbbb-cccc-111122223333",
    habit_id: "h5555555-aaaa-bbbb-cccc-111122223333",
    title: "💻 Deep Work Session",
    description: "Focus on key project tasks without distractions",
    color: "#33C1FF",
    category: "Work",
    expected_at: "2025-11-18T10:00:00Z",
    actual_at: "2025-11-18T10:05:00Z",
    created_at: "2025-10-26T22:20:00Z",
    duration: 120
  },
  {
    id: "e5f6g7h8-eeee-ffff-1111-222233334444",
    user_id: "u1234567-aaaa-bbbb-cccc-111122223333",
    habit_id: "h6666666-aaaa-bbbb-cccc-111122223333",
    title: "🏋️‍♂️ Gym Workout",
    description: "Strength training — upper body focus",
    color: "#FF33A8",
    category: "Fitness",
    expected_at: "2025-11-18T17:00:00Z",
    actual_at: "2025-11-18T17:10:00Z",
    created_at: "2025-10-26T22:30:00Z",
    duration: 60
  },
  {
    id: "f6g7h8i9-ffff-1111-2222-333344445555",
    user_id: "u1234567-aaaa-bbbb-cccc-111122223333",
    habit_id: "h7777777-aaaa-bbbb-cccc-111122223333",
    title: "🌙 Evening Reflection",
    description: "Write down 3 things I’m grateful for today",
    color: "#8844FF",
    category: "Wellness",
    expected_at: "2025-11-18T21:30:00Z",
    actual_at: "2025-11-18T21:40:00Z",
    created_at: "2025-10-26T22:45:00Z",
    duration: 15
  }
];
