import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { Joboffer } from '../../../interfaces/joboffer.interface';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-joboffer-register',
  templateUrl: './joboffer-register.component.html',
  styleUrls: ['./joboffer-register.component.scss']
})
export class JobofferRegisterComponent implements OnInit {
  public valid_form: boolean;
  public formulario: FormGroup;
  public joboffer: Joboffer;
  read_flag: boolean;

  // @Input() ruta: string;

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

}
