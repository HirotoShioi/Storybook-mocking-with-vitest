export function Error() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="p-4 border border-red-200 bg-red-50 text-red-600 rounded-lg text-sm">
        Error loading todos. Please try again later.
      </div>
    </div>
  );
}
