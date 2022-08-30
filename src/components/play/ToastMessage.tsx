export function ToastMessage({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <div
      id={message}
      className="fixed inset-0 flex items-center justify-center pointer-events-none"
    >
      <div className="bg-orange-500 z-10 rounded-xl p-6 font-semibold text-center overflow-hidden toast-dropdown">
        <h1 className="lowercase first-letter:capitalize text-3xl">
          {message}
        </h1>
      </div>
    </div>
  );
}
