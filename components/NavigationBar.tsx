// 10. components/NavigationBar.tsx
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

  const insertPage = (index: number) => {
    const newPage = generatePage('New', 'doc');
    const newPages = [...pages];
    newPages.splice(index, 0, newPage);
    setPages(newPages);
  };

  const addPage = () => {
    setPages([...pages, generatePage('New', 'doc')]);
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
    </div>
  );
};