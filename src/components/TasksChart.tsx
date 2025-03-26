'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';
import { ITask } from '../types/task';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface TasksChartProps {
  tasks: ITask[];
  title: string;
  period: 'daily' | 'monthly';
}

const TasksChart: React.FC<TasksChartProps> = ({ tasks, title, period }) => {
  const processData = () => {
    const tasksByDate = new Map<string, number>();

    tasks.forEach(task => {
      const date = new Date(task.date);
      const key = period === 'daily' 
        ? format(date, 'MMM dd')
        : format(date, 'MMM yyyy');

      tasksByDate.set(key, (tasksByDate.get(key) || 0) + 1);
    });

    const sortedDates = Array.from(tasksByDate.keys()).sort((a, b) => {
      return new Date(a).getTime() - new Date(b).getTime();
    });

    return {
      labels: sortedDates,
      data: sortedDates.map(date => tasksByDate.get(date) || 0),
    };
  };

  const { labels, data } = processData();

  const chartData: ChartData<'line'> = {
    labels,
    datasets: [
      {
        label: 'Tasks',
        data,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default TasksChart;