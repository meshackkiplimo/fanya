'use client';

import { useRouter } from 'next/navigation';
import { TaskForm } from '../../components/TaskForm';
import { taskService } from '../../services/taskService';
import { ITask } from '../../types/task';

export default function AddTask() {
  const router = useRouter();

  const handleSubmit = async (taskData: Omit<ITask, '_id'>) => {
    await taskService.createTask(taskData);
    router.push('/past-tasks');
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Add New Task</h1>
      <TaskForm
        onSubmit={handleSubmit}
        onCancel={() => router.back()}
      />
    </main>
  );
}