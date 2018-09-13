import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Enterprise } from '../../../interfaces/enterprise.interface';
import { EnterpriseService } from '../../../services/enterprise.service';
import { JobofferService } from '../../../services/joboffer.service';
import { PaginationService } from '../../../services/pagination.service';
import { ToastrService } from 'ngx-toastr';

import { Observable } from 'rxjs';
import { map, take, tap, finalize, switchMap, flatMap } from "rxjs/operators";



@Component({
  selector: 'app-enterprises-admin',
  templateUrl: './enterprises-admin.component.html',
  styleUrls: ['./enterprises-admin.component.scss']
})
export class EnterprisesAdminComponent implements OnInit {

  public index = 0;
  public pages = 5;
  // Observables de la DB.
  public activeEnterprises$: Observable<Enterprise[]>;
  public inactiveEnterprises$: Observable<Enterprise[]>;

  // Elementos a mostrar como resultado del filtro de búsqueda.
  public activeEnterprises: Enterprise[];
  public inactiveEnterprises: Enterprise[];

  // Elementos Seleccionados
  public selectedActive = [];
  public selectedInactive = [];

  // Variables de las alertas
  public messageAlert: string;
  public typeAlert: string;
  public showAlertInactive = false;
  public showAlertActive = false;
  public enterprisePreview: Enterprise;

  constructor(private modalService: NgbModal,
    private  toastr: ToastrService,
    private enterpriseService: EnterpriseService,
    public page: PaginationService,
    private jobofferService: JobofferService
    ) {
      // hello
      this.inactiveEnterprises$ = this.enterpriseService.getInactiveEnterprises().pipe(
        tap(inactiveEnterprises => { this.inactiveEnterprises = inactiveEnterprises; })
      );
      // this.inactiveEnterprises$ = this.enterpriseService.getInactiveEnterprises().pipe(
      //   tap(inactiveEnterprises => { this.inactiveEnterprises = inactiveEnterprises; })
      // );
      this.activeEnterprises$ = this.enterpriseService.getActiveEnterprises().pipe(
        tap(activeEnterprises => { this.activeEnterprises = activeEnterprises; })
      );
  }

  ngOnInit() {
    this.page.reset();
    this.page.init('testdata', 'createdOn', { reverse: true, prepend: false });
  }

  populateCollection (index) {

    if (index === (this.index + 5)) {
      this.index = index;
      return;
    }
    setTimeout(() => {
      return this.jobofferService.createSomething({'index': index})
      .then((result) => {
        return this.populateCollection(++index);
      }).catch((err) => {
        console.log('err :', err);
      });
    }, 1000);
  }

  setPage( pageInfo ) {
    if ((pageInfo.offset === this.pages - 1) || (pageInfo.offset === this.pages - 2)) {
      this.page.more();
      this.pages += 5;
    }
  }

  getMore() {
    console.log('paginacion');
    this.page.more();
  }

  onSelect({ selected }, table: string) {
    console.log('Select Event', selected);
    if (table === 'Active') {
      this.selectedActive.splice(0, this.selectedActive.length);
      this.selectedActive.push(...selected);
    } else if (table === 'Inactive') {
      this.selectedInactive.splice(0, this.selectedInactive.length);
      this.selectedInactive.push(...selected);
    }
  }

  onAction(selectedItem: any, action: string, table: string, modal: any) {
    // Desplegamos el modal correspondiente...
    if (!Array.isArray(selectedItem)) { this.enterprisePreview = selectedItem; }

    // Se abre el modal correspondiente ...
    this.modalService.open(modal).result.then(() => {
      // Si lo aceptan entonces procedemos según la acción.

      // Reiniciamos los valores seleccionados ...
      if (table === 'Active' && this.selectedActive.length) { this.selectedActive = [];
      } else if (table === 'Inactive' && this.selectedInactive.length) { this.selectedInactive = []; }

      this.switchAction(selectedItem, action).then(() => {
        this.setAlert(action, table);
      }).catch((err) => {
        this.setAlert('fail', table);
      });
    }, (reason) => {
      // Si el usuario oprime cancelar
      if (table === 'Active' && this.selectedActive.length) { this.selectedActive = [];
      } else if (table === 'Inactive' && this.selectedInactive.length) { this.selectedInactive = []; }
    });
  }

  private switchAction(selectedItem: any, action: string): Promise<void> {
    switch (action) {
      case 'approve':
        return this.enterpriseService.updateEnterprise(selectedItem.uid, {isActive : true});
      case 'suspend':
      case 'delete':
        return this.enterpriseService.updateEnterprise(selectedItem.uid, {isActive : false});
      case 'approveBatch':
        return this.enterpriseService.setActiveEnterprises(selectedItem);
      case 'deleteBatch':
        return this.enterpriseService.setInactiveEnterprises(selectedItem);
      default:
        return new Promise((resolve, reject) => {
          resolve();
        });
    }
  }

  private setAlert(action: string, table: string) {
    switch (action) {
      case 'approve':
        this.messageAlert = '¡La empresa ha sido aprobada con éxito!';
        this.typeAlert = 'success';
        break;
      case 'delete':
        this.messageAlert = '¡La empresa ha sido eliminada con éxito!';
        this.typeAlert = 'success';
        break;
      case 'deleteBatch':
        this.messageAlert = '¡Las empresas han sido eliminadas con éxito!';
        this.typeAlert = 'success';
        break;
      case 'approveBatch':
        this.messageAlert = '¡Las empresas han sido aprobadas con éxito!';
        this.typeAlert = 'success';
        break;
      case 'fail':
        this.messageAlert = 'Hubo un error, por favor intentelo nuevamente';
        this.typeAlert = 'danger';
        break;
      default:
        break;
    }
    if (table === 'Inactive') {
      this.showAlertInactive = true;
      setTimeout(() => {
        this.showAlertInactive = false;
      }, 3500);
    } else if  (table === 'Active') {
      this.showAlertActive = true;
      setTimeout(() => {
        this.showAlertActive = false;
      }, 3500);
    }
  }

  onSearch(event, table, enterprises: Enterprise[] | null) {
    const searchFilter = event.target.value;
    if (table === 'Active') {
      this.activeEnterprises =  this.filterSearch(searchFilter, enterprises);
    } else if (table === 'Inactive') {
      this.inactiveEnterprises =  this.filterSearch(searchFilter, enterprises);
    }
  }

  // Filtro para el input de búsqueda.
  private filterSearch(searchFilter, enterprises: Enterprise[] | null): Enterprise[] | null {
    if (enterprises === null || enterprises[0] === null) {
      return [];
    }
    if (!searchFilter) {
      return enterprises;
    }
    const filtered = [];
    enterprises.forEach(enterprise => {
      if (
        enterprise.comercialName
          .toLowerCase()
          .includes(searchFilter.toLowerCase()) ||
        enterprise.email
          .toLowerCase()
          .includes(searchFilter.toLowerCase())
      ) {
        filtered.push(enterprise);
      }
    });
    return filtered.length > 0 ? filtered : [];
  }

}
