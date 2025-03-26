'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Error</h1>
      <div className="p-4 bg-red-100 text-red-700 rounded-md mb-4">
        {error.message || 'Something went wrong while loading the task'}
      </div>
      <button
        onClick={reset}
        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
      >
        Try again
      </button>
    </div>
  );
}