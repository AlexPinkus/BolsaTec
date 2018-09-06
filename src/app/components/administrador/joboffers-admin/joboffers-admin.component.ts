import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Joboffer } from '../../../interfaces/joboffer.interface';
import { JobofferService } from '../../../services/joboffer.service';
import { EnterpriseService } from '../../../services/enterprise.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Observable, of } from 'rxjs';
import { map, take, tap, finalize, switchMap, flatMap } from "rxjs/operators";
import { combineLatest } from "rxjs/observable/combineLatest";

@Component({
  selector: 'app-joboffers-admin',
  templateUrl: './joboffers-admin.component.html',
  styleUrls: ['./joboffers-admin.component.scss']
})
export class JoboffersAdminComponent implements OnInit {

  // Observables de la DB.
  public joboffers$: Observable<Joboffer[]>;

  // Elementos a mostrar como resultado del filtro de búsqueda.
  public filtered: Joboffer[];

  // Elementos Seleccionados
  public selected = [];

  // Variables de las alertas
  public messageAlert: string;
  public typeAlert: string;
  public showAlert = false;

  constructor(
    private modalService: NgbModal,
    private  toastr: ToastrService,
    private router: Router,
    private jobofferService: JobofferService,
    private enterpriseService: EnterpriseService) {
      this.joboffers$ = this.jobofferService.getData().pipe(
        map(joboffers => {
          if (joboffers.length !== 0) {
            return joboffers.map(joboffer => {
              return this.enterpriseService.getEnterprise(joboffer.idEnterprise).valueChanges().pipe(
                map(enterprise => Object.assign({}, {enterpriseName: enterprise.comercialName, ...joboffer}))
              );
            });
          } else { return of(null); }
        }),
        flatMap(observables => combineLatest(observables)),
        tap(joboffers => { this.filtered = joboffers; })
      );
  }

  ngOnInit() {
  }

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  // Acciones:
  // Ver oferta => página de la oferta.
  // Ver empresa =>
  // Editar oferta => página de edición de oferta
  // Borrar oferta =>

  viewOffer(id: string) {
    this.router.navigate(['/joboffer', id]);
  }

  viewEnterprise(id: string) {
    console.log('vamos a la página de la empresa');
    this.router.navigate(['/joboffer', id]);
  }

  editOffer(id: string) {
    this.router.navigate(['/joboffer', id]);
  }

  removeOffer(id: string, modal) {
    // Se abre el modal correspondiente ...
    this.modalService.open(modal).result.then(() => {
      // Si lo aceptan entonces procedemos según la acción.
      this.jobofferService.deleteJoboffer(id).then(() => {
        this.setAlert('delete');
      }).catch((err) => {
        this.setAlert('fail');
      });
    }, (reason) => {
      // Si el usuario oprime cancelar
    });
  }

  removeOffers(joboffers: Joboffer[], modal) {
    // Se abre el modal correspondiente ...
    this.modalService.open(modal).result.then(() => {
      // Si lo aceptan entonces procedemos según la acción.

      // Reiniciamos los valores seleccionados ...
      this.selected = [];

      // this.jobofferService.deleteJoboffer(id).then(() => {
      //   this.setAlert('delete');
      // }).catch((err) => {
      //   this.setAlert('fail');
      // });
    }, (reason) => {
      // Si el usuario oprime cancelar
      this.selected = [];
    });
  }

  private setAlert(action: string) {
    switch (action) {
      case 'delete':
        this.messageAlert = '¡La oferta ha sido eliminada con éxito!';
        this.typeAlert = 'success';
        break;
      case 'deleteBatch':
        this.messageAlert = '¡Las ofertas han sido eliminadas con éxito!';
        this.typeAlert = 'success';
        break;
      case 'fail':
        this.messageAlert = 'Hubo un error, por favor intentelo nuevamente';
        this.typeAlert = 'danger';
        break;
      default:
        break;
    }

    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, 3500);

  }

  onSearch(event, joboffers: Joboffer[] | null) {
    const searchFilter = event.target.value;
    this.filtered =  this.filterSearch(searchFilter, joboffers);
  }

  // Filtro para el input de búsqueda.
  private filterSearch(searchFilter, joboffers: Joboffer[] | null): Joboffer[] | null {
    if (joboffers === null || joboffers[0] === null) {
      return [];
    }
    if (!searchFilter) {
      return joboffers;
    }
    const filtered = [];
    joboffers.forEach(joboffer => {
      if (
        joboffer.enterpriseName
          .toLowerCase()
          .includes(searchFilter.toLowerCase()) ||
        joboffer.position
          .toLowerCase()
          .includes(searchFilter.toLowerCase())
      ) {
        filtered.push(joboffer);
      }
    });
    return filtered.length > 0 ? filtered : [];
  }

}
