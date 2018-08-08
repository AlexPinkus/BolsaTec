import { Component, OnInit } from '@angular/core';
import { JobofferService } from '../../../services/joboffer.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-joboffer-list',
  templateUrl: './joboffer-list.component.html',
  styleUrls: ['./joboffer-list.component.scss']
})
export class JobofferListComponent implements OnInit {
  rows = [];
  selected = [];
  jobOffers: Observable<any[]>;

  constructor( private jobofferService: JobofferService, private router: Router ) {}

  ngOnInit() {
    this.jobOffers = this.jobofferService.getData();
  }

  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {
    console.log('Activate Event', event);
  }

  add() {
    this.selected.push(this.rows[1], this.rows[3]);
  }

  update() {
    this.selected = [ this.rows[1], this.rows[3] ];
  }

  remove(id: string) {
    this.selected = [];
    console.log('id :', id);
    this.jobofferService.deleteJoboffer(id);
    console.log('removido el elemento');
  }


  verModal(id: any) {
    console.log('id', id);
    this.router.navigate(['/joboffer', id]);
  }

  updateFilter(event) {
    console.log('updateFilter', event);
  }

}
