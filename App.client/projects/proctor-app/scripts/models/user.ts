export enum UserType {
  Student = 'student',
  Proctor = 'proctor',
  CoordinationOfficer = 'coordination-officer'
}

export interface User {
  id: number;
  name: string;
  email: string;
  userType: UserType;
  avatar?: string;
}

export class UserService {
  private static currentUser: User | null = null;

  static setCurrentUser(user: User): void {
    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  static getCurrentUser(): User | null {
    if (this.currentUser) {
      return this.currentUser;
    }
    const stored = localStorage.getItem('currentUser');
    if (stored) {
      this.currentUser = JSON.parse(stored);
      return this.currentUser;
    }
    return null;
  }

  static clearCurrentUser(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  static getUserType(): UserType | null {
    const user = this.getCurrentUser();
    return user ? user.userType : null;
  }

  static isStudent(): boolean {
    return this.getUserType() === UserType.Student;
  }

  static isProctor(): boolean {
    return this.getUserType() === UserType.Proctor;
  }

  static isCoordinationOfficer(): boolean {
    return this.getUserType() === UserType.CoordinationOfficer;
  }
}

