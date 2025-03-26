'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { ITask } from '../types/task';
import Spinner from './Spinner';

interface TaskCardProps {
  task: ITask;
  onEdit: (task: ITask) => void;
  onDelete: (id: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = async () => {
    setIsEditing(true);
    try {
      await onEdit(task);
    } catch (error) {
      toast.error('Failed to edit task');
      console.error('Error editing task:', error);
    } finally {
      setIsEditing(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    
    setIsDeleting(true);
    try {
      await onDelete(task._id!);
      toast.success('Task deleted successfully');
    } catch (error) {
      toast.error('Failed to delete task');
      console.error('Error deleting task:', error);
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
          <p className="text-sm text-gray-500">{new Date(task.date).toLocaleDateString()}</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleEdit}
            disabled={isEditing || isDeleting}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium disabled:text-blue-400 flex items-center space-x-1 min-w-[60px]"
          >
            {isEditing ? (
              <>
                <div className="w-4 h-4"><Spinner /></div>
                <span>Editing...</span>
              </>
            ) : (
              <span>Edit</span>
            )}
          </button>
          <button
            onClick={handleDelete}
            disabled={isEditing || isDeleting}
            className="text-red-600 hover:text-red-800 text-sm font-medium disabled:text-red-400 flex items-center space-x-1 min-w-[60px]"
          >
            {isDeleting ? (
              <>
                <div className="w-4 h-4"><Spinner /></div>
                <span>Deleting...</span>
              </>
            ) : (
              <span>Delete</span>
            )}
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <h4 className="text-sm font-medium text-gray-700">Task Description</h4>
          <p className="mt-1 text-sm text-gray-600">{task.task}</p>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700">Learned</h4>
          <p className="mt-1 text-sm text-gray-600">{task.learned}</p>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700">Conclusion</h4>
          <p className="mt-1 text-sm text-gray-600">{task.conclusion}</p>
        </div>
      </div>
    </div>
  );
};