import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Student } from '../../../interfaces/student.interface';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-students-admin',
  templateUrl: './students-admin.component.html',
  styleUrls: ['./students-admin.component.scss']
})
export class StudentsAdminComponent {
  rows = [];
  selectedActivos = [];
  selectedInactivos = [];
public studentpreview: Student;
public bachelorpreview: string;
public graduadopreview: string;
public messageAlert: string;
public typeAlert: string;
public showAlertInactivos = false;
public showAlertActivos = false;
  constructor(private modalService: NgbModal,
              private  toastr: ToastrService) {
    this.fetch((data) => {
      this.rows = data;
    });
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/estudiantes.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  onSelectActivos({ selected }) {
    console.log('Select Event', selected);

    this.selectedActivos.splice(0, this.selectedActivos.length);
    this.selectedActivos.push(...selected);
    // console.log('Selected length', this.selected.length);
  }

  onSelectInactivos({ selected }) {
    console.log('Select Event', selected);

    this.selectedInactivos.splice(0, this.selectedInactivos.length);
    this.selectedInactivos.push(...selected);
    // console.log('Selected length', this.selected.length);
  }


  displayCheck(row) {
    return row.name !== 'Ethel Price';
  }

  emulacionServicio(action: string) {
    return new Promise ((resolve, reject) => {
      if (action === 'success') {
        setTimeout(() => {
          resolve('Succeded!');
        }, 1000);
      } else if (action === 'fail') {
        setTimeout(() => {
          reject('Failed!');
        }, 1000);
      }
    });
  }
  setAlert(action: string, table: string) {
  switch (action) {
    case 'aprobar':
      this.messageAlert = '¡El estudiante ha sido aprobado con éxito!';
      this.typeAlert = 'success';
      break;
    case 'eliminar':
      this.messageAlert = '¡El estudiante ha sido eliminado con éxito!';
      this.typeAlert = 'success';
      break;
    case 'eliminarBatch':
      this.messageAlert = '¡Los estudiantes han sido eliminados con éxito!';
      this.typeAlert = 'success';
      break;
    case 'aprobarBatch':
      this.messageAlert = '¡Los estudiantes han sido aprobados con éxito!';
      this.typeAlert = 'success';
      break;
    case 'fail':
      this.messageAlert = 'Hubo un error, por favor intentalo nuevamente';
      this.typeAlert = 'danger';
      break;
    default:
      break;
  }
    if (table === 'Inactivos') {
      this.showAlertInactivos = true;
      setTimeout(() => {
        this.showAlertInactivos = false;
      }, 3500);
    } else if  (table === 'Activos') {
      this.showAlertActivos = true;
      setTimeout(() => {
        this.showAlertActivos = false;
      }, 3500);
    }
  }
  verModal(uid, action: string, modal, table) {
    // console.log(this.rows);
    switch (action) {
      case 'aprobar':
        this.modalService.open(modal).result.then(() => {
          this.emulacionServicio('success').then((data) => {
            this.setAlert(action, table);
          }).catch((err) => {
            this.setAlert('fail', table);
          });
        });
        break;
      case 'eliminar':
        this.modalService.open(modal).result.then(() => {
          console.log('Eliminado');
          this.emulacionServicio('fail').then((data) => {
            this.setAlert(action, table);
          }).catch((err) => {
            this.setAlert('fail', table);
          });
        });
        break;
      case 'aprobarBatch':
        this.modalService.open(modal).result.then(() => {
          console.log('Aprobado múltiple');
          this.emulacionServicio('success').then((data) => {
            this.setAlert(action, table);
          }).catch((err) => {
            this.setAlert('fail', table);
          });
        });
        break;
      case 'eliminarBatch':
        this.modalService.open(modal).result.then(() => {
          console.log('Eliminado múltiple');
        });
        break;
      case 'ver':
        const student = this.rows.filter((row) => {
            return row.uid === uid;
        });
        this.studentpreview = student[0];
        console.log(this.studentpreview);
        this.bachelorpreview = this.getCarreraName(this.studentpreview.degree.bachelor);
        this.studentpreview.isGraduated === true ? this.graduadopreview = 'Graduado' : this.graduadopreview = 'No graduado';
        this.modalService.open(modal);
        break;
      default:
        break;
    }
}

  updateFilter(event) {
    console.log('updateFilter', event);
  }


  getCarreraName(key) {
   let result: string;
      switch (key) {
        case "industrial":
          result = "Ingeniería Industrial";
          break;
        case "bioquimica":
          result = "Ingeniería Bioquímica";
          break;
        case "ambiental":
          result = "Ingeniería Ambiental";
          break;
        case "biomedica":
          result = "Ingeniería Biomédica";
          break;
        case "gestion":
          result = "Ingeniería en Gestión Empresarial";
          break;
        case "quimica":
          result = "Ingeniería Química";
          break;
        case "electrica":
          result = "Ingeniería Eléctrica";
          break;
        case "electronica":
          result = "Ingeniería Electrónica";
          break;
        case "mecanica":
          result = "Ingeniería Mecánica";
          break;
        case "civil":
          result = "Ingeniería Civil";
          break;
        case "sistemas":
          result = "Sistemas Computacionales";
          break;
        case "administracion":
          result = "Administración";
          break;
        case "administracion_distancia":
          result = "Administración en Educación a Distancia";
          break;
        default:
          break;
      }
    return result;
  }
}


