import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Plugins
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Firebase Modules
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { environment } from '../environments/environment';

// Services
import { StudentService } from './services/student.service';
import { AuthGuard } from './services/auth.guard';
import { AuthService } from './services/auth.service';

// Pipes
import { KeysPipe } from './pipes/keys.pipe';
import { FileSizePipe } from './pipes/file-size.pipe';

// Directives
import { DropZoneDirective } from './drop-zone.directive';

// Components
import { AppComponent } from './app.component';
import { IndexComponent } from './components/index/index.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { StudentsAdminComponent } from './components/administrador/students-admin/students-admin.component';

// Students:
import { StudentProfileComponent } from './components/student/student-profile/student-profile.component';
import { StudentRegisterComponent } from './components/student/student-register/student-register.component';
import { StudentsComponent } from './components/students/students.component';

// Enterprises:
import { EnterpriseProfileComponent } from './components/enterprise/enterprise-profile/enterprise-profile.component';
import { EnterpriseRegisterComponent } from './components/enterprise/enterprise-register/enterprise-register.component';

// JobOffers:
import { JobofferListComponent } from './components/joboffer/joboffer-list/joboffer-list.component';
import { JobofferRegisterComponent } from './components/joboffer/joboffer-register/joboffer-register.component';
import { JobofferEditComponent } from './components/joboffer/joboffer-edit/joboffer-edit.component';
import { JobofferViewComponent } from './components/joboffer/joboffer-view/joboffer-view.component';
import { JobofferMainComponent } from './components/joboffer/joboffer-main/joboffer-main.component';
import { EmailAvailableDirective } from './validators/email-available.directive';
import { MatchEmailValidatorDirective } from './validators/match-email.directive';
import { MatchPasswordValidatorDirective } from './validators/match-password.directive';

@NgModule({
  declarations: [
    KeysPipe,
    AppComponent,
    StudentsComponent,
    IndexComponent,
    HeaderComponent,
    LoginComponent,
    DropZoneDirective,
    FileSizePipe,
    StudentRegisterComponent,
    StudentProfileComponent,
    EnterpriseProfileComponent,
    EnterpriseRegisterComponent,
    JobofferListComponent,
    JobofferRegisterComponent,
    JobofferEditComponent,
    JobofferViewComponent,
    LoaderComponent,
    StudentsAdminComponent,
    JobofferMainComponent,
    EmailAvailableDirective,
    MatchEmailValidatorDirective,
    MatchPasswordValidatorDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    NgbModule.forRoot(),
    AppRoutingModule,
    NgxDatatableModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    StudentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
