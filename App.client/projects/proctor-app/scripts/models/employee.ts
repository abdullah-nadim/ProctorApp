export class Employee {
  id: number;
  tenantId: number;
  userId: number | null;
  name: string;
  phone: string;
  hasSystemAccess: boolean;
  hasTerminalAccess: boolean;
  isActive: boolean;
  createdOn: string;
  modifiedOn: string;

  constructor() {
    this.id = 0;
    this.tenantId = 0;
    this.userId = null;
    this.name = '';
    this.phone = '';
    this.hasSystemAccess = false;
    this.hasTerminalAccess = false;
    this.isActive = true;
    this.createdOn = '';
    this.modifiedOn = '';
  }
} 
