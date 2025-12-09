// src/components/ui/ModalWrapper.tsx

export default function ModalWrapper({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-[10000]"
      onClick={onClose} // clicking on overlay closes modal
    >
      <div
        className="relative bg-white rounded-2xl p-8 shadow-xl w-fit border"
        onClick={(e) => e.stopPropagation()} // prevent closing modal when clicking inside
      >
        {children}
      </div>
    </div>
  );
}
