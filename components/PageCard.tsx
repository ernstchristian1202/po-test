import { Page } from '../types';
import { MoreVertical, Info, FileText, CheckCircle } from 'lucide-react';

export const PageCard = ({ page, active, onClick }: {
  page: Page;
  active: boolean;
  onClick: () => void;
}) => {
  const iconMap = {
    info: <Info className="w-4 h-4" />,
    doc: <FileText className="w-4 h-4" />,
    check: <CheckCircle className="w-4 h-4" />,
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-md border transition-all duration-200
        ${active ? 'bg-white border-orange-400 text-black' : 'bg-gray-100 text-gray-600 border-transparent hover:bg-gray-200'}`}
    >
      {iconMap[page.icon]}
      <span className="text-sm font-medium">{page.name}</span>
      <MoreVertical className="w-4 h-4 ml-auto text-gray-400 hover:text-black cursor-pointer" />
    </button>
  );
};