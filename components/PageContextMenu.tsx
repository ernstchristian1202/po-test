import { useEffect, useRef } from 'react';

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

  return (
    <div
      ref={menuRef}
      className="absolute top-full right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10"
    >
      <div className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">Set as first page</div>
      <div className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">Rename</div>
      <div className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">Copy</div>
      <div className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">Duplicate</div>
      <div className="border-t my-1" />
      <div className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer">Delete</div>
    </div>
  );
};