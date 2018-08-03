import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../../services/auth.service';
import { User } from 'firebase';


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
      // Hay que decidir a donde enviar al usuario...
      this.router.navigate(['/inicio']);
    }).catch((err) => {
      console.log('Error al Logearse');
    });
    // console.log('Usuario Loggeado:', this.authService.userDoc);
  }

  resetPassword() {
    // console.log('recuperar contraseña...');
    this.authService.recoverPassword(this.user.email);
  }

}
