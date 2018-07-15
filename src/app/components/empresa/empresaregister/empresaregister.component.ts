import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Empresa } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-empresaregister',
  templateUrl: './empresaregister.component.html',
  styleUrls: ['./empresaregister.component.scss']
})
export class EmpresaregisterComponent implements OnInit {
  public valid_form: boolean;
  public formulario: FormGroup;
  public empresa: Empresa;
  constructor(private formBuilder: FormBuilder) {
    this.formulario = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      email_confirm: ['', Validators.compose([Validators.required, this.duplicateEmail])],
      password: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9_-]{6,18}/)])],
      password_confirm: ['', Validators.compose([Validators.required, this.duplicatePassword])],
      // Datos contacto
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleName: ['', Validators.required],
      job: ['', Validators.required],
      department: ['', Validators.required],
      phone: ['', Validators.required],
      address: [''],
      // Datos para la empresa
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
  }
  duplicatePassword(input: FormControl) {
  // if (!input.root.controls) {
  //   return null;
  // }
  // const exactMatch = input.root.controls.password.value === input.value;
  // return exactMatch ? null : { mismatchedPassword: true };
}
duplicateEmail(input: FormControl) {
  // if (!input.root.controls) {
  //   return null;
  // }
  // const exactMatch = input.root.controls.email.value === input.value;
  // return exactMatch ? null : { mismatchedEmail: true };
}
  agregar() {
        console.log(this.formulario);
  }

}
