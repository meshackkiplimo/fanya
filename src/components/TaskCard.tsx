'use client';

import { ITask } from '../types/task';

interface TaskCardProps {
  task: ITask;
  onEdit: (task: ITask) => void;
  onDelete: (id: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
          <p className="text-sm text-gray-500">{new Date(task.date).toLocaleDateString()}</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(task)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task._id!)}
            className="text-red-600 hover:text-red-800 text-sm font-medium"
          >
            Delete
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