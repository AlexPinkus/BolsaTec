import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, AbstractControl, FormArray } from '@angular/forms';
import { Joboffer } from '../../../interfaces/joboffer.interface';
import { JobofferService } from '../../../services/joboffer.service';
import { AuthService } from '../../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TextsService } from '../../../services/texts.service';
import { ToastrService } from 'ngx-toastr';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';


import { Observable } from 'rxjs';
import { map, take, tap, finalize } from 'rxjs/operators';
@Component({
  selector: 'app-joboffer-edit',
  templateUrl: './joboffer-edit.component.html',
  styleUrls: ['./joboffer-edit.component.scss']
})
export class JobofferEditComponent implements OnInit {

  public formulario: FormGroup;
  public success: boolean;
  public failure = false;
  public animationSwitch = false;
  public modalMessage: string;
  public messageAlert: string;
  public typeAlert: string;
  public isreadonly = true;
  public joboffer$: Observable<Joboffer>;
  mensaje_modal: string;

  constructor(
    private  alertConfig: NgbAlertConfig,
    private jobofferService: JobofferService,
    public texts: TextsService,
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private rutaURL: Router,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private toastr: ToastrService) {
      this.formulario = this.formBuilder.group({
        // Datos del puesto:
        position:     ['', Validators.required],
        description:  ['', Validators.required],
        salary:       ['', Validators.required],
        vacantNumber: ['', Validators.required],
        weeklyHours:  ['', Validators.required],
        // Perfil deseado:
        aptitudes:    new FormArray([
          new FormControl('', Validators.required)
        ]),
        bachelors:  new FormArray([
          new FormControl('', Validators.required)
        ]),
        experience:   ['', Validators.required],
        written:      [''],
        spoken:       [''],
        translation:  [''],
      });
      this.activatedRoute.params.subscribe(params => {
        if ( params['id'] ) {
          this.joboffer$ = this.jobofferService.getJoboffer(params['id']).valueChanges();
        }
      });
  }

  ngOnInit() {
  }

  update(joboffer, registerModal) {
    this.modalMessage = '¿Deseas actualizar sus datos?';
    // El modal se invoca con una promesa que se resuelve si el modal es aceptado o se reachaza si es cerrado

    this.modalService.open(registerModal).result.then(() => {
      // Aquí se incluye la lógica cuando el modal ha sido aceptado

      // Si hay archivo se sube y luego actualizamos

      // Se asignan los valores del formulario al objeto joboffer.
      this.assign(joboffer, this.formulario.value);
      this.jobofferService.updateJoboffer(joboffer.uid, joboffer)
      .then((result) => {
        this.showSuccesAlert();
        this.toastr.success('Éxito!', 'Su información ha sido actualizada exitosamente!');
      }).catch((err) => {
        this.showFailureAlert();
      });

    }, (reason) => {
      // Si el usuario oprime cancelar
    });
  }

  actualizar(joboffer) {
    this.isreadonly = !this.isreadonly;
    // Esto hace que los validators funcionen correctamente.
    // Además de actualizar resetear los valores del formulario al momento de cancelar.
    // Esto resetea el valor del formulario
    this.assign(this.formulario.value, joboffer);
    this.formulario.reset(this.formulario.value);
  }

  showSuccesAlert() {
    this.alertConfig.type = 'success';
    this.messageAlert = '¡Tus cambios se han guardado con éxito!';
    this.success = true;
    this.animationSwitch = true;
    setTimeout(() => {
      this.animationSwitch = false;
      setTimeout(() => {
        this.success = false;
        this.isreadonly = !this.isreadonly;
      }, 900);
    }, 2500);
  }

  showFailureAlert() {
    this.alertConfig.type = 'danger';
    this.messageAlert = '¡Hubo un problema al actualizar tus datos!';
    this.success = true;
    this.animationSwitch = true;
    setTimeout(() => {
      this.animationSwitch = false;
      setTimeout(() => {
        this.success = false;
        this.isreadonly = !this.isreadonly;
      }, 900);
    }, 2500);
  }

  private assign(object: any, objectToCopy: any) {
    // Si el objeto a copiar tiene subobjetos, regresamos a la función..
    for (const key in objectToCopy) {
      if (objectToCopy.hasOwnProperty(key)) {
        if ( typeof objectToCopy[key] === 'object' && !Array.isArray(objectToCopy[key])) {
          this.assign(object, objectToCopy[key]);
        }
      }
    }
    // Cuando se llega aquí objectToCopy ya no tiene subobjetos
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        if ( typeof object[key] === 'object' && !Array.isArray(object[key])) {
          this.assign(object[key], objectToCopy);
        } else if ( objectToCopy[key] !== undefined) {
          object[key] = objectToCopy[key];
        }
      }
    }
  }

}
