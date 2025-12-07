import { Routes } from '@angular/router';
import { MainLayout } from '@pages/main-layout';
import { HomePage } from '@pages/home';
import { LoginPage } from '@pages/login';
import { AboutUsPage } from '@pages/about-us';
import { ContactPage } from '@pages/contact';
import { DashboardLayout } from './components/dashboard-layout';
import { DashboardPage } from '@pages/dashboard';
import { EmployeeListPage } from '@pages/employee-list';
import { HelpSupportPage } from '@pages/help-support';
import { NotificationsPage } from '@pages/notifications';
import { MyProfilePage } from '@pages/my-profile';
import { AccountInformationPage } from '@pages/account-information';
import { ChangePasswordPage } from '@pages/change-password';
import { SignOutPage } from '@pages/sign-out';
import { FileComplaintPage } from '@pages/file-complaint';
import { MyComplaintsPage } from '@pages/my-complaints';
import { AssignCasesPage } from '@pages/assign-cases';
import { ScheduleMeetingPage } from '@pages/schedule-meeting';
import { ManageCasesPage } from '@pages/manage-cases';

export const RouteConfiguration: Routes = [
  {
    path: '', 
    component: MainLayout,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomePage },
      { path: 'login', component: LoginPage },
      { path: 'about-us', component: AboutUsPage },
      { path: 'contact', component: ContactPage },
      { path: 'employee-list', component: EmployeeListPage }
    ]
  },
  {
    path: 'dashboard',
    component: DashboardLayout,
    children: [
      { path: '', component: DashboardPage },
      { path: 'help-support', component: HelpSupportPage },
      { path: 'notifications', component: NotificationsPage },
      { path: 'my-profile', component: MyProfilePage },
      { path: 'my-profile/account-information', component: AccountInformationPage },
      { path: 'my-profile/change-password', component: ChangePasswordPage },
      { path: 'sign-out', component: SignOutPage },
      // Student routes
      { path: 'file-complaint', component: FileComplaintPage },
      { path: 'my-complaints', component: MyComplaintsPage },
      // Proctor routes
      { path: 'assign-cases', component: AssignCasesPage },
      { path: 'schedule-meeting', component: ScheduleMeetingPage },
      // Co-ordination Officer routes
      { path: 'manage-cases', component: ManageCasesPage },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '/home' }
];
