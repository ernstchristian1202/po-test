import { Page } from '../types';
import { MoreVertical, Info, FileText, CheckCircle } from 'lucide-react';
import { PageContextMenu } from './PageContextMenu';
import * as Popover from '@radix-ui/react-popover';
import { useState } from 'react';

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
    ? 'border border-orange-500 shadow-sm'
    : 'border border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-200';
  const bgStyle = active
    ? 'bg-white'
    : 'bg-gray-100 hover:bg-gray-200';

  return (
    <Popover.Root open={menuOpen} onOpenChange={setMenuOpen}>
      <div className="relative group">
        <Popover.Anchor asChild>
          <button
            onClick={onClick}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-150 outline-none ${bgStyle} ${borderStyle}`}
          >
            <span className={iconColor}>{iconMap[page.icon]}</span>
            <span className={`text-sm font-medium ${textColor}`}>{page.name}</span>
            {active && (
              <Popover.Trigger asChild>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="ml-2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <MoreVertical className="w-4 h-4" />
                </div>
              </Popover.Trigger>
            )}
          </button>
        </Popover.Anchor>
        <Popover.Portal>
          <Popover.Content
            className="z-50"
            side="bottom" // Positions popup below the anchor
            align="start" // Aligns popup's left edge with anchor's left edge (top-left corner)
          >
            <PageContextMenu onClose={() => setMenuOpen(false)} />
          </Popover.Content>
        </Popover.Portal>
      </div>
    </Popover.Root>
  );
};