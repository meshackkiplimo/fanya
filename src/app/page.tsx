'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { TaskCard } from '../components/TaskCard';
import { taskService } from '../services/taskService';
import { ITask } from '../types/task';
import Link from 'next/link';
import Spinner from '../components/Spinner';

export default function Home() {
  const router = useRouter();
  const [recentTasks, setRecentTasks] = useState<ITask[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecentTasks = async () => {
      try {
        const fetchedTasks = await taskService.getAllTasks();
        // Sort by date and get 3 most recent tasks
        const sortedTasks = fetchedTasks
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 3);
        setRecentTasks(sortedTasks);
        setError(null);
        toast.success('Tasks loaded successfully');
      } catch (err) {
        const errorMessage = 'Failed to fetch tasks';
        setError(errorMessage);
        toast.error(errorMessage);
        console.error('Error fetching tasks:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentTasks();
  }, []);

  const handleEditTask = (task: ITask) => {
    if (task._id) {
      router.push(`/edit-task/${task._id}`);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Task Manager</h1>
        <p className="text-xl text-gray-600">Track and manage your daily tasks efficiently</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <Link 
          href="/add-task"
          className="flex items-center justify-center p-8 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors"
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Add New Task</h2>
            <p>Create a new task entry</p>
          </div>
        </Link>

        <Link 
          href="/past-tasks"
          className="flex items-center justify-center p-8 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-colors"
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">View Past Tasks</h2>
            <p>Browse your task history</p>
          </div>
        </Link>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <section className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Recent Tasks</h2>
          <Link 
            href="/past-tasks"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            View All →
          </Link>
        </div>

        <div className="space-y-6">
          {recentTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={() => handleEditTask(task)}
              onDelete={() => {}} // Disable delete on homepage
            />
          ))}
          {recentTasks.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              No tasks yet. 
              <Link href="/add-task" className="text-blue-600 hover:text-blue-800 ml-1">
                Create your first task
              </Link>
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
