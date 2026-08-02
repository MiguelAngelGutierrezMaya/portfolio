import type { LegalDocument, LegalDocumentKey } from '@legal/domain/models/LegalDocument';

export interface LegalRepository {
  getDocument(key: LegalDocumentKey): LegalDocument;
}
