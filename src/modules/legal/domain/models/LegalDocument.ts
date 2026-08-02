export type LegalDocumentKey = 'privacy' | 'terms';

export interface LegalSection {
  title: string;
  paragraphs: string[];
  items?: string[];
}

export interface LegalDocument {
  title: string;
  description: string;
  lastUpdated: string;
  introduction: string;
  sections: LegalSection[];
}
