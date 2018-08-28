import { Component, OnInit } from '@angular/core';
import { Joboffer } from '../../../interfaces/joboffer.interface';
import { JobofferService } from '../../../services/joboffer.service';
import { EnterpriseService } from '../../../services/enterprise.service';

import { Observable } from 'rxjs';
import { map, take, tap, finalize, switchMap, flatMap } from 'rxjs/operators';
import { combineLatest } from 'rxjs/observable/combineLatest';

@Component({
  selector: 'app-joboffer-main',
  templateUrl: './joboffer-main.component.html',
  styleUrls: ['./joboffer-main.component.scss']
})
export class JobofferMainComponent implements OnInit {

  public joboffers$: Observable<Joboffer[]>;

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

  public selectedBachelor: string;
  public searchFilter: string;

  constructor(private jobofferService: JobofferService,
  private enterpriseService: EnterpriseService) {
    this.joboffers$ = this.jobofferService.getData().pipe(
      map(joboffers => {
        return joboffers.map(joboffer => {
          return this.enterpriseService.getEnterprise(joboffer.idEnterprise).valueChanges().pipe(
            map(enterprise => Object.assign({}, {enterpriseLogo: enterprise.logo, enterpriseName: enterprise.comercialName, ...joboffer}))
          );
        });
      }),
      flatMap(observables => combineLatest(observables))
    );
  }

  ngOnInit() {
  }

  // loadPage(page = 1) {
  //   let joboffersPagination: any;
  //     console.log(this.latestDoc);
  //   if (page == 1) {
  //      joboffersPagination = this.jobofferService.pagination(this.Itemspage, page, true);
  //   } else {
  //      joboffersPagination = this.jobofferService.pagination(this.Itemspage, page, false, this.latestDoc);
  //   }
  //   if (page !== this.previousPage) {
  //     this.previousPage = page;
  //     this.jobOffers$ = joboffersPagination.valueChanges().pipe(
  //       map(jobOffers => {
  //        this.latestDoc = jobOffers[jobOffers.length - 1];
  //         return jobOffers.map(jobOffer => {
  //           return this.enterpriseService.getEnterprise(jobOffer.idEnterprise).valueChanges().pipe(
  //             map(enterprise => Object.assign({}, {enterpriseLogo: enterprise.logo, enterpriseName: enterprise.comercialName, ...jobOffer}))
  //           );
  //         });
  //       }),
  //       flatMap(observables => combineLatest(observables))
  //     );
  //   }
  // }

  updateFilter(jobOffer) {
    // console.log('event :', event);
    // console.log('searchFilter :', this.searchFilter);
    if (this.searchFilter) {
      return ( jobOffer.enterpriseName.includes(this.searchFilter) ||
      jobOffer.position.includes(this.searchFilter));
    } else {
      return true;
    }
  filter(joboffers: Joboffer[]): Joboffer[] {
    return this.filterSearch(this.filterBachelor(joboffers));
  }

  // Filtro para el input de búsqueda.
  private filterSearch(joboffers: Joboffer[] | null): Joboffer[] | null {
    if ( joboffers === null) { return null; }
    if (!this.searchFilter) { return joboffers; }
    const filtered = [];
    joboffers.forEach(joboffer => {
      if (joboffer.enterpriseName.toLowerCase().includes(this.searchFilter.toLowerCase()) ||
      joboffer.position.toLowerCase().includes(this.searchFilter.toLowerCase())) {
        filtered.push(joboffer);
      }
    });
    return (filtered.length > 0) ? filtered : null;
  }

  // Filtro para la carrera de egreso.
  private filterBachelor(joboffers: Joboffer[] | null): Joboffer[] | null {
    if ( joboffers === null) { return null; }
    if (!this.selectedBachelor) { return joboffers; }
    const filtered = [];
    joboffers.forEach(joboffer => {
      if (joboffer.bachelors.includes(this.selectedBachelor)) {
        filtered.push(joboffer);
      }
    });
    return (filtered.length > 0) ? filtered : null;
  }
}
