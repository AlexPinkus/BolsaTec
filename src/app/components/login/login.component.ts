import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable } from "rxjs";

import { map, take, tap, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public user = {
    email: '',
    password:  ''
  };

  public errorMessage: string;


  constructor(private router: Router,
    private route: ActivatedRoute,
    public authService: AuthService) { }

  ngOnInit() {
  }

  logIn() {
    // console.log( 'Usuario a logear:', this.user );
    this.authService.login(this.user.email, this.user.password).then((credential) => {
      console.log('credential :', credential);
      // Logeo Exitoso:
      // Obtenemos los datos del usuario para redirigirlo.
      this.authService.user.pipe(
        take(1)
      ).toPromise()
      .then((user) => {
        if (user) {
          // Se redirige al usuario dependiendo de su rol.
          switch (user.role) {
            case 'student':
              this.router.navigate(['/list/joboffers']);
              break;
            case 'enterprise':
              this.router.navigate(['/list/joboffers', user.uid]);
              break;
            default:
              this.router.navigate(['/index']);
              break;
          }
        }
      }).catch((err) => {
        console.log('err :', err);
      });
    }).catch((error) => {
      // Handle Errors here.
      console.log('error :', error);
      this.handleLoginError(error.code);
    });
  }

  handleLoginError(errorCode: string) {
    switch (errorCode) {
      case 'auth/invalid-email':
        // Thrown if the email address is not valid.
        this.errorMessage = '* El correo electrónico ingresado no es válido';
        break;
      case 'auth/user-disabled':
        // Thrown if the user corresponding to the given email has been disabled.
        break;
      case 'auth/user-not-found':
        // Thrown if there is no user corresponding to the given email.
        this.errorMessage = '* El correo electrónico aún no ha sido registrado';
        break;
      case 'auth/wrong-password':
        // Thrown if the password is invalid for the given email, or the account corresponding to the email does not have a password set.
        this.errorMessage = '* La contraseña no es válida';
        console.log('errorMessage :', this.errorMessage);
        break;
      default:
        break;
    }
  }

  resetPassword() {
    // console.log('recuperar contraseña...');
    this.authService.recoverPassword(this.user.email);
  }

}
