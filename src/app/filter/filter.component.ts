import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { HttpService } from '../services/http.service';
import { IHttpService } from '../services/interfaces/i.http.service';
import { SpinnerService } from '../services/spinner.service';
import { StoreService } from '../services/store.services';

import { Source } from '../models/source';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit, OnDestroy {

  public filteredSources: Source[] = [];
  public typeSources: string = '';
  private sources: Source[] = [];

  constructor(
    private httpService: IHttpService,
    private spinnerService: SpinnerService,
    private store: StoreService,
    private router: Router
  ) {}

  public selectSource(source: Source): void {
    let params = '';

    this.store.selectedSources.push(source);
    this.store.selectedSources.forEach(source => params += source.name + '&');
    params = params.split(' ').join('');
    const indexSource = this.filteredSources.findIndex(filtredSource => filtredSource === source);
    this.filteredSources.splice(indexSource, 1);
    this.router.navigate(['filter', `filters?${params}`]);
  }

  public acceptFilter(): void {
    this.spinnerService.show();
    this.httpService.getNewsBySources(this.store.selectedSources)
      .then(resp => {
        this.store.articles = this.store.addId(resp.articles);
        console.log(resp.articles)
        this.spinnerService.hide();
      })
  }

  public unSelectSource(source: Source): void {
    const indexSource = this.store.selectedSources.findIndex(selectedSource => selectedSource === source);
    const unSelectedSource = this.store.selectedSources.splice(indexSource, 1);
    const index = this.filteredSources.findIndex(filtredSource => filtredSource.id > unSelectedSource[0].id);
    if (index >= 0) {
      this.filteredSources = [].concat(this.filteredSources.slice(0, index), unSelectedSource, this.filteredSources.slice(index));
    } else {
      this.filteredSources.push(...unSelectedSource);
      console.log('push', this.filteredSources, unSelectedSource)
    }
  }

  public filterSources(input: string): void {
    this.typeSources = input;
    const regexp = new RegExp(`^${this.typeSources}`);
    this.filteredSources = this.sources.filter(source => regexp.test(source.name) && !this.store.selectedSources.find((s) => source === s));
  }

  ngOnInit() {
    if (this.store.sources.length) {
      this.sources = this.store.sources;
      this.filteredSources = this.store.filteredSources;
      this.store.selectedSources = this.store.selectedSources;
      return;
    }
    this.spinnerService.show();
    this.httpService.getSources()
      .then(resp => {
        this.sources = resp.sources
        this.filteredSources = this.sources;
        this.spinnerService.hide();
      })
      .catch(e => {throw new Error('wrong sources')});
  }

  ngOnDestroy() {
    this.store.sources = this.sources;
    this.store.filteredSources = this.filteredSources;
    this.store.selectedSources = this.store.selectedSources;
  }

}
