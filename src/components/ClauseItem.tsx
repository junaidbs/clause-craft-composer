
import React from 'react';
import { Card } from '@/components/ui/card';

interface ClauseItemProps {
  clause: Clause;
  onDragStart: (clause: Clause, e: React.DragEvent) => void;
  onClick?: (clause: Clause) => void;
  isDraggable?: boolean;
  isSelected?: boolean;
}

export const ClauseItem: React.FC<ClauseItemProps> = ({ 
  clause, 
  onDragStart,
  onClick,
  isDraggable = true,
  isSelected = false
}) => {
  const handleDragStart = (e: React.DragEvent) => {
    onDragStart(clause, e);
  };

  return (
    <Card 
      draggable={isDraggable}
      onDragStart={handleDragStart}
      onClick={() => onClick && onClick(clause)}
      className={`p-3 mb-2 cursor-pointer hover:shadow-md transition-shadow text-sm ${
        isSelected ? 'ring-2 ring-primary' : ''
      }`}
    >
      <h4 className="font-medium mb-1 text-gray-900">{clause.title}</h4>
      <p className="text-gray-600 text-xs">{clause.content.length > 100 
        ? `${clause.content.substring(0, 100)}...` 
        : clause.content}
      </p>
    </Card>
  );
};
