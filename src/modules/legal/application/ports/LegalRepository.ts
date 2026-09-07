import type { LegalDocument, LegalDocumentKey } from '@legal/domain/models/LegalDocument';
import type { Locale } from '@i18n/domain/Locale';

export interface LegalRepository {
  getDocument(key: LegalDocumentKey, locale?: Locale): LegalDocument;
}
