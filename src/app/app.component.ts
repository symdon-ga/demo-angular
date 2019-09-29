import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from './user.model';
import { KeycloakService } from './keycloak.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatMenuTrigger } from '@angular/material';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent {
  @ViewChild(MatMenuTrigger, {static: false}) trigger: MatMenuTrigger;


  title = 'demo-angular';
  profile: User;

  constructor(private keycloakService: KeycloakService) {}

  public ngOnInit(): void {
    this.profile = this.keycloakService.getUser();
  }

  public loggedIn(): boolean {
    return this.keycloakService.loggedIn();
  }

  public logout(): any {
    return this.keycloakService.logout();
  }

  public login(): any {
    return this.keycloakService.login();
  }
}
