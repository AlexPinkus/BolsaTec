import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, AbstractControl, FormArray } from '@angular/forms';
import { Joboffer } from '../../../interfaces/joboffer.interface';
import { JobofferService } from '../../../services/joboffer.service';
import { AuthService } from '../../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TextsService } from '../../../services/texts.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-joboffer-register',
  templateUrl: './joboffer-register.component.html',
  styleUrls: ['./joboffer-register.component.scss']
})
export class JobofferRegisterComponent implements OnInit {
  public formulario: FormGroup;
  public joboffer: Joboffer = {
    // Datos del puesto
    position:     '',
    description:  '',
    economicAmount: 0,
    vacantNumber: 0,
    weeklyHours:  0,

    applicants: [],

    // Perfil deseado
    aptitudes: [],
    experience:   0,
    bachelors: [],
    languages: {
      english: {
        written:  '',
        spoken:   '',
        translation: ''
      }
    }
  };
  mensaje_modal: string;

  constructor( private jobofferService: JobofferService,
    public texts: TextsService,
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private rutaURL: Router,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private toastr:  ToastrService) {
    this.formulario = this.formBuilder.group({

      // Datos del puesto:
      position:       ['', Validators.required],
      description:    ['', Validators.required],
      economicType:   ['', Validators.required],
      economicAmount: ['', Validators.required],
      vacantNumber:   ['', Validators.required],
      weeklyHours:    ['', Validators.required],
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
  }

  ngOnInit() {

  }

  register(userId, modalConfirmacion) {
    // insertando
    this.mensaje_modal = '¿Deseas publicar esta oferta de trabajo?';
    // El modal se invoca con una promesa que se resuelve si el modal es aceptado o se reachaza si es cerrado
    this.modalService.open(modalConfirmacion).result.then(() => {
      // Aquí se incluye la lógica cuando el modal ha sido aceptado
      this.assign(this.joboffer, this.formulario.value);
      this.joboffer.idEnterprise = userId;
      this.joboffer.state = 'active';
      this.jobofferService.createJoboffer(this.joboffer).then(result => {
        this.toastr.success('¡Su información ha sido actualizada exitosamente!', '¡Éxito!');
      }).catch(err => {
        this.toastr.error('¡Hubo un error al actualizar su información!', '¡Error!');
      });
    }, (reason) => {
      // Si el usuario oprime cancelar
    });
  }

  cancel( ) {
    console.log('cancelar');
    this.formulario.reset();
  }

  agregarcarrera() {
    (<FormArray>this.formulario.controls['bachelors']).push(
      new FormControl('', Validators.required)
    );
  }

  eliminarcarrera(index: number) {
    (<FormArray>this.formulario.controls['bachelors']).removeAt(index);
  }

  agregaraptitud() {
    (<FormArray>this.formulario.controls['aptitudes']).push(
      new FormControl('', Validators.required)
    );
  }

  eliminaraptitud(index: number) {
    (<FormArray>this.formulario.controls['aptitudes']).removeAt(index);
  }

  private assign(object: any, objectToCopy: any) {
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        if ( typeof object[key] === 'object' && !Array.isArray(object[key])) {
          this.assign(object[key], objectToCopy);
        } else if (objectToCopy.hasOwnProperty(key)) {
          object[key] = objectToCopy[key];
          // if (key === 'aptitudes') {
          //   console.log('object[key] :', object[key]);
          // }
        }
      }
    }
  }
}
