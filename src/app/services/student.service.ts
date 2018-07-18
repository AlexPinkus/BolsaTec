import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Http, Headers } from '@angular/http';
import { Student } from '../interfaces/student.interface';
// import 'rxjs/Rx';
import { Observable, of } from 'rxjs';
import { map, switchMap, startWith, tap, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  fireURL = 'https://bolsatec-b5cc1.firebaseio.com/Students.json';
  studentURL = 'https://bolsatec-b5cc1.firebaseio.com/Students';

  studentsCollection: AngularFirestoreCollection<any>;
  studentDocument:   AngularFirestoreDocument<any>;

  constructor(private http: Http, private afs: AngularFirestore) {
    // Obten la colección con todos los estudiantes:
    this.studentsCollection = this.afs.collection('users');
    // , (ref) => ref.orderBy('time', 'desc')
  }

  getData(): Observable<any[]> {
    // ['added', 'modified', 'removed']
    return this.studentsCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          // Data es la información de cada uno de los documentos
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
        });
      })
    );
  }

  getStudent(id: string) {
    return this.afs.doc<Student>(`users/${id}`);
  }

  createStudent(student: Student) {
    // const student = {
    //   content,
    //   hearts: 0,
    //   time: new Date().getTime(),
    // };
    // student.role = 'student';
    return this.studentsCollection.doc(student.uid).set(student);
  }

  updateStudent(id: string, data: any) {
    return this.getStudent(id).update(data);
  }

  deleteStudent(id: string) {
    return this.getStudent(id).delete();
  }

  //#region Implementación FireBase
  /*
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
  */
  //#endregion
}
