import { Task } from "@/lib/types/task";
export const tasks: Task[] = [
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
    id: "3c4d5e6f-3333-4444-5555-666677778888",
    user_id: "u1234567-aaaa-bbbb-cccc-111122223333",
    habit_id: "h3333333-aaaa-bbbb-cccc-111122223333",
    title: "Meditation",
    description: "Meditate for 15 minutes",
    color: "#3357FF",
    category: "Wellness",
    expected_at: "2025-11-04T09:00:00Z",
    actual_at: "2025-11-04T09:05:00Z",
    created_at: "2025-11-04T22:10:00Z",
    duration: 45
  }
];
