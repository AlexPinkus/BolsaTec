import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';
import { Observable, of } from 'rxjs';
import { map, switchMap, startWith, tap, filter } from 'rxjs/operators';
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
  public user: Observable<User | null>;
  public userDoc: any;

  constructor(
    private afs: AngularFirestore,
    public afAuth: AngularFireAuth
  ) {
      // Esto sucede cada vez que el usuario cambia su estado...
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
  }

  signup(email: string, password: string) {
    // Esta promesa regresa la credencial de usuario, esto se necesita al momento
    // de guardar el usuario en la base de datos
    return new Promise <auth.UserCredential> ((resolve, reject) => {

      // Se crea un usuario a partir de un email y contraseña
      this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(credential => {
        // Notificamos de la creación del usuario en google Firebase
        alert('Nuevo usuario creado');

        // Se envía el correo de verificación antes de continuar
        credential.user.sendEmailVerification().then(() => {
          // El correo de verificación se envió correctamente
          console.log('correo enviado');
          this.logout().then(() => {
            // Sacamos al usuario (el create lo logea automáticamente)
            resolve (credential);
          }).catch((error) => {
            // Hubo error al sacar al usuario
            reject(error);
          });
        }).catch(error => {
          // Hubo error al enviar el correo de verificación
          reject(error);
        });
      }).catch(error => {
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
            // Thrown if email/password accounts are not enabled.
            // Enable email/password accounts in the Firebase Console, under the Auth tab.
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
    });
    // return this.updateUserData(credential.user); // if using firestore
  }

  login(email: string, password: string) {
    // Hacemos el login con correo y contraseña
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).then(credential => {
      if (!credential.user.emailVerified) {
        // Aqui necesitamos un modal que le pregunte al usuario si quiere que le enviemos el correo
        alert('Por favor verifique su correo antes de logearse...');
        this.logout().then(() => {
          credential.user.sendEmailVerification();
        });
      } else {
        alert('Bienvenido' + credential.user.displayName);
      }
      // return this.updateUserData(credential.user);
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
    return this.afAuth.auth.signOut().then(function() {
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

  recoverPassword(email: string) {
    // Se recupera la contraseña de google.
    this.afAuth.auth.sendPasswordResetEmail(email).then(() => {
      // La contraseña se envió correctamente...
      console.log('Se envió el correo...');
    }).catch((error) => {
            // Handle Errors here.
            console.log('error :', error);
            const errorCode = error.code;
            const errorMessage = error.message;
            switch (errorCode) {
              case 'auth/invalid-email':
              // Thrown if the email address is not valid.
                break;

              case 'auth/missing-continue-uri':
              // A continue URL must be provided in the request.
                break;

              case 'auth/invalid-continue-uri':
              // The continue URL provided in the request is invalid.
                break;

              case 'auth/unauthorized-continue-uri':
              // The domain of the continue URL is not whitelisted. Whitelist the domain in the Firebase console.
                break;

              case 'auth/user-not-found':
              // Thrown if there is no user corresponding to the email address.
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

}
