
/**
 * Extract all placeholders from a text string
 * Placeholders are defined as text within {{}} brackets
 */
export function extractPlaceholders(text: string): string[] {
  const placeholderRegex = /\{\{([^{}]+)\}\}/g;
  const matches = text.match(placeholderRegex);
  
  if (!matches) return [];
  
  // Remove the brackets and return unique placeholders
  const placeholders = matches.map(match => match.slice(2, -2).trim());
  return [...new Set(placeholders)];
}

/**
 * Replace all placeholders in a text string with their values
 */
export function replacePlaceholders(text: string, values: Record<string, string>): string {
  let result = text;
  
  Object.entries(values).forEach(([placeholder, value]) => {
    const regex = new RegExp(`\\{\\{${placeholder}\\}\\}`, 'g');
    result = result.replace(regex, value || `{{${placeholder}}}`);
  });
  
  return result;
}
