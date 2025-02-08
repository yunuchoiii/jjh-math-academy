"use client";

import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";

interface DNDListProps {
  items: { id: number; label: string; sort: number }[];
  onDragEnd: (updatedItems: { id: number; label: string; sort: number }[]) => void;
}

const DNDList = ({ items, onDragEnd }: DNDListProps) => {
  // requestAnimationFrame 초기화
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  // 드래그 앤 드롭 처리
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const updatedItems = Array.from(items);
    const [movedItem] = updatedItems.splice(result.source.index, 1);
    updatedItems.splice(result.destination.index, 0, movedItem);

    // sort 값을 새롭게 설정
    const sortedItems = updatedItems.map((item, index) => ({
      ...item,
      sort: index,
    }));

    onDragEnd(sortedItems);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {items.sort((a, b) => a.sort! - b.sort!).map((item, index) => (
              <Draggable 
                key={`${item.label}-${item.sort}-${index}`} 
                draggableId={item.sort.toString()} 
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="p-1"
                  >
                    <div className="bg-white px-3 py-2 rounded-xl shadow-2 flex justify-between items-center">
                      <span>{item.label}</span>
                      <i className="fas fa-sort"></i>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
           {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DNDList;