import type { LegalRepository } from '@legal/application/ports/LegalRepository';
import type { LegalDocument, LegalDocumentKey } from '@legal/domain/models/LegalDocument';

export class GetLegalDocument {
  static execute(repository: LegalRepository, key: LegalDocumentKey): LegalDocument {
    return repository.getDocument(key);
  }
}
