import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { Enterprise } from '../../../interfaces/enterprise.interface';
import { EnterpriseService } from '../../../services/enterprise.service';
import { AuthService } from '../../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-enterpriseprofile',
  templateUrl: './enterprise-profile.component.html',
  styleUrls: ['./enterprise-profile.component.scss']
})
export class EnterpriseProfileComponent implements OnInit {

  public enterprise$: Observable<Enterprise>;
  public success: boolean;
  public modalMessage: string;

  public read_flag = true;
  public valid_form: boolean;
  public formulario: FormGroup;

  constructor(private enterpriseService: EnterpriseService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
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
          this.enterprise$ = this.enterpriseService.getEnterprise(params['id']).valueChanges();
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

  update(enterprise, registerModal) {
    this.modalMessage = '¿Deseas actualizar sus datos?';
    // El modal se invoca con una promesa que se resuelve si el modal es aceptado o se reachaza si es cerrado
    console.log('this.formulario.value :', this.formulario.value);
    this.assign(enterprise, this.formulario.value);
    console.log('enterprise :', enterprise);

    this.modalService.open(registerModal).result.then(() => {
      // Aquí se incluye la lógica cuando el modal ha sido aceptado

      // Se asignan los valores del formulario al objeto enterprise.
      this.assign(enterprise, this.formulario.value);
      this.enterpriseService.updateEnterprise(enterprise.uid, enterprise)
      .then((result) => {
        this.success = true;
      }).catch((err) => {
        this.success = false;
        console.log('err :', err);
      });
    }, (reason) => {
      // Si el usuario oprime cancelar
    });
  }

  actualizar(enterprise) {
    this.read_flag = !this.read_flag;
    // this.assign(this.formulario.value, enterprise);
    // console.log('this.formulario.value :', this.formulario.value);
    // this.formulario.setValue(this.formulario.value);
  }


  private assign(object: any, objectToCopy: any) {
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        if ( typeof object[key] === 'object') {
          this.assign(object[key], objectToCopy);
        } else if (objectToCopy.hasOwnProperty(key) && objectToCopy[key]) {
          object[key] = objectToCopy[key];
        }
      }
    }
  }

}
