import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Enterprise } from '../../../interfaces/enterprise.interface';
import { EnterpriseService } from '../../../services/enterprise.service';
import { AuthService } from '../../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { EmailAvailableValidator } from "../../../validators/email-available.directive";
import { matchEmailValidator } from "../../../validators/match-email.directive";
import { matchPasswordValidator } from "../../../validators/match-password.directive";

import { Observable } from 'rxjs';
import { map, take, tap, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-enterpriseregister',
  templateUrl: './enterprise-register.component.html',
  styleUrls: ['./enterprise-register.component.scss']
})
export class EnterpriseRegisterComponent implements OnInit {
  public success: boolean;
  public modalMessage: string;

  public formulario: FormGroup;
  // Definimos un objeto empresa con los valores default.
  public enterprise: Enterprise = {
    email:      'alexpinkus@hotmail.com',
    firstName:  'José',
    lastName:   'Castillo Pinkus',
    middleName: 'Alejandro',
    job:        'Gerente',
    department: 'Ventas',
    contactPhone: 99999999999,
    contactAddress: 'Avenida escalofriante #666',
    // Datos empresa
    comercialName:  'Monsters Inc.',
    bussinessName:  'S.A. de C.V.',
    bussinessPhone: '9999999',
    bussinessTurn:  'Enegería Eléctrica',
    description:    'Sustos que dan gusto',
    RFC:            'CAAA9901019Y0',
    logo: '',
    webURL: 'www.google.com',
    address: {
      mainStreet: 'Avenida siempre viva',
      crossings:  '20 y 21',
      postalCode:  97101,
      state:      'Yucatán',
      municipality: 'Mérida',
      city: 'Mérida'
    }
  };

  public file: File;
  public fileError = {
    'unsupported' : false,
    'size' : false,
  };
    // Main task
    task: AngularFireUploadTask;

    // Download URL
    downloadURL: Observable<string>;


  constructor(private enterpriseService: EnterpriseService,
    private storage: AngularFireStorage,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private emailAvailable: EmailAvailableValidator) {
      this.formulario = this.formBuilder.group({
        // Hay que agregrar verificación si existen usuarios:
        email: ['', {
          updateOn: 'blur',
          validators: Validators.compose([Validators.required, Validators.email]),
          asyncValidators : this.emailAvailable.validate.bind(this.emailAvailable)
        }],
        email_confirm: ['', Validators.required],

        password: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9_-]{6,18}/)])],
        password_confirm: ['', Validators.required],
        // Datos contacto
        firstName:      ['', Validators.required],
        lastName:       ['', Validators.required],
        middleName:     ['', Validators.required],
        job:            ['', Validators.required],
        department:     ['', Validators.required],
        contactPhone:   ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]{8,10}/), Validators.max(9999999999)])],
        contactAddress: ['', Validators.required],

        // Datos de la empresa
        comercialName:  ['', Validators.required],
        bussinessName:  ['', Validators.required],
        bussinessPhone: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]{8,10}/), Validators.max(9999999999)])],
        description:    ['', Validators.required],
        bussinessTurn:  ['', Validators.required],
        logo:           [''],
        // tslint:disable-next-line:max-line-length
        RFC: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z]{4}[0-9]{6}[a-zA-Z0-9]{3}/)])],
        webURL: ['', Validators.compose([
          Validators.pattern(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/)])],

        // Dirección de la empresa
        mainStreet:   ['', Validators.required],
        crossings:    ['', Validators.required],
        postalCode:   ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]{5}/), Validators.max(99999)])],
        city:         ['', Validators.required],
        municipality: ['', Validators.required],
        state:        ['', Validators.required],
      }, { validator: Validators.compose([matchEmailValidator, matchPasswordValidator]) });
  }

  ngOnInit() {
  }

  register(registerModal) {
    this.modalMessage = '¿Deseas registrarte?';
    // El modal se invoca con una promesa que se resuelve si el modal es aceptado o se reachaza si es cerrado
    this.modalService.open(registerModal).result.then(() => {
      // Aquí se incluye la lógica cuando el modal ha sido aceptado
      this.authService.signup(this.formulario.value.email, this.formulario.value.password).then(credential => {
        this.uploadFile(this.file, credential.user.uid)
        .then((url) => {
          // Se asignan los valores del formulario al objeto student.
          this.assign(this.enterprise, this.formulario.value);

          // Propiedades adicionales a incluir.
          this.enterprise.createdOn = Date.now();
          this.enterprise.isActive = true;
          this.enterprise.uid = credential.user.uid;
          this.enterprise.logo = url;
          this.enterpriseService.createEnterprise(this.enterprise).then(smt => {
            this.success = true;
            setTimeout(() => {
              this.router.navigate(['/index']);
            }, 3000);
          }).catch((err) => {
            this.success = false;
          });
        }).catch((err) => {
          this.success = false;
        });
      }).catch((err) => {
        this.success = false;
      });
    }, (reason) => {
      // Si el usuario oprime cancelar
    });
  }

  resetForm() {
    this.formulario.reset();
    setTimeout(() => {
      this.router.navigate(['index']);
    }, 400);
  }

  onFileChange(event: FileList) {
    if (event.length === 0) { return; }
    this.file = null;
    // Client-side validation example
    if (event.item(0).type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ');
      this.fileError.unsupported = true;
      return;
    }

    if (event.item(0).size >= (1 * 1024 * 1024)) {
      console.error('file too large ');
      this.fileError.size = true;
      return;
    }

    this.file = event.item(0);
  }

  newsubmit(file: File, id: string) {
    this.uploadFile(file, id).then((url) => {
      console.log('url :', url);
      console.log('typeof url :', typeof url);
    }).catch((err) => {
      console.log('err :', err);
    });
  }

  private uploadFile(file: File, id: string) {

    // The storage path
    const path = `enterprise/${id}_${file.name}`;

    // Totally optional metadata
    const customMetadata = { app: 'My AngularFire-powered PWA!' };

    // The main task
    this.task = this.storage.upload(path, file, { customMetadata });

    const fileRef = this.storage.ref(path);

    // The file's download URL
    // this.task.snapshotChanges().pipe(
    //   finalize(() => this.downloadURL = fileRef.getDownloadURL() )
    // ).subscribe();

    // The file's download URL
    return new Promise<string>((resolve, reject) => {
      this.task.snapshotChanges().pipe(
      finalize(() => this.downloadURL = fileRef.getDownloadURL() )
      ).toPromise()
      .then(() => {
        this.downloadURL = fileRef.getDownloadURL();
        this.downloadURL.toPromise()
        .then((url) => {
          resolve(url);
        }).catch((err) => {
          reject(err);
        });
      }).catch((err) => {
        reject(err);
      });
    });


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
