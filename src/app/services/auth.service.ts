import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';
import { Observable, of } from 'rxjs';
import { map, switchMap, startWith, tap, filter } from 'rxjs/operators';
import { CompileNgModuleMetadata } from '@angular/compiler';
import { Student } from '../interfaces/student.interface';

interface User {
  uid: string;
  email?: string | null;
  photoURL?: string;
  displayName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private itemsCollection: AngularFirestoreCollection<Mensaje>;
  public user: Observable<User | null>;
  // public user: any = {};
  public userItem: AngularFirestoreDocument<User>;
  public userDoc: any;
  public isAuth: boolean;
  public isLoad: boolean;
  public hello: any;

  constructor(
    private afs: AngularFirestore,
    public afAuth: AngularFireAuth
  ) {
      // this.afAuth.authState.subscribe( user => {
      //   console.log('Estado del user', user);

      //   if (!user) {  this.isAuth = false; return; }
      //   this.user.nombre = user.displayName;
      //   this.user.uid    = user.uid;
      //   this.isAuth = true;
      //   if (user.emailVerified) {
      //     console.log('Email is verified');
      //   } else {
      //     console.log('Email is not verified');
      //   }
      // });
      this.user = this.afAuth.authState.pipe(
        switchMap(user => {
          if (user) {
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
          } else {
            return of(null);
          }
        }),
        // Aquí obtenemos el user si sólo queremos el item...
        tap(user => {
          this.userDoc = user;
          console.log('this.userDoc :', this.userDoc);
        }),
        // startWith(JSON.parse(localStorage.getItem('user')))
      );
    // this.itemsCollection = afs.collection<Mensaje>('items');
    // this.items = this.itemsCollection.valueChanges();
  }

  signup(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    // .then(credential => {
    //   // this.notify.update('Welcome new user!', 'success');
    //   alert('Bienvenido nuevo usuario');
    //   console.log('Bienvenido nuevo usuario', credential.user);
    //   return this.updateUserData(credential.user); // if using firestore
    // })
    // .catch(error => {
    //   // Handle Errors here.
    //   const errorCode = error.code;
    //   const errorMessage = error.message;
    //   // Estos son los diferentes tipos de errores que se pueden dar.
    //   // Manejar código de error adecuado para el usuario.
    //   switch (errorCode) {
    //     case 'auth/email-already-in-use':
    //       // Thrown if there already exists an account with the given email address.
    //       break;
    //     case 'auth/invalid-email':
    //       // Thrown if the email address is not valid.
    //       break;
    //     case 'auth/operation-not-allowed':
    //       // Thrown if email/password accounts are not enabled.
    //       // Enable email/password accounts in the Firebase Console, under the Auth tab.
    //       break;
    //     case 'auth/weak-password':
    //       // Thrown if the password is not strong enough.
    //     default:
    //       // Error no documentado.
    //       break;
    //   }
    //   // Cambiar la alerta por un manejo más amigable de error para el usuario.
    //   alert(errorMessage);

    //   // Para debuggear...
    //   console.log('errorCode :', errorCode);
    //   console.log('errorMessage :', errorMessage);
    //   // ...
    // });
  }

  login(email: string, password: string) {
    // this.afAuth.auth.signInWithEmailAndPassword
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).then(credential => {
      alert('Bienvenido' + credential.user.displayName);
      return this.updateUserData(credential.user);
    })
    .catch(function(error) {
      // Handle Errors here.
      console.log('error :', error);
      const errorCode = error.code;
      const errorMessage = error.message;
      switch (errorCode) {
        case 'auth/invalid-email':
        // Thrown if the email address is not valid.
          break;
        case 'auth/user-disabled':
        // Thrown if the user corresponding to the given email has been disabled.
          break;
        case 'auth/user-not-found':
        // Thrown if there is no user corresponding to the given email.
        alert('El usuario no exise');
          break;
        case 'auth/wrong-password':
        // Thrown if the password is invalid for the given email, or the account corresponding to the email does not have a password set.
          break;
        default:
          break;
      }
      // Cambiar la alerta por un manejo más amigable de error para el usuario.
      alert(errorMessage);

      // Para debuggear...
      console.log('errorCode :', errorCode);
      console.log('errorMessage :', errorMessage);
      // ...
    });
  }

  logout() {
    // this.fsuser = {};
    this.afAuth.auth.signOut().then(function() {
      // Sign-out successful.
      alert('Adios');
    }).catch(function(error) {
      // An error happened.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('errorCode :', errorCode);
      console.log('errorMessage :', errorMessage);
    });
  }

    // Sets user data to firestore after succesful login
  private updateUserData(user: User) {
    console.log('Actualizando usuario...');
    console.log('user :', user);
    console.log('this.user :', this.user);
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );

    const data: User = {
      uid: user.uid,
      email: user.email || null,
      displayName: user.displayName || 'nameless user',
      photoURL: user.photoURL || 'https://goo.gl/Fz9nrQ'
    };
    return userRef.set(data);
  }

//   isLoggedIn() {
//     return this.afAuth.authState.pipe(first()).toPromise();
//  }

//  async doSomething() {
//     const user = await isLoggedIn()
//     if (user) {
//       // do something
//     } else {
//       // do something else
//    }
//  }
}
