import { Component } from '@angular/core';
import { Joboffer } from '../../../interfaces/joboffer.interface';
import { JobofferService } from '../../../services/joboffer.service';
import { AuthService } from '../../../services/auth.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentService } from '../../../services/student.service';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
declare var $: any;
@Component({
  selector: 'app-joboffer-view',
  templateUrl: './joboffer-view.component.html',
  styleUrls: ['./joboffer-view.component.scss']
})
export class JobofferViewComponent {
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
  carrerasData = {
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
   public joboffer: Joboffer = {
    // Datos del puesto
    position:     'Asistente de ventas',
    description:  'Lorem ipsum dolor sit amet consectetur adipisicing elit.' +
    'Laudantium reiciendis voluptatem cupiditate unde repudiandae odio libero, rem vitae voluptatum corporis, eos esse, vero a ' +
    'hic praesentium magnam laboriosam. Pariatur, consequuntur! Lorem ipsum dolor sit amet consectetur adipisicing elit.' +
    'Laudantium reiciendis voluptatem cupiditate unde repudiandae odio libero, rem vitae voluptatum corporis, eos esse, vero a ' +
    'hic praesentium magnam laboriosam. Pariatur, consequuntur!',
    salary:       10000,
    vacantNumber: 4,
    weeklyHours:  48,

    applicants: ['vtV4JEZRanhUVaLAbAIibSQZSSI3'],

    // Perfil deseado
    aptitudes:    [
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
  mensaje_modal: string;
  licenciaturas: string[] = [];
  public formulario: FormGroup;
  role: string;
  students: any;
  constructor( private jobofferService: JobofferService,
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private rutaURL: Router,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private studentService: StudentService) {
// Primero se crea el formulario
  this.createform();
// Se obtiene el valor del UID de la oferta y se obtiene la oferta
// ..
// ..
// Se busca la licenciatura teniendo el objeto de la oferta
   this.licenciaturas = this.getCarreraName(this.joboffer.bachelors);
// // Se obtienen los estudiantes postulados a la oferta si el usuario es empresa
//   if (this.authService.userDoc.role == 'enterprise') {
//     this.role = 'enterprise';
//   }
 
  this.students = this.studentService.getStudent('vtV4JEZRanhUVaLAbAIibSQZSSI3').valueChanges();
  console.log(this.students);
  
 }

  // ----------------------------------------------------------------------------------------------------------------
  // Programador: Félix Ehuan
  // Fecha: 18/07/2018
  // Función createform: Crea el formulario para la postulación
  // ----------------------------------------------------------------------------------------------------------------
  createform() {
    this.formulario = this.formBuilder.group({
      postulación: ['', Validators.required],
    });
  }
  // ----------------------------------------------------------------------------------------------------------------
  // Programador: Félix Ehuan
  // Fecha: 18/07/2018
  // Función getCarreraName: Obtiene el nombre de la carrera dado el key
  // del arreglo bachelors en la oferta de trabajo, puede ser invocado cuando se obtiene el objeto del firebase
  // ----------------------------------------------------------------------------------------------------------------

   getCarreraName(array) {
     const result: string[] = [];
    for (let index = 0; index < array.length; index++) {
    switch ( array[index]) {
      case 'industrial':
      result[index] =  'Ingeniería Industrial';
      break;
      case 'bioquimica':
      result[index] =  'Ingeniería Bioquímica';
      break;
      case 'ambiental':
      result[index] =  'Ingeniería Ambiental';
      break;
      case 'biomedica':
      result[index] =  'Ingeniería Biomédica';
      break;
      case 'gestion':
      result[index] =  'Ingeniería en Gestión Empresarial';
      break;
      case 'quimica':
      result[index] =  'Ingeniería Química';
      break;
      case 'electrica':
      result[index] =  'Ingeniería Eléctrica';
      break;
      case 'electronica':
      result[index] =  'Ingeniería Electrónica';
      break;
      case 'mecanica':
      result[index] =  'Ingeniería Mecánica';
      break;
      case 'civil':
      result[index] =  'Ingeniería Civil';
      break;
      case 'sistemas':
      result[index] =  'Sistemas Computacionales';
      break;
      case 'administracion':
      result[index] =  'Administración';
      break;
      case 'administracion_distancia':
      result[index] =  'Administración en Educación a Distancia';
      break;
      default:
        break;
    }
  }
  return result;
  }

  postularse(modalConfirmacion) {
    this.mensaje_modal = '¿Deseas postularte para esta oferta de trabajo?';

    this.modalService.open(modalConfirmacion).result.then(() => {


      //  const notificacion = this.modalService.open(modalNotificacion);
      $.bigBox({
        title: 'Solicitud enviada',
        content: '¡Tu postulación ha sido enviada exitosamente!',
        fa: 'fa-save fa-lg',
        tabicon: false,
        sound: false,
        color: '#82ce34',
        timeout: 4000,
        delay: 0.5,
        });
    }, (reason) => {

    });
  }
}
