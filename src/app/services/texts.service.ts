import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextsService {

  private _bachelors: any[] = [
    { value: 'industrial', name: 'Licenciatura en Ingeniería Industrial', shortName: 'Ingeniería Industrial'},
    { value: 'bioquimica', name: 'Licenciatura en Ingeniería Bioquímica', shortName: 'Ingeniería Bioquímica'},
    { value: 'ambiental', name: 'Licenciatura en Ingeniería Ambiental', shortName: 'Ingeniería Ambiental'},
    { value: 'biomedica', name: 'Licenciatura en Ingeniería Biomédica', shortName: 'Ingeniería Biomédica'},
    { value: 'gestion', name: 'Licenciatura en Ingeniería en Gestión Empresarial', shortName: 'Ingeniería en Gestión Empresarial'},
    { value: 'quimica', name: 'Licenciatura en Ingeniería Química', shortName: 'Ingeniería Química'},
    { value: 'electrica', name: 'Licenciatura en Ingeniería Eléctrica', shortName: 'Ingeniería Eléctrica'},
    { value: 'electronica', name: 'Licenciatura en Ingeniería Electrónica', shortName: 'Ingeniería Electrónica'},
    { value: 'mecanica', name: 'Licenciatura en Ingeniería Mecánica', shortName: 'Ingeniería Mecánica'},
    { value: 'civil', name: 'Licenciatura en Ingeniería Civil', shortName: 'Ingeniería Civil'},
    { value: 'sistemas', name: 'Licenciatura en Sistemas Computacionales', shortName: 'Sistemas Computacionales'},
    { value: 'administracion', name: 'Licenciatura en Administración', shortName: 'Administración'},
    { value: 'administracionDistancia', name: 'Licenciatura en Administración en Educación a Distancia',
    shortName: 'Administración en Educación a Distancia'}
  ];

  private _genders = ['Hombre', 'Mujer'];
  private _maritalStatuses = ['Soltero(a)', 'Casado(a)'];

  constructor() { }

  get bachelors(): any[] {
    return this._bachelors;
  }

  get values(): any[] {
    return this._bachelors.map(bachelor => bachelor.value);
  }

  get names(): any[] {
    return this._bachelors.map(bachelor => bachelor.name);
  }

  get shortNames(): any[] {
    return this._bachelors.map(bachelor => bachelor.shortName);
  }

  get genders(): string[] {
    return this._genders;
  }

  get maritalStatuses(): string[] {
    return this._maritalStatuses;
  }


}
