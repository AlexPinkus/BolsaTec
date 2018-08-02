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

  user = {
    email: 'alexpinkus@hotmail.com',
    password :  'password'
  };

  constructor(private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService) { }

  ngOnInit() {
  }

  logIn() {
    // console.log( 'Usuario a logear:', this.user );
    this.authService.login(this.user.email, this.user.password);
    // console.log('Usuario Loggeado:', this.authService.userDoc);
  }

  resetPassword() {
    // console.log('recuperar contraseña...');
    this.authService.recoverPassword(this.user.email);
  }

}
