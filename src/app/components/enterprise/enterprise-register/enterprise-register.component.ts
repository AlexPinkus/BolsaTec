import { Component, OnInit, Input } from '@angular/core';
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
    phone_contact: 99999999999,
    address_contact: '',
    // Datos empresa
    comercialName:  '',
    bussinessName:  'Monsters Inc.',
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

  @Input() ruta: string;
  read_flag: boolean;
  constructor(private enterpriseService: EnterpriseService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private rutaURL: Router,
    private activatedRoute: ActivatedRoute) {
    this.formulario = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email, this.match('email_confirm')])],
      email_confirm: ['', Validators.compose([Validators.required, this.match('email')])],
      password: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9_-]{6,18}/), this.match('password_confirm')])],
      password_confirm: ['', Validators.compose([Validators.required,  this.match('password')])],
      // Datos contacto
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleName: ['', Validators.required],
      job: ['', Validators.required],
      department: ['', Validators.required],
      phone: ['', Validators.required],
      address: [''],
      // Datos para la enterprise
      comercialName: ['', Validators.required],
      bussinessName: ['', Validators.required],
      RFC: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z]{4}[0-9]{6}[a-zA-Z0-9]{3}/)])],
      bussinessPhone: ['', Validators.required],
      webURL: ['', Validators.compose([
        Validators.pattern(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/)])],
       mainStreet: ['', Validators.required],
      crossing: ['', Validators.required],
      postalCode: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      city: ['', Validators.required],
      municipality: ['', Validators.required],
      state: ['', Validators.required],
      description: ['', Validators.required],
      bussinessTurn: ['', Validators.required],
      logo: [''],
    });
  }

  ngOnInit() {
    console.log(this.rutaURL.url);
    console.log();
    if (this.rutaURL.url === '/register/employeer') {
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
    // Esta es la primera forma en la que se puede hacer...
    // es más rápida y elegante pero podría ser propensa a errores

    // Borramos los valores que no sirven de nada ...
    // delete this.formulario.value.email;
    // this.enterprise = this.formulario.value as Enterprise;

    // Está es la segunda y es a prueba de fallas:

    // for (const key in this.enterprise) {
    //   if (this.enterprise.hasOwnProperty(key)) {
    //       this.enterprise[key] = this.formulario.value[key];
    //   }
    // }
    // this.enterprise.createdOn = Date.now();
    // this.enterprise.isActive = false;
    console.log(this.enterprise);
  // insertando
  this.authService.signup(this.enterprise.email, 'password').then(credential => {
    alert('Usuario registrado :');
    this.enterprise.uid = credential.user.uid;
    // const newStudent :
    this.enterpriseService.createEnterprise(this.enterprise).then(smt => {
      console.log('smt :', smt);
      console.log('Registrado');
    });
});

  }

}
