import { Component, OnInit } from '@angular/core';
import { Joboffer } from '../../../interfaces/joboffer.interface';

@Component({
  selector: 'app-joboffer-view',
  templateUrl: './joboffer-view.component.html',
  styleUrls: ['./joboffer-view.component.scss']
})
export class JobofferViewComponent implements OnInit {
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
    bachelor: [
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
  constructor() {
    console.log(this.carrerasData);
   }

  ngOnInit() {
  }

}
