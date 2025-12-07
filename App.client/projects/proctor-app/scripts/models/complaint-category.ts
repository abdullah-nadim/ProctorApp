export class ComplaintCategory {
  id: number;
  name: string;
  createdOn: string;
  modifiedOn: string;

  constructor() {
    this.id = 0;
    this.name = '';
    this.createdOn = this.modifiedOn = '';
  }
}

