import type { LegalRepository } from '@legal/application/ports/LegalRepository';
import type { LegalDocument, LegalDocumentKey } from '@legal/domain/models/LegalDocument';
import { defaultLocale, type Locale } from '@i18n/domain/Locale';

export class GetLegalDocument {
  static execute(
    repository: LegalRepository,
    key: LegalDocumentKey,
    locale: Locale = defaultLocale
  ): LegalDocument {
    return repository.getDocument(key, locale);
  }
}
