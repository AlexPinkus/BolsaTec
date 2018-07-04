import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './services/auth.guard';
import { ProfileGuard } from './services/profile.guard';
import { IndexComponent } from './components/index/index.component';
import { StudentRegisterComponent } from './components/student/studentregister.component';
import { StudentProfileComponent } from './components/student/studentprofile.component';
import { StudentsComponent } from './components/students/students.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
     { path: 'index', component: IndexComponent },
     { path: 'students', component: StudentsComponent },
     { path: 'register/student',  component: StudentRegisterComponent },
     { path: 'profile/student/:id', component: StudentProfileComponent, canActivate: [ProfileGuard] },
     { path: 'login', component: LoginComponent },
     { path: '**', pathMatch: 'full', redirectTo: 'index' },

    // { path: 'path/:routeParam', component: MyComponent },
    // { path: 'staticPath', component: ... },
    // { path: '**', component: ... },
    // { path: 'oldPath', redirectTo: '/staticPath' },
    // { path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule {}

