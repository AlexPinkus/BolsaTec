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

// Components
import { AppComponent } from './app.component';
import { StudentRegisterComponent } from './components/student/student-register/student-register.component';
import { StudentsComponent } from './components/students/students.component';
import { IndexComponent } from './components/index/index.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { StudentProfileComponent } from './components/student/student-profile/student-profile.component';
import { DropZoneDirective } from './drop-zone.directive';
import { FileSizePipe } from './pipes/file-size.pipe';
import { StudentFormComponent } from './components/student/student-form/student-form.component';
import { EnterpriseProfileComponent } from './components/enterprise/enterprise-profile/enterprise-profile.component';
import { EnterpriseRegisterComponent } from './components/enterprise/enterprise-register/enterprise-register.component';
import { EnterpriseFormComponent } from './components/enterprise/enterprise-form/enterprise-form.component';
import { JobofferListComponent } from './components/joboffer/joboffer-list/joboffer-list.component';
import { JobofferRegisterComponent } from './components/joboffer/joboffer-register/joboffer-register.component';
import { EmpresaprofileComponent } from './components/empresa/empresaprofile/empresaprofile.component';
import { EmpresaregisterComponent } from './components/empresa/empresaregister/empresaregister.component';
import { EmpresaFormComponent } from './components/empresa/empresa-form/empresa-form.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { StudentsAdminComponent } from './components/administrador/students-admin/students-admin.component';

@NgModule({
  declarations: [
    KeysPipe,
    AppComponent,
    StudentRegisterComponent,
    StudentsComponent,
    IndexComponent,
    HeaderComponent,
    LoginComponent,
    StudentProfileComponent,
    DropZoneDirective,
    FileSizePipe,
    StudentFormComponent,
    EnterpriseProfileComponent,
    EnterpriseRegisterComponent,
    EnterpriseFormComponent,
    JobofferListComponent,
    JobofferRegisterComponent,
    EmpresaprofileComponent,
    EmpresaregisterComponent,
    EmpresaFormComponent,
    LoaderComponent,
    StudentsAdminComponent
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
