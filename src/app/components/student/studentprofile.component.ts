import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Student } from '../../interfaces/student.interface';
import { StudentService } from '../../services/student.service';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';


@Component({
  selector: 'app-studentprofile',
  templateUrl: './studentprofile.component.html',
  styleUrls: ['./studentprofile.component.scss']
})
export class StudentProfileComponent implements OnInit {

  password: string;
  studentO: Observable<Student>;
  student: Student = {
    firstName: '',
    lastName: '',
    email:    '',
    phone:    0,
    role: 'student',
    address: {
      mainStreet: '',
      crossings:  '',
      postalCode: 0,
      state:      ''
    }
  };

  nuevo = false;
  id: string;
  successMessage: string;
  successMessagebool = false;

  // Posibles errores de validación...
  formErrors = {
    'email': '',
    'password': ''
  };

  validationMessages = {
    'email': {
      'required':      'Email is required.',
      'email':         'Email must be a valid email'
    },
    'password': {
      'required':      'Password is required.',
      'pattern':       'Password must be include at one letter and one number.',
      'minlength':     'Password must be at least 4 characters long.',
      'maxlength':     'Password cannot be more than 40 characters long.',
    }
  };

  constructor(private studentService: StudentService,
    private _auths: AuthService,
    private router: Router,
    private route: ActivatedRoute) {
      // Obtenemos los parámetros de las rutas...
      this.route.params.subscribe(parametros => {
        console.log(parametros);
        this.id = parametros['id'];
        if ( this.id !== 'nuevo') {
          this.studentO = this.studentService.getStudent(this.id).valueChanges().pipe(
            take(1),
            map(user => {
            console.log('123123user :', user);
            return user;
            }),
            tap(smt => {
              console.log('object :', smt);
              this.student = smt;
              console.log('this.student :', this.student);
            })
          );
          console.log('studentO :', this.studentO);
          // this._studentService.studentDocument
          // this._studentService.getStudent(this.id)
          // this._studentService.getStudent(this.id).subscribe(student => {
          //   console.log('student :', student);
          //   this.student = student;
          // });
        }
      });
    }

  ngOnInit() {
    console.log('this.student :', this.student);
    this.route.params.subscribe(parametros => {
      console.log(parametros);
      this.id = parametros['id'];
      if ( this.id !== 'nuevo') {
        this.studentO = this.studentService.getStudent(this.id).valueChanges().pipe(
          take(1),
          map(user => {
          console.log('123123user :', user);
          return user;
          }),
          tap(smt => {
            console.log('object :', smt);
            this.student = smt;
            console.log('this.student :', this.student);
          })
        );
        console.log('studentO :', this.studentO);
        // this._studentService.studentDocument
        // this._studentService.getStudent(this.id)
        // this._studentService.getStudent(this.id).subscribe(student => {
        //   console.log('student :', student);
        //   this.student = student;
        // });
      }
    });
  }

  guardar() {
    // Aquí hay que verificar que los datos del usuario sean los correctos antes de registrarlo.

    console.log( this.student );

      // actualizando
    //   this._studentService.updateStudent(this.student, this.id).subscribe(data => {
    //     console.log(data);
    //   }, error => {
    //     console.error(error);
    //   });
    // }
  }

  // guardar() {
  //   // Aquí hay que verificar que los datos del usuario sean los correctos antes de registrarlo.

  //   console.log( this.student );
  //   if (this.id === 'nuevo') {
  //     // insertando
  //     this._studentService.createStudent(this.student).subscribe(data => {
  //       this.successMessage = 'Estudiante Registrado Exitosamente';
  //       this.successMessagebool = true;
  //       this.router.navigate(['/student', data.name]);
  //       this._auths.signup(this.student.email, 'password');
  //     }, error => {
  //       console.error(error);
  //     });
  //   } else {
  //     // actualizando
  //     this._studentService.updateStudent(this.student, this.id).subscribe(data => {
  //       console.log(data);
  //     }, error => {
  //       console.error(error);
  //     });
  //   }
  // }

  agregarNuevo( forma: NgForm ) {
    this.router.navigate(['/student', 'nuevo']);
    // forma.reset({casa: 'Marvel'});
  }

}
