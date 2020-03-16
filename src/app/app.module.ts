import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';


import { NavbarComponent } from './shared/navbar/navbar.component';
import { DustComponent  } from './shared/dust/dust.component';
import { WeatherComponent } from './shared/weather/weather.component';

const APP_SHARED = [
  NavbarComponent,
  DustComponent,
  WeatherComponent
];

@NgModule({
  declarations: [
    AppComponent,
    ...APP_SHARED,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
