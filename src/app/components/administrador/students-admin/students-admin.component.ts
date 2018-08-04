import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-students-admin',
  templateUrl: './students-admin.component.html',
  styleUrls: ['./students-admin.component.scss']
})
export class StudentsAdminComponent {
  rows = [];
  selected = [];

  constructor() {
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
  }

  displayCheck(row) {
    return row.name !== 'Ethel Price';
  }

  verModal(id: string) {
    console.log(id);
  }

  updateFilter(event) {
    console.log('updateFilter', event);
  }
}

