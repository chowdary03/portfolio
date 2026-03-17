'use client';

interface LoadingStateProps {
  minHeightClassName?: string;
}

interface ErrorStateProps {
  message: string;
  minHeightClassName?: string;
}

export function LoadingState({ minHeightClassName = 'min-h-[60vh]' }: LoadingStateProps) {
  return (
    <div className={`flex ${minHeightClassName} items-center justify-center`}>
      <p className="text-zinc-400">Loading...</p>
    </div>
  );
}

export function ErrorState({ message, minHeightClassName = 'min-h-[60vh]' }: ErrorStateProps) {
  return (
    <div className={`flex ${minHeightClassName} items-center justify-center`}>
      <p className="text-sky-400">{message}</p>
    </div>
  );
}
