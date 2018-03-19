import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilterComponent } from './filter/filter.component';
import { DetailComponent } from './detail/detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CreateNewsComponent } from './create-news/create-news.component';
import { BodyContentComponent } from './body-content/body-content.component';

const routes: Routes = [
  { path: '', component: BodyContentComponent, children:
    [
      { path: 'filter/:filters?', component: FilterComponent },
      { path: 'detail/:id', component: DetailComponent },
      { path: 'createNews', component: CreateNewsComponent},
    ]},
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
