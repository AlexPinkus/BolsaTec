import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { NgForm } from '@angular/forms';
import { Student } from '../../../interfaces/student.interface';
import { StudentService } from '../../../services/student.service';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { map, take, tap, finalize } from 'rxjs/operators';


@Component({
  selector: 'app-studentprofile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})
export class StudentProfileComponent implements OnInit {

  public studentO: Observable<Student>;
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
    'Licenciatura en Administración en Educación a Distancia'];
  public read_flag = true;

  nuevo = false;
  id: string;

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

  // Main task
  task: AngularFireUploadTask;

  // Progress monitoring
  percentage: Observable<number>;

  snapshot: Observable<any>;

  // Download URL
  downloadURL: Observable<string>;

  // State for dropzone CSS toggling
  isHovering: boolean;

  constructor(private studentService: StudentService,
    private router: Router,
    private storage: AngularFireStorage,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder) {
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
      // Obtenemos los parámetros de las rutas...
      this.activatedRoute.params.subscribe(params => {
        console.log(params);
        this.id = params['id'];
        if ( this.id !== 'nuevo') {
          this.studentO = this.studentService.getStudent(this.id).valueChanges().pipe(
            take(1),
            map(user => {
            console.log('123123user :', user);
            return user;
            }),
            tap(smt => {
              console.log('object :', smt);
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

  }

  toggleHover(event: boolean) {
    this.isHovering = event;
    console.log('isHovering :', this.isHovering);
  }


  startUpload(event: FileList) {
    // The File object
    const file = event.item(0);

    // Client-side validation example
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ');
      return;
    }

    // The storage path
    const path = `test/${new Date().getTime()}_${file.name}`;

    // Totally optional metadata
    const customMetadata = { app: 'My AngularFire-powered PWA!' };

    // The main task
    this.task = this.storage.upload(path, file, { customMetadata });

    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot   = this.task.snapshotChanges();

    const fileRef = this.storage.ref(path);

    // The file's download URL
    this.task.snapshotChanges().pipe(
      finalize(() => this.downloadURL = fileRef.getDownloadURL() )
    ).subscribe();

  }

  // Determines if the upload task is active
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
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

  agregar() {
    console.log(this.formulario);
  }

  actualizar() {
    this.read_flag = !this.read_flag;
  }

  guardar() {
    // Aquí hay que verificar que los datos del usuario sean los correctos antes de registrarlo.

    // console.log( this.student );

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
