
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Search } from 'lucide-react';
import { ClauseItem } from './ClauseItem';
import RelatedClauses from './RelatedClauses';

interface ClauseCategory {
  id: string;
  title: string;
  clauses: Clause[];
}

interface ClauseSidebarProps {
  categories: ClauseCategory[];
  onDragStart: (clause: Clause, e: React.DragEvent) => void;
  onClauseSelect?: (clause: Clause) => void;
}

const ClauseSidebar: React.FC<ClauseSidebarProps> = ({ categories, onDragStart, onClauseSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClause, setSelectedClause] = useState<Clause | null>(null);
  
  // Filter categories based on search term
  const filteredCategories = categories.map(category => ({
    ...category,
    clauses: category.clauses.filter(clause => 
      clause.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      clause.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.clauses.length > 0);

  // Get related clauses based on selected clause's category
  const getRelatedClauses = (clause: Clause | null): Clause[] => {
    if (!clause) return [];
    
    // Find clauses with the same category but exclude the selected one
    const allClauses = categories.flatMap(cat => cat.clauses);
    return allClauses.filter(c => 
      c.category === clause.category && c.id !== clause.id
    ).slice(0, 5); // Limit to 5 suggestions
  };

  const handleClauseClick = (clause: Clause) => {
    setSelectedClause(clause);
    if (onClauseSelect) {
      onClauseSelect(clause);
    }
  };

  const relatedClauses = getRelatedClauses(selectedClause);

  return (
    <div className="flex flex-col h-full border-r">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            placeholder="Search clause categories..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>
      <div className="overflow-y-auto flex-grow flex flex-col">
        {/* Related clauses section */}
        {selectedClause && relatedClauses.length > 0 && (
          <div className="px-2 pt-2">
            <RelatedClauses
              clause={selectedClause}
              relatedClauses={relatedClauses}
              onClose={() => setSelectedClause(null)}
              onDragStart={onDragStart}
              onSelectClause={handleClauseClick}
            />
          </div>
        )}
        
        {/* Main categories accordion */}
        <Accordion type="multiple" className="w-full">
          {filteredCategories.map((category) => (
            <AccordionItem key={category.id} value={category.id}>
              <AccordionTrigger className="px-4 py-2 text-sm font-medium hover:bg-slate-50">
                {category.title}
              </AccordionTrigger>
              <AccordionContent>
                <div className="px-2 py-1">
                  {category.clauses.map((clause) => (
                    <ClauseItem 
                      key={clause.id} 
                      clause={clause} 
                      onDragStart={onDragStart}
                      onClick={() => handleClauseClick(clause)}
                      isSelected={selectedClause?.id === clause.id}
                    />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default ClauseSidebar;
