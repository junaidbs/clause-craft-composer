
interface Clause {
  id: string;
  title: string;
  content: string;
  placeholders?: Record<string, string>;
  category: string;
}

interface TemplateClause extends Clause {
  placeholderValues: Record<string, string>;
}
