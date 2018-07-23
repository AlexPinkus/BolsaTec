import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Student } from '../../../interfaces/student.interface';
import { StudentService } from '../../../services/student.service';
import { AuthService } from '../../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-studentregister',
  templateUrl: './student-register.component.html',
  styleUrls: ['./student-register.component.scss']
})
export class StudentRegisterComponent implements OnInit {

  password: string;
  public valid_form: boolean;
  public formulario: FormGroup;
  private student: Student = {
    idStudent:  'Matricula',
    firstName:  'Jaime',
    lastName:   'Pérez Mendicuti',
    middleName: 'Enrique',
    age:         new Date(),
    sex:        'Hombre',
    email:      'Alexpinkus.64@gmail.com',
    phone:      9999999999,
    address: {
      mainStreet: 'Calle 21',
      crossings:  '17 y 29',
      postalCode: 99999,
      state:      'Yucatán',
      neighborhood: 'Colonia',
      municipality: 'Mérida',
      city: 'Mérida'
    },
    languages: {
      english: {
        written:  '100',
        spoken:   '100',
        translation: '100',
      }
    },
    degree: {
      bachelor: 'Licenciatura en Ingeniería Civil',
      speciality: 'Construcción',
      master: 'Ninguna',
      phd: 'Ninguna',
    },
    experience: 'Ninguna',
    resumeURL:  'url del doc',
    speciality: 'algo',
    maritalStatus: 'Soltero(a)',
    isGraduated: true
  };

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
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) {
      // Aquí se colocan todos los elementos del formulario
      this.formulario = this.formBuilder.group({
        email: ['', Validators.compose([Validators.required, Validators.email])],
        email_confirm: ['', Validators.compose([Validators.required, this.match('email')])],
        password: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9_-]{6,18}/),
        this.match('password_confirm')])],
        password_confirm: ['', Validators.compose([Validators.required, this.match('password')])],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        middleName: ['', Validators.required],
        sex: ['', Validators.required],
        age: ['', Validators.required],
        maritalStatus: ['', Validators.required],
        mainStreet: ['', Validators.required],
        crossings: ['', Validators.required],
        postalCode: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        city: ['', Validators.required],
        municipality: ['', Validators.required],
        state: ['', Validators.required],
        idStudent: ['', Validators.compose([Validators.required, Validators.pattern(/^E{1}[0-9]{7}/)])],
        bachelor: ['', Validators.required],
        speciality: ['', Validators.required],
        master: ['', Validators.required],
        phd: ['', Validators.required],
        spoken: ['', Validators.compose([Validators.required, Validators.max(100), Validators.min(0)])],
        written: ['', Validators.compose([Validators.required, Validators.max(100), Validators.min(0)])],
        translation: ['', Validators.compose([Validators.required, Validators.max(100), Validators.min(0)])],

      });
    }

  ngOnInit() {
  }

  match(controlKey: string) {
    return (control: FormControl): { [s: string]: boolean } => {
        // control.parent es el FormGroup
        if (control.parent) { // en las primeras llamadas control.parent es undefined
          const checkValue  = control.parent.controls[controlKey].value;
          if (control.value !== checkValue) {
            return {
              match: false
            };
          }
        }
        return null;
    };
  }

  register( ) {
    // Esta es la primera forma en la que se puede hacer...
    // es más rápida y elegante pero podría ser propensa a errores

    // Borramos los valores que no sirven de nada ...
    // delete this.formulario.value.email;
    // this.student = this.formulario.value as Enterprise;

    // Está es la segunda y es a prueba de fallas:

    // for (const key in this.student) {
    //   if (this.student.hasOwnProperty(key)) {
    //       this.student[key] = this.formulario.value[key];
    //   }
    // }
    // this.student.createdOn = Date.now();
    // this.student.isActive = false;
    console.log( this.student );
    // insertando
    this.authService.signup(this.student.email, 'password').then(credential => {
        alert('Usuario registrado :');
        this.student.uid = credential.user.uid;
        this.student.role = 'student';
        // const newStudent :
        this.studentService.createStudent(this.student).then(smt => {
          console.log('smt :', smt);
          console.log('Registrado');
          this.router.navigate(['/index']);
        });
    });
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

  // agregarNuevo( forma: NgForm ) {
  //   this.router.navigate(['/student', 'nuevo']);
  //   // forma.reset({casa: 'Marvel'});
  // }

}
