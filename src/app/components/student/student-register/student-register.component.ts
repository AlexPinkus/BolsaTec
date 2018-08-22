import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Student } from '../../../interfaces/student.interface';
import { StudentService } from '../../../services/student.service';
import { AuthService } from '../../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

declare var $: any;
@Component({
  selector: 'app-studentregister',
  templateUrl: './student-register.component.html',
  styleUrls: ['./student-register.component.scss']
})
export class StudentRegisterComponent implements OnInit {
  public success: boolean;
  public formulario: FormGroup;

  public genders = ['Hombre', 'Mujer'];
  public maritalStatuses = ['Soltero(a)', 'Casado(a)'];
  public bachelors = [
    'Licenciatura en Ingeniería Industrial',
    'Licenciatura en Ingeniería Bioquímica',
    'Licenciatura en Ingeniería Ambiental',
    'Licenciatura en Ingeniería Biomédica',
    'Licenciatura en Ingeniería en Gestión Empresarial',
    'Licenciatura en Ingeniería Química',
    'Licenciatura en Ingeniería Eléctrica',
    'Licenciatura en Ingeniería Electrónica',
    'Licenciatura en Ingeniería Mecánica',
    'Licenciatura en Ingeniería Civil',
    'Licenciatura en Sistemas Computacionales',
    'Licenciatura en Administración',
    'Licenciatura en Administración en Educación a Distancia'
  ];

  public modalMessage: string;

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
    isGraduated: true,
    isActive: true,
    role: 'student'
  };

    // Main task
    task: AngularFireUploadTask;

    // Download URL
    downloadURL$: Observable<string>;


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
    private storage: AngularFireStorage,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private modalService: NgbModal) {
      // Aquí se colocan todos los elementos del formulario
      this.formulario = this.formBuilder.group({
        // Datos de usuario
        email: ['', Validators.compose([Validators.required, Validators.email])],
        email_confirm: ['', Validators.compose([Validators.required, this.match('email')])],
        password: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9_-]{6,18}/),
          ])],
        password_confirm: ['', Validators.compose([Validators.required, this.match('password')])],

        // Información Personal
        firstName:     ['', Validators.required],
        middleName:    ['', Validators.required],
        lastName:      ['', Validators.required],
        sex:           ['', Validators.required],
        age:           ['', Validators.required],
        maritalStatus: ['', Validators.required],

        // Dirección
        mainStreet:   ['', Validators.required],
        crossings:    ['', Validators.required],
        postalCode:   ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]{5}/), Validators.max(99999)])],
        city:         ['', Validators.required],
        municipality: ['', Validators.required],
        state:        ['', Validators.required],

        // Información académica
        idStudent:  ['', Validators.compose([Validators.required, Validators.pattern(/^E{1}[0-9]{7}/), Validators.maxLength(9)])],
        bachelor:   ['', Validators.required],
        speciality: ['', Validators.required],
        master:     ['', Validators.required],
        phd:        ['', Validators.required],

        // Inglés
        spoken:      ['', Validators.compose([Validators.required, Validators.max(100), Validators.min(0)])],
        written:     ['', Validators.compose([Validators.required, Validators.max(100), Validators.min(0)])],
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
              match: true
            };
          }
        }
        return null;
    };
  }

  register(registerModal) {
    this.modalMessage = '¿Deseas registrarte?';
    // El modal se invoca con una promesa que se resuelve si el modal es aceptado o se reachaza si es cerrado
    this.modalService.open(registerModal).result.then(() => {
      // Aquí se incluye la lógica cuando el modal ha sido aceptado

      // Crear usuario en firebase auth.
      this.authService.signup(this.formulario.value.email, this.formulario.value.password).then(credential => {
        // Se asignan los valores del formulario al objeto student.
        this.assign(this.student, this.formulario.value);

        // Propiedades adicionales a incluir.
        this.student.createdOn = Date.now();
        this.student.uid = credential.user.uid;

        // Crear student en la base de datos
        this.studentService.createStudent(this.student).then(smt => {
          this.success = true;
          setTimeout(() => {
            this.router.navigate(['/index']);
          }, 3000);
        }).catch((err) => {
          this.success = false;
        });
      })
      .catch((err) => {
        this.success = false;
      });
    }, (reason) => {
      // Si el usuario oprime cancelar
    });
  }


  cancelar( ) {
    this.formulario.reset();
    // this.router.navigate(['/index']);
  }


  private getDismissReason(reason: any): string {

    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  private assign(object: any, objectToCopy: any) {
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        if ( typeof object[key] === 'object') {
          this.assign(object[key], objectToCopy);
        } else if (objectToCopy.hasOwnProperty(key)) {
          object[key] = objectToCopy[key];
        }
      }
    }
  }

}


