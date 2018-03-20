import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpService } from './services/http.service';
import { HttpMockService } from './services/http.mock.service';
import { IHttpService } from './services/interfaces/i.http.service';
import { SpinnerService } from './services/spinner.service';

import { AppComponent } from './app.component';
import { FilterComponent } from './filter/filter.component';
import { AppRoutingModule } from './app-routing.module';
import { SpinnerComponent } from './spinner/spinner.component';
import { ModalService } from './services/modal.service';
import { StoreService } from './services/store.services'; // TODO: wrong name
import { DetailComponent } from './detail/detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CreateNewsComponent } from './create-news/create-news.component';
import { NoticeService } from './services/notice.service';
import { NotificationComponent } from './notification/notification.component';
import { BodyContentComponent } from './body-content/body-content.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    FilterComponent,
    SpinnerComponent,
    DetailComponent,
    PageNotFoundComponent,
    CreateNewsComponent,
    NotificationComponent,
    BodyContentComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: IHttpService, useClass: HttpService },
    SpinnerService,
    StoreService,
    NoticeService,
    ModalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
