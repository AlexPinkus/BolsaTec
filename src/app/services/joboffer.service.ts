import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Joboffer } from '../interfaces/joboffer.interface';
import { Observable, of } from 'rxjs';
import { map, switchMap, startWith, tap, filter } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class JobofferService {

  // Esta es la colección con todos los documentos...
  joboffersCollection: AngularFirestoreCollection<any>;
  jobofferDocument:   AngularFirestoreDocument<any>;

  constructor( private afs: AngularFirestore ) {
        // Obten la colección con todos los joboffers
    this.joboffersCollection = this.afs.collection('joboffers');
    // (ref) => ref.where('state', '==', 'inactive'));
    // , (ref) => ref.orderBy('time', 'desc')
  }

  getData(idEnterprise?: string): Observable<any[]> {
    // ['added', 'modified', 'removed']
    if (idEnterprise) {
      return this.afs.collection('joboffers',
      (ref) => ref.where('state', '==', 'active').where('idEnterprise', '==', idEnterprise))
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            // Data es la información de cada uno de los documentos
            const data = a.payload.doc.data();
            return { id: a.payload.doc.id, ...data };
          });
        })
      );
    } else {
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
  }

  getJoboffer(id: string) {
    return this.afs.doc<Joboffer>(`joboffers/${id}`);
  }

  createJoboffer(joboffer: Joboffer) {
    joboffer.createdOn = new Date();
    return this.joboffersCollection.add(joboffer).then(ref => {
      console.log('Added document with ID: ', ref.id);
      joboffer.uid = ref.id;
      return this.updateJoboffer(ref.id, joboffer);
    });
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
