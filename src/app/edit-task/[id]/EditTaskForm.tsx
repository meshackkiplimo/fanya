'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { TaskForm } from '../../../components/TaskForm';
import { taskService } from '../../../services/taskService';
import { ITask } from '../../../types/task';
import Spinner from '../../../components/Spinner';

interface EditTaskFormProps {
  taskId: string;
}

export default function EditTaskForm({ taskId }: EditTaskFormProps) {
  const router = useRouter();
  const [task, setTask] = useState<ITask | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const fetchedTask = await taskService.getTaskById(taskId);
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
  }, [taskId]);

  const handleSubmit = async (taskData: Omit<ITask, '_id'>) => {
    await taskService.updateTask(taskId, taskData);
    router.push('/past-tasks');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Spinner />
      </div>
    );
  }

  if (!task && !isLoading) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-md">
        Task not found
      </div>
    );
  }

  return (
    <>
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
    </>
  );
}