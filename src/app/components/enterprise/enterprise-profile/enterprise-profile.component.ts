import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { Enterprise } from '../../../interfaces/enterprise.interface';
import { EnterpriseService } from '../../../services/enterprise.service';
import { AuthService } from '../../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-enterpriseprofile',
  templateUrl: './enterprise-profile.component.html',
  styleUrls: ['./enterprise-profile.component.scss']
})
export class EnterpriseProfileComponent implements OnInit {

  public enterpriseO: Observable<Enterprise>;
  public read_flag = true;
  public valid_form: boolean;
  public formulario: FormGroup;

  constructor(private enterpriseService: EnterpriseService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private rutaURL: Router,
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
        contactPhone:   ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]{8,10}/), Validators.maxLength(10)])],
        contactAddress: ['', Validators.required],

        // Datos de la empresa
        comercialName:  ['', Validators.required],
        bussinessName:  ['', Validators.required],
        bussinessPhone: ['', [Validators.required, Validators.pattern(/^[0-9]{8,10}/), Validators.maxLength(10)]],
        description:    ['', Validators.required],
        bussinessTurn:  ['', Validators.required],
        logo:           [''],
        // tslint:disable-next-line:max-line-length
        RFC: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z]{4}[0-9]{6}[a-zA-Z0-9]{3}/), Validators.maxLength(13)])],
        webURL: ['', Validators.compose([
          Validators.pattern(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/)])],

        // Dirección de la empresa
        mainStreet:   ['', Validators.required],
        crossings:    ['', Validators.required],
        postalCode:   ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]{5}/)])],
        city:         ['', Validators.required],
        municipality: ['', Validators.required],
        state:        ['', Validators.required],
      });
      // Obtenemos los parámetros de las rutas...
      this.activatedRoute.params.subscribe(params => {
        if ( params['id'] !== 'nuevo') {
          this.enterpriseO = this.enterpriseService.getEnterprise(params['id']).valueChanges();
        }
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

  agregar() {
    console.log(this.formulario);
  }

  actualizar() {
    this.read_flag = !this.read_flag;
  }

}
