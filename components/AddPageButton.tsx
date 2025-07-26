export const AddPageButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="px-4 py-2 rounded-md bg-white text-sm border hover:shadow"
  >
    + Add page
  </button>
);