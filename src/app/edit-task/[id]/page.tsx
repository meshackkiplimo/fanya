'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { TaskForm } from '../../../components/TaskForm';
import { taskService } from '../../../services/taskService';
import { ITask } from '../../../types/task';
import Spinner from '../../../components/Spinner';

export default function EditTask({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [task, setTask] = useState<ITask | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const fetchedTask = await taskService.getTaskById(params.id);
        setTask(fetchedTask);
        setError(null);
        toast.success('Task loaded successfully');
      } catch (err) {
        const errorMsg = 'Failed to fetch task';
        setError(errorMsg);
        toast.error(errorMsg);
        console.error('Error fetching task:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTask();
  }, [params.id]);

  const handleSubmit = async (taskData: Omit<ITask, '_id'>) => {
    await taskService.updateTask(params.id, taskData);
    router.push('/past-tasks');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (!task && !isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="p-4 bg-red-100 text-red-700 rounded-md">
          Task not found
        </div>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Task</h1>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {task && (
        <TaskForm
          initialData={task}
          onSubmit={handleSubmit}
          onCancel={() => router.back()}
        />
      )}
    </main>
  );
}