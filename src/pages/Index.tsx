
import React, { useState } from 'react';
import ClauseSidebar from '@/components/ClauseSidebar';
import TemplateBuilder from '@/components/TemplateBuilder';
import PlaceholderEditor from '@/components/PlaceholderEditor';
import { clauseCategories } from '@/data/clauseData';
import { replacePlaceholders } from '@/lib/placeholderUtils';
import { toast } from "@/components/ui/use-toast";

const Index = () => {
  const [selectedClauses, setSelectedClauses] = useState<TemplateClause[]>([]);
  const [activeClause, setActiveClause] = useState<TemplateClause | null>(null);

  const handleDragStart = (clause: Clause, e: React.DragEvent) => {
    e.dataTransfer.setData('clause', JSON.stringify(clause));
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleClauseSelect = (clause: Clause) => {
    // Check if clause is already in the template
    const existingIndex = selectedClauses.findIndex(c => c.id === clause.id);
    
    if (existingIndex === -1) {
      // Add clause to template
      const templateClause: TemplateClause = {
        ...clause,
        placeholderValues: {}
      };
      setSelectedClauses([...selectedClauses, templateClause]);
      setActiveClause(templateClause);
    } else {
      // Select existing clause
      setActiveClause(selectedClauses[existingIndex]);
    }
  };

  const handleClauseRemove = (id: string) => {
    setSelectedClauses(selectedClauses.filter(clause => clause.id !== id));
    if (activeClause && activeClause.id === id) {
      setActiveClause(null);
    }
    toast({
      title: "Clause removed",
      description: "The clause has been removed from your template."
    });
  };

  const handleClauseReorder = (fromIndex: number, toIndex: number) => {
    const newClauses = [...selectedClauses];
    const [movedClause] = newClauses.splice(fromIndex, 1);
    newClauses.splice(toIndex, 0, movedClause);
    setSelectedClauses(newClauses);
  };

  const handlePlaceholdersUpdate = (id: string, replacements: Record<string, string>) => {
    const updatedClauses = selectedClauses.map(clause => {
      if (clause.id === id) {
        return {
          ...clause,
          placeholderValues: {
            ...clause.placeholderValues,
            ...replacements
          }
        };
      }
      return clause;
    });
    
    setSelectedClauses(updatedClauses);
    
    // Update the active clause if it's the one that was modified
    if (activeClause && activeClause.id === id) {
      const updatedClause = updatedClauses.find(c => c.id === id);
      if (updatedClause) {
        setActiveClause(updatedClause);
      }
    }
    
    toast({
      title: "Placeholders updated",
      description: "Your changes have been applied to the clause."
    });
  };

  return (
    <div className="flex h-screen">
      {/* Left Sidebar - Clause Categories */}
      <div className="w-1/4 h-full">
        <ClauseSidebar 
          categories={clauseCategories} 
          onDragStart={handleDragStart} 
        />
      </div>
      
      {/* Middle Section - Template Builder */}
      <div className="w-1/2 h-full">
        <TemplateBuilder 
          selectedClauses={selectedClauses.map(clause => ({
            ...clause,
            content: replacePlaceholders(clause.content, clause.placeholderValues)
          }))}
          onClauseSelect={handleClauseSelect}
          onClauseRemove={handleClauseRemove}
          onClauseReorder={handleClauseReorder}
        />
      </div>
      
      {/* Right Sidebar - Placeholder Editor */}
      <div className="w-1/4 h-full">
        <PlaceholderEditor 
          selectedClause={activeClause}
          onPlaceholdersUpdate={handlePlaceholdersUpdate}
        />
      </div>
    </div>
  );
};

export default Index;
