import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard, NotAuthGuard } from './services/auth.guard';
import { ProfileGuard } from './services/profile.guard';
import { StudentGuard, NotStudentGuard } from './services/student.guard';
import { IndexComponent } from './components/index/index.component';
// Componentes de Students
import { StudentRegisterComponent } from './components/student/student-register/student-register.component';
import { StudentProfileComponent } from './components/student/student-profile/student-profile.component';
import { StudentsComponent } from './components/students/students.component';
// Componentes de Enterprises
import { EnterpriseRegisterComponent } from './components/enterprise/enterprise-register/enterprise-register.component';
import { EnterpriseProfileComponent } from './components/enterprise/enterprise-profile/enterprise-profile.component';

import { JobofferRegisterComponent } from './components/joboffer/joboffer-register/joboffer-register.component';
import { JobofferListComponent } from './components/joboffer/joboffer-list/joboffer-list.component';


import { LoginComponent } from './components/login/login.component';

import { StudentsAdminComponent } from './components/administrador/students-admin/students-admin.component';
import { JobofferViewComponent } from './components/joboffer/joboffer-view/joboffer-view.component';
import { JobofferMainComponent } from './components/joboffer/joboffer-main/joboffer-main.component';
import { NotfoundComponent } from './shared/notfound/notfound.component';

const routes: Routes = [
     { path: 'index', component: IndexComponent },
     { path: 'students', component: StudentsComponent },
     // Rutas de registro (creación en DB).
     { path: 'register/student',   component: StudentRegisterComponent, canActivate: [NotAuthGuard] },
     { path: 'register/employeer', component: EnterpriseRegisterComponent, canActivate: [NotAuthGuard] },
     { path: 'register/joboffer',  component: JobofferRegisterComponent, canActivate: [AuthGuard, NotStudentGuard]  },
     // Rutas de perfiles
     { path: 'jobofferView',  component: JobofferViewComponent},
     { path: 'profile/student/:id', component: StudentProfileComponent, canActivate: [ProfileGuard] },
     { path: 'profile/enterprise/:id', component: EnterpriseProfileComponent, canActivate: [ProfileGuard] },
    // Ruta para listar las ofertas de trabajo de la empresa id.
    // { path: 'list/joboffer/:id', component: JobofferListComponent, canActivate: [ProfileGuard] }
     { path: 'list/joboffers/:id', component: JobofferListComponent, canActivate: [ProfileGuard]},
     { path: 'list/joboffers', component: JobofferMainComponent, canActivate: [StudentGuard] },
     { path: 'joboffer/:id',  component: JobofferViewComponent, canActivate: [AuthGuard]  },

     { path: 'login', component: LoginComponent },
     { path: 'admin', component: StudentsAdminComponent },
     { path: 'ofertas', component: JobofferMainComponent },
     { path: '**', component: NotfoundComponent },

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

