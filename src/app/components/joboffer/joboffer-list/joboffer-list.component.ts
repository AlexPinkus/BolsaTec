import { Component, OnInit } from '@angular/core';
import { JobofferService } from '../../../services/joboffer.service';
import { StudentService } from '../../../services/student.service';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { map, switchMap, startWith, tap, filter } from 'rxjs/operators';
import { Joboffer } from '../../../interfaces/joboffer.interface';
@Component({
  selector: 'app-joboffer-list',
  templateUrl: './joboffer-list.component.html',
  styleUrls: ['./joboffer-list.component.scss']
})
export class JobofferListComponent implements OnInit {
  rows = [];
  selected = [];
  jobOffers: Observable<any[]>;
  students: Observable<any[]>;
  estudiantes = ['FzMQ0Xn59n0aEQkzGzSm', 'YmB0SIb9sKhELNsd2RbE', 'vtV4JEZRanhUVaLAbAIibSQZSSI3'];

  constructor( private jobofferService: JobofferService,
    private studentService: StudentService,
    private activatedRoute: ActivatedRoute ) {
    this.activatedRoute.params.subscribe(params => {
      if ( params['id'] !== 'nuevo') {
        // this.enterpriseO = this.enterpriseService.getEnterprise(params['id']).valueChanges();
        this.jobOffers = this.jobofferService.getData(params['id']).pipe(
          tap(jobs => {
            this.rows = jobs;
            console.log('jobs :', jobs);
          })
        );
      }
    });
  }

  ngOnInit() {
    // this.jobOffers = this.jobofferService.getData();
    this.students = this.studentService.getStudentsInArray(this.estudiantes);
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
    // this.selected.push(this.rows[1], this.rows[3]);
  }

  update() {
    // this.selected = [ this.rows[1], this.rows[3] ];
  }

  remove(id: string) {
    this.selected = [];
    console.log('id :', id);
    this.jobofferService.deleteJoboffer(id);
    console.log('removido el elemento');
  }

  displayCheck(row) {
    return row.name !== 'Ethel Price';
  }

  verModal(row: Joboffer) {
    console.log('row', row);
    this.students = this.studentService.getStudentsInArray(row.applicants);
    // .pipe(map(arr => {
    //   console.log('llamado a la db');
    //   return arr;
    // }));
  }

  updateFilter(event) {
    console.log('updateFilter', event);
  }

}
