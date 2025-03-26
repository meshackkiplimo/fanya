'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { TaskCard } from '../../components/TaskCard';
import { taskService } from '../../services/taskService';
import { ITask } from '../../types/task';
import Spinner from '../../components/Spinner';

export default function PastTasks() {
  const router = useRouter();
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await taskService.getAllTasks();
        // Sort tasks by date in descending order
        const sortedTasks = fetchedTasks.sort((a, b) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setTasks(sortedTasks);
        toast.success('Tasks loaded successfully');
      } catch (err) {
        toast.error('Failed to fetch tasks');
        console.error('Error fetching tasks:', err);
      } finally {
        setIsLoading(false);
      }
    };

    toast.promise(fetchTasks(), {
      loading: 'Loading tasks...',
      success: null, // We handle success in fetchTasks
      error: null, // We handle errors in fetchTasks
    });
  }, []);

  const handleDeleteTask = async (id: string) => {
    await taskService.deleteTask(id);
    setTasks(tasks.filter(task => task._id !== id));
  };

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
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Past Tasks</h1>
      <div className="space-y-6">
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onEdit={() => handleEditTask(task)}
            onDelete={() => task._id && handleDeleteTask(task._id)}
          />
        ))}
        {tasks.length === 0 && (
          <p className="text-center text-gray-500">No past tasks found</p>
        )}
      </div>
    </main>
  );
}