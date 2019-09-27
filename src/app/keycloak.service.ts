import { Injectable } from '@angular/core';

import { User } from './user.model';
import { environment } from '../environments/environment';

declare var Keycloak: any;

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  static auth: any = {};
  static user: User;

  static init(): Promise<any> {
    const keycloakAuth: any = Keycloak({
      url: environment.KEYCLOAK_URL,
      realm: environment.KEYCLOAK_REALM,
      clientId: environment.KEYCLOAK_CLIENTID,
    });

    KeycloakService.auth.loggedIn = false;

    return new Promise((resolve, reject) => {
      keycloakAuth
        .init({onLoad: 'login-required'})
        .success(() => {
          KeycloakService.auth.loggedIn = true;
          KeycloakService.auth.authz = keycloakAuth;
          KeycloakService.auth.logoutUrl =
            keycloakAuth.authServerUrl +
            '/realms/' +
            environment.KEYCLOAK_REALM +
            '/protocol/openid-connect/loggout?redirect_uri=' +
            document.baseURI;

          KeycloakService.auth.authz.loadUserProfile().success(data => {
            this.user = new User();
            this.user.username = data.username;
            resolve();
          });
        })
        .error(() => {
          reject();
        });
    });
  }

  getUser(): User {
    return KeycloakService.user;
  }
  constructor() { }

}
