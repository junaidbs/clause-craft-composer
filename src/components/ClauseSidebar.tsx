
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Search } from 'lucide-react';
import { ClauseItem } from './ClauseItem';

interface ClauseCategory {
  id: string;
  title: string;
  clauses: Clause[];
}

interface ClauseSidebarProps {
  categories: ClauseCategory[];
  onDragStart: (clause: Clause, e: React.DragEvent) => void;
}

const ClauseSidebar: React.FC<ClauseSidebarProps> = ({ categories, onDragStart }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredCategories = categories.map(category => ({
    ...category,
    clauses: category.clauses.filter(clause => 
      clause.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      clause.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.clauses.length > 0);

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
      <div className="overflow-y-auto flex-grow">
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
