import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ng6-toastr-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { LoginComponent } from './components/core/authentication/login/login.component';
import { ForgotPasswordComponent } from './components/core/authentication/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './components/core/authentication/change-password/change-password.component';
import { NewPasswordComponent } from './components/core/authentication/new-password/new-password.component';
import { DateTimeFormatPipe } from 'src/app/pipes/date-format.pipe';
import { Settings } from 'src/app/providers/common-services/settings';
import { Api } from 'src/app/providers/common-services/api';
import { SharedService } from 'src/app/providers/common-services/shared.service';
import { DashboardComponent } from './components/core/pages/dashboard/dashboard.component';
import { JwtInterceptor } from 'src/app/interceptor/jwt.interceptor';
import { ErrorInterceptor } from 'src/app/interceptor/error-handler';
import { LoginService } from './providers/page-services/authentication/login.service';
import { ToasterService } from 'src/app/providers/common-services/toaster-service';
import { PasswordService } from './providers/page-services/authentication/password.service';
import { TypographyComponent } from './components/core/pages/typography/typography.component';
import { TablesComponent } from './components/core/pages/tables/tables.component';
import { NotificationsComponent } from './components/core/pages/notifications/notifications.component';
import { PopupsComponent } from './components/core/pages/popups/popups.component';
import { TabsComponent } from './components/core/pages/tabs/tabs.component';
import { MaterialDialogComponent } from './components/core/pages/popups/modal/material-dialog/material-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    NewPasswordComponent,
    DateTimeFormatPipe,
    DashboardComponent,
    TypographyComponent,
    TablesComponent,
    NotificationsComponent,
    PopupsComponent,
    TabsComponent,
    MaterialDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NgxTrimDirectiveModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatStepperModule,
    MatTabsModule,
    MatDialogModule,
    NgbModule
  ],
  providers: [
    Settings,
    Api,
    SharedService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    LoginService,
    ToasterService,
    PasswordService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [MaterialDialogComponent]
})
export class AppModule {}
