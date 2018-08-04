import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Student } from '../../../interfaces/student.interface';
import { StudentService } from '../../../services/student.service';
import { AuthService } from '../../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
declare var $: any;
@Component({
  selector: 'app-studentregister',
  templateUrl: './student-register.component.html',
  styleUrls: ['./student-register.component.scss']
})
export class StudentRegisterComponent implements OnInit {

  public valid_form: boolean;
  public formulario: FormGroup;
  password: string;
  nuevo = false;
  id: string;
  closeResult: string;
  mensaje_modal: string;
  flag_exitModal = false;
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
    private formBuilder: FormBuilder,
    private modalService: NgbModal) {
      // Aquí se colocan todos los elementos del formulario
      this.formulario = this.formBuilder.group({
        // Datos de usuario
        email: ['', Validators.compose([Validators.required, Validators.email])],
        email_confirm: ['', Validators.compose([Validators.required, this.match('email')])],
        password: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9_-]{6,18}/),
          this.match('password_confirm')])],
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
        postalCode:   ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        city:         ['', Validators.required],
        municipality: ['', Validators.required],
        state:        ['', Validators.required],

        // Información académica
        idStudent:  ['', Validators.compose([Validators.required, Validators.pattern(/^E{1}[0-9]{7}/)])],
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
    if (this.id != null) {
    this.formulario.patchValue({
      email: this.student.email,
      firstName: this.student.firstName,
      lastName: this.student.lastName,
      middleName: this.student.middleName,
      sex: this.student.sex,
      age: this.student.age,
      maritalStatus: this.student.maritalStatus,
      mainStreet: this.student.address.mainStreet,
      crossings: this.student.address.crossings,
      postalCode: this.student.address.postalCode,
      city: this.student.address.city,
      municipality: this.student.address.municipality,
      state: this.student.address.state,
      idStudent: this.student.idStudent,
      bachelor: this.student.degree.bachelor,
      speciality: this.student.degree.speciality,
      master: this.student.degree.master,
      phd: this.student.degree.phd,
      spoken: this.student.languages.english.spoken,
      written: this.student.languages.english.written,
      translation: this.student.languages.english.translation,
    });
    }
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
    this.assign(this.student, this.formulario.value);
    this.student.createdOn = Date.now();
    this.student.isActive = true;
    console.log(this.student);

    // this.authService.signup(this.student.email, 'password').then(credential => {
    //     alert('Usuario registrado :');
    //     this.student.uid = credential.user.uid;
    //     this.student.role = 'student';
    //     this.studentService.createStudent(this.student).then(smt => {
    //       console.log('smt :', smt);
    //       console.log('Registrado');
    //       this.router.navigate(['/index']);
    //     });
    // });
  }

  cancelar( ) {
    // this.router.navigate(['/index']);
    console.log('cancelar');
    this.formulario.reset();
  }

// --------------------------------------------------------------
// Programador: Félix Ehuan
// Fecha: 18/07/2018
// Función open: Abre un nuevo modal, recibe cómo parámetro un template de angular
// tiene una promesa con resolve si el modal se cierra con la función close (guardar datos)
// tiene una promesa con reject  si el modal se cierra con la función dismiss (cancelar)
  open(modalConfirmacion, modalNotificacion) {
    this.mensaje_modal = '¿Deseas agregar un nuevo estudiante?';

    this.modalService.open(modalConfirmacion).result.then(() => {
      this.register();
      this.studentService.leerJSONStudents();

      //  const notificacion = this.modalService.open(modalNotificacion);
      $.bigBox({
        title: 'Solicitud enviada',
        content: 'Tu perfil será revisado por el administrador de esta página,' +
        'se te notificará por correo electrónico cuando tu solicitud sea aprobada',
        fa: 'fa-save fa-lg',
        tabicon: false,
        sound: false,
        color: '#82ce34',
        timeout: 4000,
        delay: 0.5,
        });
    }, (reason) => {

    });
  }
// --------------------------------------------------------------


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


