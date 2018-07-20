import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { Enterprise } from '../../../interfaces/interfaces';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-enterpriseregister',
  templateUrl: './enterprise-register.component.html',
  styleUrls: ['./enterprise-register.component.scss']
})
export class EnterpriseRegisterComponent implements OnInit {
  public valid_form: boolean;
  public formulario: FormGroup;
  public enterprise: Enterprise;
  @Input() ruta: string;
  read_flag: boolean;
  constructor(private formBuilder: FormBuilder, private rutaURL: Router, private activatedRoute: ActivatedRoute) {
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

  agregar() {
        console.log(this.formulario);
        this.enterprise.email = this.formulario.value.email;
        this.enterprise.firstName = this.formulario.value.firstName;
        this.enterprise.lastName = this.formulario.value.lastName;
        this.enterprise.middleName = this.formulario.value.middleName;
        this.enterprise.job = this.formulario.value.job;
        this.enterprise.department = this.formulario.value.department;
        this.enterprise.phone_contact = this.formulario.value.phone;
        this.enterprise.address_contact = this.formulario.value.address;
        this.enterprise.comercialName = this.formulario.value.comercialName;
        this.enterprise.bussinessName = this.formulario.value.bussinessName;
        this.enterprise.RFC = this.formulario.value.RFC;
        this.enterprise.bussinessPhone = this.formulario.value.bussinessPhone;
        this.enterprise.webURL = this.formulario.value.webURL;
        this.enterprise.address.mainStreet = this.formulario.value.mainStreet;
        this.enterprise.address.crossings = this.formulario.value.crossing;
        this.enterprise.address.postalCode = this.formulario.value.postalCode;
        this.enterprise.address.city = this.formulario.value.city;
        this.enterprise.address.municipality = this.formulario.value.municipality;
        this.enterprise.address.state = this.formulario.value.state;
        this.enterprise.description = this.formulario.value.description;
        this.enterprise.bussinessTurn = this.formulario.value.bussinessTurn;
        this.enterprise.logo = this.formulario.value.logo;
        this.enterprise.createdOn = Date.now();
        console.log(this.enterprise);
  }

}
