import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material';

import { KeycloakService } from '../keycloak.service';


@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.styl']
})
export class AccountMenuComponent implements OnInit {
  @ViewChild(MatMenuTrigger, {static: false}) trigger: MatMenuTrigger;

  constructor(private keycloakService: KeycloakService) { }

  ngOnInit() {
  }

  someMethod() {
    this.trigger.openMenu();
  }

  public logout(): any {
    return this.keycloakService.logout();
  }

}
