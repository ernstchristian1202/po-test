import { Plus } from "lucide-react";
export const AddPageButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="px-4 py-2 rounded-md bg-white text-sm border hover:shadow"
  >
    <Plus className="w-5 h-5 mr-1 inline-block" />
    <span>Add Page</span>
  </button>
);