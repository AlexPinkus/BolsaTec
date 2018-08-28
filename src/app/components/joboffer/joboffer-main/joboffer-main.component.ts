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

  public jobOffers$: Observable<any>;

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

  public previousPage = 0;
  public page = 1;
  public count: Observable<number>;
  public Itemspage = 5;
  public latestDoc: any;
  constructor(private jobofferService: JobofferService,
  private enterpriseService: EnterpriseService) {
    this.count = this.jobofferService.count_offers.valueChanges();
    // this.loadPage();
    this.jobOffers$ = this.jobofferService.joboffersCollection.valueChanges().pipe(
      map(jobOffers => {
        return jobOffers.map(jobOffer => {
          return this.enterpriseService.getEnterprise(jobOffer.idEnterprise).valueChanges().pipe(
            map(enterprise => Object.assign({}, {enterpriseLogo: enterprise.logo, enterpriseName: enterprise.comercialName, ...jobOffer}))
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
  }

  filter(bachelors: string[]) {
    if (this.selectedBachelor) {
      console.log('selectedBachelor :', this.selectedBachelor);
      return bachelors.includes(this.selectedBachelor);
    } else {
      return true;
    }

  }
}
