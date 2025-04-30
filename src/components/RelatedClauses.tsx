
import React from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ClauseItem } from './ClauseItem';
import { X } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface RelatedClausesProps {
  clause: Clause | null;
  relatedClauses: Clause[];
  onClose: () => void;
  onDragStart: (clause: Clause, e: React.DragEvent) => void;
  onSelectClause: (clause: Clause) => void;
}

const RelatedClauses: React.FC<RelatedClausesProps> = ({
  clause,
  relatedClauses,
  onClose,
  onDragStart,
  onSelectClause,
}) => {
  if (!clause) return null;

  return (
    <Card className="mb-4 overflow-hidden animate-fade-in">
      <div className="bg-slate-100 p-3 flex justify-between items-center">
        <h4 className="font-medium text-sm">Related to: {clause.title}</h4>
        <button 
          onClick={onClose}
          className="p-1 rounded-full hover:bg-slate-200 transition-colors"
          aria-label="Close related clauses"
        >
          <X size={16} />
        </button>
      </div>
      <Collapsible defaultOpen={true}>
        <CollapsibleTrigger className="flex items-center justify-center w-full py-1 text-xs text-slate-500 hover:bg-slate-100">
          {relatedClauses.length} suggested clause{relatedClauses.length !== 1 ? 's' : ''}
        </CollapsibleTrigger>
        <CollapsibleContent>
          <ScrollArea className="max-h-[200px] p-2">
            {relatedClauses.map((related) => (
              <ClauseItem
                key={related.id}
                clause={related}
                onDragStart={onDragStart}
                onClick={() => onSelectClause(related)}
                isDraggable={true}
              />
            ))}
          </ScrollArea>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default RelatedClauses;
