import { Component, OnInit } from '@angular/core';
import { JobofferService } from '../../../services/joboffer.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-joboffer-list',
  templateUrl: './joboffer-list.component.html',
  styleUrls: ['./joboffer-list.component.scss']
})
export class JobofferListComponent implements OnInit {
  rows = [];
  selected = [];
  jobOffers: Observable<any[]>;

  constructor( private jobofferService: JobofferService ) {
    this.fetch((data) => {
      this.rows = data;
      console.log('this.rows :', this.rows);
    });
  }

  ngOnInit() {
    this.jobOffers = this.jobofferService.getData();
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/estudiantes.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
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

  remove() {
    this.selected = [];
    console.log('removido el elemento');
  }

  displayCheck(row) {
    return row.name !== 'Ethel Price';
  }

  verModal(id: string) {
    console.log('id', id);
  }

  updateFilter(event) {
    console.log('updateFilter', event);
  }

}
