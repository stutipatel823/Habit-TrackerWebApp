"use client";

import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Calendar, CheckCircle } from "lucide-react";
import Link from "next/link";

type Task = {
  id: string;
  title: string;
  category: string;
  expected_at: string | null;
  actual_at: string | null;
};

export default function Dashboard() {
  const [session, setSession] = useState<Session | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  // Initialize Supabase in the browser
  useEffect(() => {
    const initSupabase = async () => {
      const { createClient } = await import("@supabase/supabase-js");
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      // Get current session
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);

      // Listen to auth changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (_event, session) => setSession(session)
      );

      return () => subscription.unsubscribe();
    };

    initSupabase();
  }, []);

  // Fetch tasks once session is available
  useEffect(() => {
    if (!session) return;

    const fetchTasks = async () => {
      const { createClient } = await import("@supabase/supabase-js");
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", session.user.id)
        .order("expected_at", { ascending: true });

      if (error) console.error(error);
      else setTasks(data as Task[]);
    };

    fetchTasks();
  }, [session]);

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">📊 Dashboard</h1>

      {/* Quick stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-md rounded-2xl">
          <CardContent className="flex items-center gap-3 p-4">
            <BarChart3 className="w-6 h-6 text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">Total Tasks</p>
              <p className="text-lg font-semibold">{tasks.length}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md rounded-2xl">
          <CardContent className="flex items-center gap-3 p-4">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <div>
              <p className="text-sm text-gray-500">Completed</p>
              <p className="text-lg font-semibold">
                {tasks.filter((t) => t.actual_at !== null).length}
              </p>
            </div>
          </CardContent>
        </Card>

        <Link href="/calendar">
          <Card className="shadow-md rounded-2xl">
            <CardContent className="flex items-center gap-3 p-4">
              <Calendar className="w-6 h-6 text-purple-500" />
              <div>
                <p className="text-sm text-gray-500">Upcoming</p>
                <p className="text-lg font-semibold">
                  {tasks.filter((t) => t.expected_at && !t.actual_at).length}
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Task list */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Your Tasks</h2>
        <div className="space-y-2">
          {tasks.length === 0 && (
            <p className="text-gray-500">No tasks yet. Add one to get started!</p>
          )}
          {tasks.map((task) => (
            <Card key={task.id} className="rounded-xl shadow-sm">
              <CardContent className="flex justify-between items-center p-3">
                <div>
                  <p className="font-medium">{task.title}</p>
                  <p className="text-xs text-gray-500">{task.category}</p>
                </div>
                <Button size="sm" variant="outline">
                  Mark Done
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
