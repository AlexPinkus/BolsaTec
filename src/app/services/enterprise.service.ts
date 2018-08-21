import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Http, Headers } from '@angular/http';
import { Enterprise } from '../interfaces/enterprise.interface';

import { Observable, of } from 'rxjs';
import { map, switchMap, startWith, tap, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseService {

  enterprisesCollection: AngularFirestoreCollection<any>;
  enterpriseDocument:   AngularFirestoreDocument<any>;

  constructor( private http: Http, private afs: AngularFirestore ) {
    // Obten la colección con todas las empresas:
    this.enterprisesCollection = this.afs.collection('users',
    (ref) => ref.where('role', '==', 'enterprise'));
    // , (ref) => ref.orderBy('time', 'desc')
  }

  getData(): Observable<any[]> {
    // ['added', 'modified', 'removed']
    return this.enterprisesCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          // Data es la información de cada uno de los documentos
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
        });
      })
    );
  }


  getEnterprise(id: string) {
    return this.afs.doc<Enterprise>(`users/${id}`);
  }

  createEnterprise(enterprise: Enterprise) {
    // const enterprise = {
    //   content,
    //   hearts: 0,
    //   time: new Date().getTime(),
    // };
    enterprise.role = 'enterprise';
    return this.enterprisesCollection.doc(enterprise.uid).set(enterprise);
  }

  updateEnterprise(id: string, data: any) {
    return this.getEnterprise(id).update(data);
  }

  deleteEnterprise(id: string) {
    return this.getEnterprise(id).delete();
  }
}


