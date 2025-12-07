import { User } from './user';

export class AuditLog {
  id: number;
  userId?: number | null;
  action: string;
  entityType: string;
  entityId: number;
  oldValues?: string | null;
  newValues?: string | null;
  ipAddress?: string | null;
  userAgent?: string | null;
  createdAt: string;
  createdOn: string;
  modifiedOn: string;
  user?: User | null;

  constructor() {
    this.id = 0;
    this.userId = null;
    this.action = this.entityType = '';
    this.entityId = 0;
    this.oldValues = this.newValues = this.ipAddress = this.userAgent = null;
    this.createdAt = new Date().toISOString();
    this.createdOn = this.modifiedOn = '';
  }
}

