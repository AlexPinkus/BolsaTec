import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Student } from '../../interfaces/student.interface';
import { StudentService } from '../../services/student.service';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-studentprofile',
  templateUrl: './studentprofile.component.html',
  styleUrls: ['./studentprofile.component.scss']
})
export class StudentProfileComponent implements OnInit {

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

  constructor(private _studentService: StudentService,
    private _auths: AuthService,
    private router: Router,
    private route: ActivatedRoute) {
      this.route.params.subscribe(parametros => {
        console.log(parametros);
        this.id = parametros['id'];
        if ( this.id !== 'nuevo') {
          this._studentService.getStudent(this.id).subscribe(student => {
            console.log('student :', student);
            this.student = student;
          });
        }
      });
    }

  ngOnInit() {
  }

  guardar() {
    // Aquí hay que verificar que los datos del usuario sean los correctos antes de registrarlo.

    console.log( this.student );
    if (this.id === 'nuevo') {
      // insertando
      this._studentService.createStudent(this.student).subscribe(data => {
        this.successMessage = 'Estudiante Registrado Exitosamente';
        this.successMessagebool = true;
        this.router.navigate(['/student', data.name]);
        this._auths.signup(this.student.email, 'password');
      }, error => {
        console.error(error);
      });
    } else {
      // actualizando
      this._studentService.updateStudent(this.student, this.id).subscribe(data => {
        console.log(data);
      }, error => {
        console.error(error);
      });
    }
  }

  agregarNuevo( forma: NgForm ) {
    this.router.navigate(['/student', 'nuevo']);
    // forma.reset({casa: 'Marvel'});
  }

}
