import Spinner from '../../../components/Spinner';

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Task</h1>
      <div className="flex justify-center items-center min-h-[50vh]">
        <Spinner />
      </div>
    </div>
  );
}