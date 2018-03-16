import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { HttpMockService } from '../services/http.mock.service';

import { Source } from '../models/source';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  public filteredSources: Source[] = [];
  public selectedSources: Source[] = [];
  public typeSources: string = '';
  private sources: Source[] = [];

  constructor(private httpService: HttpMockService) {}

  public selectSource(source: Source): void {
    this.selectedSources.push(source);
    const indexSource = this.filteredSources.findIndex(filtredSource => filtredSource === source);
    this.filteredSources.splice(indexSource, 1);
  }

  public unSelectSource(source: Source): void {
    const indexSource = this.selectedSources.findIndex(selectedSource => selectedSource === source);
    const unSelectedSource = this.selectedSources.splice(indexSource, 1);
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
    this.filteredSources = this.sources.filter(source => regexp.test(source.name) && !this.selectedSources.includes(source)); // ???
  }

  ngOnInit() {
    this.httpService.getSources()
      .then(resp => {
        this.sources = resp.sources
        this.filteredSources = this.sources;
      })
      .catch(e => {throw new Error('wrong sources')});
  }

}
