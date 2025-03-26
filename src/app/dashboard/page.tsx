'use client';

import { useState, useEffect } from 'react';
import { taskService } from '../../services/taskService';
import { ITask } from '../../types/task';
import StatsCard from '../../components/StatsCard';
import TasksChart from '../../components/TasksChart';
import Spinner from '../../components/Spinner';

export default function Dashboard() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await taskService.getAllTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  const stats = taskService.calculateTaskStats(tasks);

  return (
    <main className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="Total Tasks"
          value={stats.totalTasks}
        />
        <StatsCard
          title="Tasks This Month"
          value={stats.tasksThisMonth}
          trend={{
            value: stats.monthlyChange,
            isUpward: stats.monthlyChange > 0
          }}
        />
        <StatsCard
          title="Tasks (Last 30 Days)"
          value={stats.tasksLast30Days}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TasksChart
          tasks={tasks}
          title="Daily Task Completion"
          period="daily"
        />
        <TasksChart
          tasks={tasks}
          title="Monthly Task Completion"
          period="monthly"
        />
      </div>
    </main>
  );
}