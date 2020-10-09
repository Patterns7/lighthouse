import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/core/authentication/login/login.component';
import { DashboardComponent } from './components/core/pages/dashboard/dashboard.component';
import { Settings } from 'src/app/providers/common-services/settings';
import { ForgotPasswordComponent } from './components/core/authentication/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './components/core/authentication/change-password/change-password.component';
import { NewPasswordComponent } from './components/core/authentication/new-password/new-password.component';
import { TypographyComponent } from './components/core/pages/typography/typography.component';
import { TablesComponent } from './components/core/pages/tables/tables.component';
import { NotificationsComponent } from './components/core/pages/notifications/notifications.component';
import { PopupsComponent } from './components/core/pages/popups/popups.component';
import { TabsComponent } from "./components/core/pages/tabs/tabs.component";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "login" },
  { path: "login", component: LoginComponent },
  { path: "dashboard", component: DashboardComponent, canActivate: [Settings] },
  { path: "forgotPassword", component: ForgotPasswordComponent },
  { path: "changePassword", component: ChangePasswordComponent },
  { path: "newPassword", component: NewPasswordComponent },
  { path: "typography", component: TypographyComponent },
  { path: "tables", component: TablesComponent },
  { path: "notification", component: NotificationsComponent },
  { path: "popup", component: PopupsComponent },
  { path: "tabs", component: TabsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
