import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  showSpinner = true;

  public role;
  constructor(public _as: AuthService) { }

  ngOnInit() {
    this._as.user.subscribe(() => this.showSpinner = false);
  }

}
