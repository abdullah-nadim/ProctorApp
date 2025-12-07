export class CaseFileDocument {
  id: number;
  caseFileId: number;
  documentPath: string;
  documentType: string;
  uploadedAt: string;
  createdOn: string;
  modifiedOn: string;

  constructor() {
    this.id = 0;
    this.caseFileId = 0;
    this.documentPath = this.documentType = '';
    this.uploadedAt = new Date().toISOString();
    this.createdOn = this.modifiedOn = '';
  }
}

