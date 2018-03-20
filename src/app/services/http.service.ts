import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IHttpService } from './interfaces/i.http.service';
import { Sources } from '../models/sources';
import { News } from '../models/news';
import { Source } from '../models/source';

@Injectable()
export class HttpService implements IHttpService {

  private page: number = 1;

  private querySourses: string = 'https://newsapi.org/v2/sources?apiKey=ecf84d5a084e4a2ca8d741538a99555a';
  private queryNews: string = 'https://newsapi.org/v2/everything?q=angular&apiKey=ecf84d5a084e4a2ca8d741538a99555a';

  constructor(private http: HttpClient) { }

  public getNews(): Promise<News> {
    return this.http.get(this.queryNews).toPromise<any>();
  }

  public getNewsByQuery(query: string, sources: Source[], isAddition: boolean): Promise<News> {
    const stringSources = sources.length
      ? `&sources=${sources.map(source => source.id).join(',')}`
      : '';
    let page = '';
    if (isAddition) {
      page = `&page=${++this.page}`;
    } else {
      this.page = 1;
      document.documentElement.scrollTop = 0;
    }
    const url = `https://newsapi.org/v2/everything?q=${query}${stringSources}${page}&apiKey=ecf84d5a084e4a2ca8d741538a99555a`;

    return this.http.get(url).toPromise<any>();
  }

  public getNewsBySources(sources: Source[]): Promise<News> {
    const stringSources = sources.map(source => source.id).join(',');
    const url = `https://newsapi.org/v2/everything?q=angular&sources=${stringSources}&apiKey=ecf84d5a084e4a2ca8d741538a99555a`;

    return this.http.get(url).toPromise<any>();
  }

  public getSources(): Promise<Sources> {
    return this.http.get(this.querySourses).toPromise<any>();
  }
}