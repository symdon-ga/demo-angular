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
    KeycloakService.auth.loggedIn = true;
    const keycloakAuth: any = Keycloak({
      url: environment.KEYCLOAK_URL,
      realm: environment.KEYCLOAK_REALM,
      clientId: environment.KEYCLOAK_CLIENTID,
    });
    return new Promise((resolve, reject) => {
      keycloakAuth
        .init({onLoad: 'check-sso'})
        .success(loggedIn => {
          KeycloakService.auth.authz = keycloakAuth;

          if (loggedIn) {
            console.log("Logged In");
            KeycloakService.auth.loggedIn = true;
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
          } else {
            KeycloakService.auth.loggedIn = false;
            resolve();
          }
        })
        .error(() => {
          console.log("No logged in");
          reject();
        });
    });
  }

  getUser(): User {
    return KeycloakService.user;
  }
  loggedIn(): boolean {
    return KeycloakService.auth.loggedIn;
  }
  logout(): void {
    KeycloakService.auth.authz.logout();
  }
  login(): void {
    KeycloakService.auth.authz.login();
  }
  constructor() { }
}
