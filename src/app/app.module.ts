import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TeamComponent } from './components/team/team.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { TournamentComponent } from './components/tournament/tournament.component';
import { TeamService } from './services/team/team.service';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ErrorComponent } from './components/error/error.component';
import { TeamFormComponent } from './components/team-form/team-form.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TeamComponent,
    TournamentComponent,
    LoginComponent,
    SignupComponent,
    ErrorComponent,
    TeamFormComponent,
    // routingComponents
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [TeamService],
  bootstrap: [AppComponent]
})
export class AppModule { }
