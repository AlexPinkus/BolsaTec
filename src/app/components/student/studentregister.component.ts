import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Student } from '../../interfaces/student.interface';
import { StudentService } from '../../services/student.service';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-studentregister',
  templateUrl: './studentregister.component.html',
  styleUrls: ['./studentregister.component.scss']
})
export class StudentRegisterComponent implements OnInit {

  password: string;
  student: Student = {
    firstName: 'Eduardo',
    lastName: 'Pérez',
    email:    'eduardo.perez@correo.mx',
    phone:    9991131415,
    address: {
      mainStreet: 'Calle 21',
      crossings:  '17 y 29',
      postalCode: 98765,
      state:      'Yucatán'
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
    private route: ActivatedRoute) { }

  ngOnInit() {
  }

  guardar( ) {
    // Aquí hay que verificar que los datos del usuario sean los correctos antes de registrarlo.

    console.log( this.student );
    // insertando
    this._auths.signup(this.student.email, 'password').then(credential => {
        console.log('Usuario registrado :');
        alert('Usuario registrado :');
        this.student.uid = credential.user.uid;
        // const newStudent :
        this.studentService.createStudent(this.student).then(smt => {
          console.log('smt :', smt);
          console.log('Registrado');
        });
    });
    // forma.reset({});
  }

  // guardar() {
  //   // Aquí hay que verificar que los datos del usuario sean los correctos antes de registrarlo.

  //   console.log( this.student );
  //   // insertando
  //   this._auths.signup(this.student.email, 'password').then(credential => {
  //       console.log('Usuario registrado :');
  //       alert('Usuario registrado :');
  //       // this.student.id = credential.user['uid'];
  //       this._studentService.createStudent(this.student).subscribe(data => {
  //         this.successMessage = 'Estudiante Registrado Exitosamente';
  //         this.successMessagebool = true;
  //         // this.router.navigate(['/profile/student', data.name]);
  //       }, error => {
  //         console.error(error);
  //       });
  //   });
  // }

  agregarNuevo( forma: NgForm ) {
    this.router.navigate(['/student', 'nuevo']);
    // forma.reset({casa: 'Marvel'});
  }

}
