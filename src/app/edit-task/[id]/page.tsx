'use client';

import EditTaskForm from './EditTaskForm';

export default function EditTaskPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Task</h1>
      <EditTaskForm taskId={params.id} />
    </main>
  );
}