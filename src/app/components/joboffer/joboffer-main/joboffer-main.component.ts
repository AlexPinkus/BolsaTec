import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-joboffer-main',
  templateUrl: './joboffer-main.component.html',
  styleUrls: ['./joboffer-main.component.scss']
})
export class JobofferMainComponent implements OnInit {
  public bachelors = [
    'Licenciatura en Ingeniería Industrial',
    'Licenciatura en Ingeniería Bioquímica',
    'Licenciatura en Ingeniería Ambiental',
    'Licenciatura en Ingeniería Biomédica',
    'Licenciatura en Ingeniería en Gestión Empresarial',
    'Licenciatura en Ingeniería Química',
    'Licenciatura en Ingeniería Eléctrica',
    'Licenciatura en Ingeniería Electrónica',
    'Licenciatura en Ingeniería Mecánica',
    'Licenciatura en Ingeniería Civil',
    'Licenciatura en Sistemas Computacionales',
    'Licenciatura en Administración',
    'Licenciatura en Administración en Educación a Distancia'
  ];

  public item = [

  ]
  constructor() { }

  ngOnInit() {
  }

  updateFilter(event) {

  }

}
