import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Http, Headers } from '@angular/http';
import { Joboffer } from '../interfaces/joboffer.interface';
import { Observable, of } from 'rxjs';
import { map, switchMap, startWith, tap, filter } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class JobofferService {

  joboffersCollection: AngularFirestoreCollection<any>;
  jobofferDocument:   AngularFirestoreDocument<any>;

  constructor( private http: Http, private afs: AngularFirestore ) {
        // Obten la colección con todos los estudiantes:
    // Hay que obtener esto a partir del rol.
    this.joboffersCollection = this.afs.collection('joboffers');
    // (ref) => ref.where('role', '==', 'joboffer'));
    // , (ref) => ref.orderBy('time', 'desc')
  }

  getData(): Observable<any[]> {
    // ['added', 'modified', 'removed']
    return this.joboffersCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          // Data es la información de cada uno de los documentos
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
        });
      })
    );
  }

  getJoboffer(id: string) {
    return this.afs.doc<Joboffer>(`joboffers/${id}`);
  }

  // ----------------------------------------------------------------------------------------------------------------
  // Programador: Félix Ehuan
  // Fecha: 18/07/2018
  // Función getJobofferData: Función que retorna una promesa con la data de la oferta de trabajo
  // ----------------------------------------------------------------------------------------------------------------
  getJobofferData(id: string) {
    // tslint:disable-next-line:no-shadowed-variable
    const promesa = new Promise((resolve, reject) => {
      const JobofferURL = this.afs.doc<Joboffer>(`joboffers/${id}`);
      JobofferURL.valueChanges().subscribe(
          data =>  {
            if (data) {
              resolve(data);
            } else {
              resolve(null);
            }
          });
    });
      return promesa;
  }

  createJoboffer(joboffer: Joboffer) {
    joboffer.createdOn = new Date();
    return this.joboffersCollection.add(joboffer);
    // return this.joboffersCollection.doc(joboffer.uid).set(joboffer);
  }

  updateJoboffer(id: string, data: any) {
    return this.getJoboffer(id).update(data);
  }

  deleteJoboffer(id: string) {
    // return this.getJoboffer(id).update(data);
    return this.getJoboffer(id).delete();
  }
}
