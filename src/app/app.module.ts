import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HttpService } from './services/http.service';
import { HttpMockService } from './services/http.mock.service';
import { IHttpService } from './services/interfaces/i.http.service';

import { AppComponent } from './app.component';
import { FilterComponent } from './filter/filter.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    HttpService,
    HttpMockService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }