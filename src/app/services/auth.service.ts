import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private itemsCollection: AngularFirestoreCollection<Mensaje>;
  public user: any = {};
  public isAuth = false;

  constructor(private afs: AngularFirestore,
    public afAuth: AngularFireAuth) {
      this.afAuth.authState.subscribe( user => {
        console.log('Estado del user', user);
        if (!user) {  this.isAuth = false; return; }
        this.user.nombre = user.displayName;
        this.user.uid    = user.uid;
        this.isAuth = true;
        if (user.emailVerified) {
          console.log('Email is verified');
        } else {
          console.log('Email is not verified');
        }
      });
    // this.itemsCollection = afs.collection<Mensaje>('items');
    // this.items = this.itemsCollection.valueChanges();
  }

  signup(email: string, password: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(user => {
      console.log('Usuario registrado :', user);
      alert('Usuario registrado :' + user);
    })
    .catch(function(error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // Estos son los diferentes tipos de errores que se pueden dar.
      // Manejar código de error adecuado para el usuario.
      switch (errorCode) {
        case 'auth/email-already-in-use':
          // Thrown if there already exists an account with the given email address.
          break;
        case 'auth/invalid-email':
          // Thrown if the email address is not valid.
          break;
        case 'auth/operation-not-allowed':
          // Thrown if email/password accounts are not enabled. Enable email/password accounts in the Firebase Console, under the Auth tab.
          break;
        case 'auth/weak-password':
          // Thrown if the password is not strong enough.
        default:
          // Error no documentado.
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

  login(email: string, password: string) {
    // this.afAuth.auth.signInWithEmailAndPassword
    this.afAuth.auth.signInWithEmailAndPassword(email, password).then(credential => {
      alert('Bienvenido' + credential);
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
    this.user = {};
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
