'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { ITask } from '../types/task';
import Spinner from './Spinner';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Omit<ITask, '_id'>>({
    title: initialData?.title || '',
    date: initialData?.date || new Date().toISOString().split('T')[0],
    task: initialData?.task || '',
    learned: initialData?.learned || '',
    conclusion: initialData?.conclusion || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      toast.success(initialData ? 'Task updated successfully' : 'Task created successfully');
    } catch (error) {
      toast.error(initialData ? 'Failed to update task' : 'Failed to create task');
      console.error('Error submitting task:', error);
    } finally {
      setIsSubmitting(false);
    }
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
          disabled={isSubmitting}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-400 flex items-center space-x-2 min-w-[100px] justify-center"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4"><Spinner /></div>
              <span>Saving...</span>
            </>
          ) : (
            <span>Submit</span>
          )}
        </button>
      </div>
    </form>
  );
};