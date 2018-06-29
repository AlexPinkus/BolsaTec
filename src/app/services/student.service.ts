import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Student } from '../interfaces/student.interface';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  fireURL = 'https://bolsatec-b5cc1.firebaseio.com/Students.json';
  studentURL = 'https://bolsatec-b5cc1.firebaseio.com/Students';

  constructor(private http: Http) { }

  createStudent( student: Student ) {
    const body = JSON.stringify( student );
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.fireURL, body, {headers: headers}).map(res => {
              console.log(res.json());
              return res.json();
    });
  }

  getStudent( key$: string) {
    // const url = `${this.studentURL}/${ key$ }.json`;
    // return this.http.get(url).map(res => {
    //           // console.log(res.json());
    //           return res.json();
    // });
    console.log("entramos por acá");
    return this.http.get(this.fireURL).map(res => {
      // console.log(res.json());
      console.log('res :', res.json());
      let aux = res.json();
      for (const key in aux) {
        if (aux.hasOwnProperty(key)) {
          if (aux[key].id == key$) {
            console.log('aux[key] :', aux[key]);
            return aux[key];
          }
          //const element = object[key];
        }
      }
     // return res.json();
    });
  }

  getStudents( ) {
    return this.http.get(this.fireURL).map(res => {
      // console.log(res.json());
      return res.json();
    });
  }

  borrarStudent( key$: string) {
    const url = `${this.studentURL}/${ key$ }.json`;
    return this.http.delete(url).map(res => {
      // console.log(res.json());
      return res.json();
    });
  }

  updateStudent( student: Student, key$: string) {
    const body = JSON.stringify( student );
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const url = `${this.studentURL}/${ key$ }.json`;
    return this.http.put(url, body, {headers: headers}).map(res => {
              // console.log(res.json());
              return res.json();
    });
  }
}
