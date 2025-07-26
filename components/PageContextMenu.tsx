import { useEffect, useRef } from 'react';
import { Clipboard, Copy, Flag, PenLine, Trash2 } from 'lucide-react';

interface PageContextMenuProps {
  onClose: () => void;
}

export const PageContextMenu = ({ onClose }: PageContextMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const menuItems = [
    { id: 1, label: 'Set as first page', icon: <Flag className="w-4 h-4 text-blue-600" /> },
    { id: 2, label: 'Rename', icon: <PenLine className="w-4 h-4 text-gray-500" /> },
    { id: 3, label: 'Copy', icon: <Clipboard className="w-4 h-4 text-gray-500" /> },
    { id: 4, label: 'Duplicate', icon: <Copy className="w-4 h-4 text-gray-500" /> },
  ];

  return (
    <div
      ref={menuRef}
      className="absolute top-full right-0 mt-2 w-[200px] bg-white border rounded-md shadow-lg z-10 right-[-200px] overflow-hidden"
    >
      <div className="px-4 py-3 font-semibold border-b border-gray-200">Settings</div>
      <div className="py-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={onClose}
            className="w-full flex items-center px-4 py-2 hover:bg-gray-100 transition text-left"
          >
            <span className="mr-2">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>
      <hr className="my-1 mx-4 border-t border-gray-200" />
      <button
        onClick={onClose}
        className="w-full flex items-center px-4 py-2 text-red-600 hover:bg-gray-100 transition"
      >
        <Trash2 className="w-4 h-4 mr-2 text-red-500" />
        Delete
      </button>
    </div>
  );
};