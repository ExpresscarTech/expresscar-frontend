export default function Modal({ open, setOpen, title, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      {/* Caixa */}
      <div className="w-full max-w-md rounded bg-white shadow-lg">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h3 className="text-lg font-medium">{title}</h3>
          <button onClick={() => setOpen(false)} className="text-xl leading-none">
            &times;
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
