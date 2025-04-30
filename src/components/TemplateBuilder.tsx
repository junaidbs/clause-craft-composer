
import React, { useState, useRef } from 'react';
import { ClauseItem } from './ClauseItem';
import { Button } from '@/components/ui/button';
import { toast } from "@/components/ui/use-toast";
import { ArrowUp, ArrowDown } from 'lucide-react';

interface TemplateBuilderProps {
  selectedClauses: Clause[];
  onClauseSelect: (clause: Clause) => void;
  onClauseRemove: (id: string) => void;
  onClauseReorder: (fromIndex: number, toIndex: number) => void;
}

const TemplateBuilder: React.FC<TemplateBuilderProps> = ({ 
  selectedClauses,
  onClauseSelect,
  onClauseRemove,
  onClauseReorder
}) => {
  const [activeClauseId, setActiveClauseId] = useState<string | null>(null);
  const dropAreaRef = useRef<HTMLDivElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (dropAreaRef.current) {
      dropAreaRef.current.classList.add('bg-blue-50');
    }
  };

  const handleDragLeave = () => {
    if (dropAreaRef.current) {
      dropAreaRef.current.classList.remove('bg-blue-50');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (dropAreaRef.current) {
      dropAreaRef.current.classList.remove('bg-blue-50');
    }
    
    const clauseData = e.dataTransfer.getData('clause');
    if (clauseData) {
      try {
        const clause = JSON.parse(clauseData);
        // Check if clause is already in the template
        if (!selectedClauses.some(c => c.id === clause.id)) {
          onClauseSelect(clause);
          toast({
            title: "Clause added to template",
            description: `Added "${clause.title}" to your template.`,
          });
        } else {
          toast({
            title: "Clause already in template",
            description: "This clause is already in your template.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Failed to parse dragged clause data', error);
      }
    }
  };

  const handleClauseClick = (clause: Clause) => {
    setActiveClauseId(clause.id);
    onClauseSelect(clause);
  };

  const moveClause = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < selectedClauses.length) {
      onClauseReorder(index, newIndex);
    }
  };

  return (
    <div className="flex flex-col h-full border-r">
      <div className="p-4 border-b bg-slate-50">
        <h2 className="text-lg font-semibold text-gray-800">Template Builder</h2>
        <p className="text-sm text-gray-500">Drag clauses here to build your template</p>
      </div>
      
      <div 
        ref={dropAreaRef}
        className="flex-grow overflow-y-auto p-4 transition-colors"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {selectedClauses.length === 0 ? (
          <div className="h-full flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
            <div className="text-center text-gray-500">
              <p>Drag clauses here to start building your template</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {selectedClauses.map((clause, index) => (
              <div key={clause.id} className="relative group">
                <ClauseItem 
                  clause={clause} 
                  onDragStart={() => {}} // No drag start for template clauses
                  onClick={() => handleClauseClick(clause)}
                  isDraggable={false}
                  isSelected={activeClauseId === clause.id}
                />
                <div className="absolute right-2 top-2 flex flex-col space-y-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button 
                    size="icon" 
                    variant="outline" 
                    className="h-6 w-6" 
                    onClick={() => moveClause(index, 'up')}
                    disabled={index === 0}
                  >
                    <ArrowUp size={14} />
                  </Button>
                  <Button 
                    size="icon" 
                    variant="outline" 
                    className="h-6 w-6" 
                    onClick={() => moveClause(index, 'down')}
                    disabled={index === selectedClauses.length - 1}
                  >
                    <ArrowDown size={14} />
                  </Button>
                  <Button 
                    size="icon" 
                    variant="outline" 
                    className="h-6 w-6 text-red-500 hover:text-red-700" 
                    onClick={() => onClauseRemove(clause.id)}
                  >
                    ×
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateBuilder;
