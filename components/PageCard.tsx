import { Page } from '../types';
import { MoreVertical, Info, FileText, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { PageContextMenu } from './PageContextMenu';

export const PageCard = ({ page, active, onClick }: {
  page: Page;
  active: boolean;
  onClick: () => void;
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const iconMap = {
    info: <Info className="w-5 h-5" />, 
    doc: <FileText className="w-5 h-5" />, 
    check: <CheckCircle className="w-5 h-5" />,
  };

  const iconColor = active ? 'text-orange-500' : 'text-gray-400 group-hover:text-gray-500';
  const textColor = active ? 'text-black' : 'text-gray-500 group-hover:text-gray-600';
  const borderStyle = active
    ? 'border border-orange-500'
    : 'border border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-200';
  const bgStyle = active
    ? 'bg-white'
    : 'bg-gray-100 hover:bg-gray-200';

  return (
    <div className="relative group">
      <button
        onClick={onClick}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-150 outline-none ${bgStyle} ${borderStyle}`}
      >
        <span className={iconColor}>{iconMap[page.icon]}</span>
        <span className={`text-sm font-medium ${textColor}`}>{page.name}</span>
        {active && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(!menuOpen);
            }}
            className="ml-auto text-gray-400 hover:text-gray-600"
          >
            <MoreVertical className="w-4 h-4 cursor-pointer" />
          </div>
        )}
      </button>
      {menuOpen && (
        <PageContextMenu onClose={() => setMenuOpen(false)} />
      )}
    </div>
  );
};