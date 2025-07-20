function FullPageSpinner() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1000] flex items-center justify-center bg-transparent">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-purple-600 border-t-transparent"></div>
    </div>
  );
}

export default FullPageSpinner;
