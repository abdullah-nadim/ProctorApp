import { User, RelatedEntityType } from './user';

export class Notification {
  id: number;
  userId: number;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  relatedEntityType: string;
  relatedEntityId?: number | null;
  actionUrl?: string | null;
  createdOn: string;
  modifiedOn: string;
  user?: User | null;

  constructor() {
    this.id = 0;
    this.userId = 0;
    this.title = this.message = '';
    this.isRead = false;
    this.createdAt = new Date().toISOString();
    this.relatedEntityType = RelatedEntityType.Complaint;
    this.relatedEntityId = this.actionUrl = null;
    this.createdOn = this.modifiedOn = '';
  }
}

