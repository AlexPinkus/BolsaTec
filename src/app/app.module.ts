import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app.routes';

// Services
import { StudentService } from './services/student.service';

// Components
import { AppComponent } from './app.component';
import { StudentComponent } from './components/student/student.component';
import { StudentsComponent } from './components/students/students.component';

// Pipes
import { KeysPipe } from './pipes/keys.pipe';
import { IndexComponent } from './components/index/index.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    StudentsComponent,
    KeysPipe,
    IndexComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    StudentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
