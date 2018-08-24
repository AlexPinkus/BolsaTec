import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, AbstractControl, FormArray } from '@angular/forms';
import { Joboffer } from '../../../interfaces/joboffer.interface';
import { JobofferService } from '../../../services/joboffer.service';
import { AuthService } from '../../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare var $: any;
@Component({
  selector: 'app-joboffer-register',
  templateUrl: './joboffer-register.component.html',
  styleUrls: ['./joboffer-register.component.scss']
})
export class JobofferRegisterComponent implements OnInit {
  public success: boolean;
  public valid_form: boolean;
  public formulario: FormGroup;
  public joboffer: Joboffer = {
    // Datos del puesto
    position:     'Asistente de ventas',
    description:  'Aquí tienen que poner todo',
    salary:       10000,
    vacantNumber: 4,
    weeklyHours:  48,

    applicants: ['vtV4JEZRanhUVaLAbAIibSQZSSI3'],

    // Perfil deseado
    aptitudes: [
      'Limpieza',
      'orden',
      'puntualidad',
      'trabajo duro'
    ],
    experience:   1,
    bachelors: [
      'industrial',
      'bioquimica',
      'ambiental'
    ],
    languages: {
      english: {
        written:  '80',
        spoken:   '70',
        translation: '80'
      }
    }
  };
  read_flag: boolean;
  carreras: any[] = [
   { value: 'industrial', name: 'Licenciatura en Ingeniería Industrial'},
   { value: 'bioquimica', name: 'Licenciatura en Ingeniería Bioquímica'},
   { value: 'ambiental', name: 'Licenciatura en Ingeniería Ambiental'},
   { value: 'biomedica', name: 'Licenciatura en Ingeniería Biomédica'},
   { value: 'gestion', name: 'Licenciatura en Ingeniería en Gestión Empresarial'},
   { value: 'quimica', name: 'Licenciatura en Ingeniería Química'},
   { value: 'electrica', name: 'Licenciatura en Ingeniería Eléctrica'},
   { value: 'electronica', name: 'Licenciatura en Ingeniería Electrónica'},
   { value: 'mecanica', name: 'Licenciatura en Ingeniería Mecánica'},
   { value: 'civil', name: 'Licenciatura en Ingeniería Civil'},
   { value: 'sistemas', name: 'Licenciatura en Sistemas Computacionales'},
   { value: 'administracion', name: 'Licenciatura en Administración'},
   { value: 'administracion_distancia', name: 'Licenciatura en Administración en Educación a Distancia'}
  ];
  carreras2 = {
   industrial: 'Ingeniería Industrial',
   bioquimica: 'Ingeniería Bioquímica',
   ambiental: 'Ingeniería Ambiental',
   biomedica: 'Ingeniería Biomédica',
   gestion: 'Ingeniería en Gestión Empresarial',
   quimica: 'Ingeniería Química',
   electrica: 'Ingeniería Eléctrica',
   electronica: 'Ingeniería Electrónica',
   mecanica: 'Ingeniería Mecánica',
   civil: 'Ingeniería Civil',
   sistemas: 'Sistemas Computacionales',
   administracion: 'Administración',
   administracion_distancia: 'Administración en Educación a Distancia'
  };
  carreras_selected: any[];
  mensaje_modal: string;

  constructor( private jobofferService: JobofferService,
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private rutaURL: Router,
    private activatedRoute: ActivatedRoute,
  private modalService: NgbModal) {
    this.formulario = this.formBuilder.group({

      // Datos del puesto:
      position:     ['', Validators.required],
      description:  ['', Validators.required],
      salary:       ['', Validators.required],
      economicaid:  ['', Validators.required],
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
  }

  ngOnInit() {
    // console.log(this.rutaURL.url);
    // console.log();
    // if (this.rutaURL.url === '/register/employeer') {
    //  this.read_flag = false;
    // } else {
    //   this.read_flag = true;
    // }
    this.read_flag = false;
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
        this.success = true;
      }).catch(err => {
        this.success = false;
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
