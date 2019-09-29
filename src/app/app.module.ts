import { AccountMenuComponent } from './account-menu/account-menu.component';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { KeycloakService } from './keycloak.service';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule} from '@angular/material/menu';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent,
    AccountMenuComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    MatIconModule,
    MatMenuModule,
  ],
  providers: [KeycloakService],
  bootstrap: [AppComponent]
})
export class AppModule { }
