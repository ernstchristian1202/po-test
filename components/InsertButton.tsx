export const InsertButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="rounded-full w-6 h-6 flex items-center justify-center text-sm text-gray-500 hover:bg-gray-200 border border-dashed"
  >
    +
  </button>
);