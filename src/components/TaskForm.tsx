'use client';

import { useState } from 'react';
import { ITask } from '../types/task';

interface TaskFormProps {
  initialData?: ITask;
  onSubmit: (task: Omit<ITask, '_id'>) => Promise<void>;
  onCancel: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Omit<ITask, '_id'>>({
    title: initialData?.title || '',
    date: initialData?.date || new Date().toISOString().split('T')[0],
    task: initialData?.task || '',
    learned: initialData?.learned || '',
    conclusion: initialData?.conclusion || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-lg shadow">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          required
        />
      </div>
      
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
          Date
        </label>
        <input
          type="date"
          id="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          required
        />
      </div>

      <div>
        <label htmlFor="task" className="block text-sm font-medium text-gray-700">
          Task Description
        </label>
        <textarea
          id="task"
          value={formData.task}
          onChange={(e) => setFormData({ ...formData, task: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          rows={3}
          required
        />
      </div>

      <div>
        <label htmlFor="learned" className="block text-sm font-medium text-gray-700">
          What You Learned
        </label>
        <textarea
          id="learned"
          value={formData.learned}
          onChange={(e) => setFormData({ ...formData, learned: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          rows={3}
          required
        />
      </div>

      <div>
        <label htmlFor="conclusion" className="block text-sm font-medium text-gray-700">
          Conclusion
        </label>
        <textarea
          id="conclusion"
          value={formData.conclusion}
          onChange={(e) => setFormData({ ...formData, conclusion: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          rows={3}
          required
        />
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
    </form>
  );
};