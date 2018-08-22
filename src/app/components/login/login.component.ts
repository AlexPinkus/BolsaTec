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

  constructor(private router: Router,
    private route: ActivatedRoute,
    public authService: AuthService) { }

  ngOnInit() {
  }

  logIn() {
    // console.log( 'Usuario a logear:', this.user );
    this.authService.login(this.user.email, this.user.password).then((credential) => {
      // Logeo Exitoso:
      // Obtenemos los datos del usuario para redirigirlo.
      this.authService.user.pipe(
        take(1)
      ).toPromise()
      .then((user) => {
        // Se redirige al usuario dependiendo de su rol.
        switch (user.role) {
          case 'student':
            this.router.navigate(['/list/joboffers']);
            break;
          case 'enterprise':
            this.router.navigate(['/list/joboffers', user.uid]);
            break;
          default:
            this.router.navigate(['/inicio']);
            break;
        }
      }).catch((err) => {
        console.log('err :', err);
      });
    }).catch((err) => {
      console.log('Error al Logearse');
    });
  }

  resetPassword() {
    // console.log('recuperar contraseña...');
    this.authService.recoverPassword(this.user.email);
  }

}
