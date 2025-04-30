
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { extractPlaceholders } from '@/lib/placeholderUtils';

interface PlaceholderEditorProps {
  selectedClause: Clause | null;
  onPlaceholdersUpdate: (id: string, replacements: Record<string, string>) => void;
}

const PlaceholderEditor: React.FC<PlaceholderEditorProps> = ({ selectedClause, onPlaceholdersUpdate }) => {
  const [placeholderValues, setPlaceholderValues] = useState<Record<string, string>>({});
  
  useEffect(() => {
    if (selectedClause) {
      const placeholders = extractPlaceholders(selectedClause.content);
      const initialValues = { ...placeholderValues };
      
      // Initialize any new placeholders
      placeholders.forEach(placeholder => {
        if (!initialValues[placeholder]) {
          initialValues[placeholder] = '';
        }
      });
      
      setPlaceholderValues(initialValues);
    } else {
      setPlaceholderValues({});
    }
  }, [selectedClause]);

  const handleValueChange = (placeholder: string, value: string) => {
    setPlaceholderValues(prev => ({
      ...prev,
      [placeholder]: value
    }));
  };

  const handleSubmit = () => {
    if (selectedClause) {
      onPlaceholdersUpdate(selectedClause.id, placeholderValues);
    }
  };

  if (!selectedClause) {
    return (
      <div className="h-full flex items-center justify-center p-6 bg-gray-50">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-500">No clause selected</h3>
          <p className="text-sm text-gray-400 mt-2">Select a clause to edit its placeholders</p>
        </div>
      </div>
    );
  }

  const placeholders = extractPlaceholders(selectedClause.content);

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b bg-slate-50">
        <h2 className="text-lg font-semibold text-gray-800">Placeholder Editor</h2>
        <p className="text-sm text-gray-500">Edit clause placeholders</p>
      </div>
      
      <div className="flex-grow overflow-y-auto p-4">
        <Card className="p-4 mb-4">
          <h3 className="font-medium mb-2">{selectedClause.title}</h3>
          <div className="text-sm mb-4 whitespace-pre-wrap">
            {selectedClause.content}
          </div>
        </Card>

        {placeholders.length > 0 ? (
          <div className="space-y-4">
            {placeholders.map((placeholder) => (
              <div key={placeholder} className="space-y-2">
                <Label htmlFor={`placeholder-${placeholder}`}>{placeholder}</Label>
                <Input
                  id={`placeholder-${placeholder}`}
                  value={placeholderValues[placeholder] || ''}
                  onChange={(e) => handleValueChange(placeholder, e.target.value)}
                  placeholder={`Enter value for ${placeholder}`}
                />
              </div>
            ))}
            <Button onClick={handleSubmit} className="w-full mt-4">
              Apply Changes
            </Button>
          </div>
        ) : (
          <div className="text-center py-6 text-gray-500">
            <p>No placeholders found in this clause.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaceholderEditor;
