import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

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
import { StudentRegisterComponent } from './components/student/studentregister.component';
import { StudentsComponent } from './components/students/students.component';
import { IndexComponent } from './components/index/index.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { StudentProfileComponent } from './components/student/studentprofile.component';

@NgModule({
  declarations: [
    KeysPipe,
    AppComponent,
    StudentRegisterComponent,
    StudentsComponent,
    IndexComponent,
    HeaderComponent,
    LoginComponent,
    StudentProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
  ],
  providers: [
    AuthService,
    AuthGuard,
    StudentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
