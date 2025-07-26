/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  horizontalListSortingStrategy
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';

import { Page } from '../types';
import { generatePage } from '../utils/helpers';
import { InsertButton } from './InsertButton';
import { AddPageButton } from './AddPageButton';
import { PageCard } from './PageCard';

function SortablePage({ page, activeId, onClick }: {
  page: Page;
  activeId: string;
  onClick: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: page.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={isDragging ? 'z-50' : ''}
    >
      <PageCard
        page={page}
        active={page.id === activeId}
        onClick={onClick}
      />
    </div>
  );
}

export const NavigationBar = () => {
  const [pages, setPages] = useState<Page[]>([
    generatePage('Info', 'info'),
    generatePage('Details', 'doc'),
    generatePage('Other', 'doc'),
    generatePage('Ending', 'check'),
  ]);
  const [activeId, setActiveId] = useState(pages[0].id);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPageName, setNewPageName] = useState('');
  const [insertIndex, setInsertIndex] = useState<number | null>(null);

  const insertPage = (index: number) => {
    setInsertIndex(index);
    setIsModalOpen(true);
  };

  const addPage = () => {
    setInsertIndex(null);
    setIsModalOpen(true);
  };

  const confirmAddPage = () => {
    if (newPageName.trim()) {
      const newPage = generatePage(newPageName.trim(), 'doc');
      setPages(prev => {
        const newPages = [...prev];
        if (insertIndex !== null && insertIndex <= newPages.length) {
          newPages.splice(insertIndex, 0, newPage);
        } else {
          newPages.push(newPage);
        }
        return newPages;
      });
      setNewPageName('');
      setInsertIndex(null);
      setIsModalOpen(false);
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragStart = (event: any) => {
    setDraggingId(event.active.id);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    setDraggingId(null);
    if (active.id !== over?.id) {
      const oldIndex = pages.findIndex((p) => p.id === active.id);
      const newIndex = pages.findIndex((p) => p.id === over?.id);
      setPages((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <div className="p-5 bg-gray-100">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToHorizontalAxis]}
      >
        <SortableContext
          items={pages.map((p) => p.id)}
          strategy={horizontalListSortingStrategy}
        >
          <div className="flex items-center bg-white p-4 rounded-md shadow overflow-x-auto">
            {pages.map((page, idx) => (
              <div key={page.id} className="flex items-center">
                <SortablePage
                  page={page}
                  activeId={activeId}
                  onClick={() => setActiveId(page.id)}
                />
                {draggingId === null && (
                  <div
                    className="relative group flex items-center justify-center w-10"
                    onMouseEnter={() => setHoverIndex(idx)}
                    onMouseLeave={() => setHoverIndex(null)}
                  >
                    <div className="w-full h-0.5 border-t border-dashed border-gray-300" />
                    {hoverIndex === idx && (
                      <div className="absolute z-10">
                        <InsertButton onClick={() => insertPage(idx + 1)} />
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
            {draggingId === null && (
              <div className="flex items-center gap-2">
                <AddPageButton onClick={addPage} />
              </div>
            )}
          </div>
        </SortableContext>
      </DndContext>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-80">
            <h2 className="text-lg font-semibold mb-4">Create New Page</h2>
            <input
              type="text"
              value={newPageName}
              onChange={(e) => setNewPageName(e.target.value)}
              placeholder="Enter page name"
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setInsertIndex(null);
                }}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmAddPage}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};