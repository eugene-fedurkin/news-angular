import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HttpService } from './services/http.service';
import { HttpMockService } from './services/http.mock.service';
import { IHttpService } from './services/interfaces/i.http.service';
import { SpinnerService } from './services/spinner.service';

import { AppComponent } from './app.component';
import { FilterComponent } from './filter/filter.component';
import { AppRoutingModule } from './app-routing.module';
import { SpinnerComponent } from './spinner/spinner.component';
import { StoreService } from './services/store.services';
import { DetailComponent } from './detail/detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CreateNewsComponent } from './create-news/create-news.component';

@NgModule({
  declarations: [
    AppComponent,
    FilterComponent,
    SpinnerComponent,
    DetailComponent,
    PageNotFoundComponent,
    CreateNewsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    { provide: IHttpService, useClass: HttpMockService },
    SpinnerService,
    StoreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
