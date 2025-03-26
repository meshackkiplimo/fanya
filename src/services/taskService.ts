import { ITask } from '../types/task';

const API_BASE_URL = 'http://localhost:5000/api'; 

const headers = {
  'Content-Type': 'application/json',
};

type TaskStats = {
  totalTasks: number;
  tasksThisMonth: number;
  tasksLast30Days: number;
  monthlyChange: number;
};

export const taskService = {
  async getAllTasks(): Promise<ITask[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: 'GET',
        headers,
      });
      
      if (!response.ok) throw new Error('Failed to fetch tasks');
      return response.json();
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },

  async getTaskById(id: string): Promise<ITask> {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: 'GET',
        headers,
      });
      if (!response.ok) throw new Error('Failed to fetch task');
      return response.json();
    } catch (error) {
      console.error('Error fetching task:', error);
      throw error;
    }
  },

  async createTask(task: Omit<ITask, '_id'>): Promise<ITask> {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: 'POST',
        headers,
        body: JSON.stringify(task),
      });
      if (!response.ok) throw new Error('Failed to create task');
      return response.json();
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  },

  async updateTask(id: string, task: Partial<ITask>): Promise<ITask> {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(task),
      });
      if (!response.ok) throw new Error('Failed to update task');
      return response.json();
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  },

  async deleteTask(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: 'DELETE',
        headers,
      });
      if (!response.ok) throw new Error('Failed to delete task');
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  },

  calculateTaskStats(tasks: ITask[]): TaskStats {
    const today = new Date();
    const currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const thirtyDaysAgo = new Date(today.setDate(today.getDate() - 30));

    const tasksThisMonth = tasks.filter(task =>
      new Date(task.date) >= currentMonth
    ).length;

    const tasksLastMonth = tasks.filter(task =>
      new Date(task.date) >= lastMonth && new Date(task.date) < currentMonth
    ).length;

    const tasksLast30Days = tasks.filter(task =>
      new Date(task.date) >= thirtyDaysAgo
    ).length;

    const monthlyChange = tasksLastMonth === 0
      ? 100
      : ((tasksThisMonth - tasksLastMonth) / tasksLastMonth) * 100;

    return {
      totalTasks: tasks.length,
      tasksThisMonth,
      tasksLast30Days,
      monthlyChange,
    };
  },
};