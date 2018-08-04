import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { Enterprise } from '../../../interfaces/enterprise.interface';
import { EnterpriseService } from '../../../services/enterprise.service';
import { AuthService } from '../../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-enterpriseregister',
  templateUrl: './enterprise-register.component.html',
  styleUrls: ['./enterprise-register.component.scss']
})
export class EnterpriseRegisterComponent implements OnInit {

  public read_flag: boolean;
  public valid_form: boolean;
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


  constructor(private enterpriseService: EnterpriseService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.formulario = this.formBuilder.group({
      // Hay que agregrar verificación si existen usuarios:
      email: ['', Validators.compose([Validators.required, Validators.email])],
      email_confirm: ['', Validators.compose([Validators.required, this.match('email')])],

      password: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9_-]{6,18}/)])],
      password_confirm: ['', Validators.compose([Validators.required,  this.match('password')])],
      // Datos contacto
      firstName:      ['', Validators.required],
      lastName:       ['', Validators.required],
      middleName:     ['', Validators.required],
      job:            ['', Validators.required],
      department:     ['', Validators.required],
      contactPhone:   ['', Validators.required],
      contactAddress: ['', Validators.required],

      // Datos de la empresa
      comercialName:  ['', Validators.required],
      bussinessName:  ['', Validators.required],
      bussinessPhone: ['', Validators.required],
      description:    ['', Validators.required],
      bussinessTurn:  ['', Validators.required],
      logo:           [''],
      RFC: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z]{4}[0-9]{6}[a-zA-Z0-9]{3}/)])],
      webURL: ['', Validators.compose([
        Validators.pattern(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/)])],

      // Dirección de la empresa
      mainStreet:   ['', Validators.required],
      crossings:    ['', Validators.required],
      postalCode:   ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      city:         ['', Validators.required],
      municipality: ['', Validators.required],
      state:        ['', Validators.required],
    });
  }

  ngOnInit() {
    console.log(this.router.url);
    console.log();
    if (this.router.url === '/register/employeer') {
     this.read_flag = false;
    } else {
      this.read_flag = true;
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

  register() {
    this.assign(this.enterprise, this.formulario.value);
    this.enterprise.createdOn = Date.now();
    this.enterprise.isActive = true;
    console.log(this.enterprise);
    // insertando
    this.authService.signup(this.enterprise.email, 'password').then(credential => {
      alert('Usuario registrado :');
      this.enterprise.uid = credential.user.uid;
      // const newStudent :
      this.enterpriseService.createEnterprise(this.enterprise).then(smt => {
        console.log('smt :', smt);
        console.log('Registrado');
        this.router.navigate(['/index']);
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
