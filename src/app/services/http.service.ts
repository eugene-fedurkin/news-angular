import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IHttpService } from './interfaces/i.http.service';
import { Sources } from '../models/sources';
import { News } from '../models/news';

@Injectable()
export class HttpService implements IHttpService {

  private querySourses: string = 'https://newsapi.org/v2/sources?apiKey=ecf84d5a084e4a2ca8d741538a99555a';
  private queryNews: string = 'https://newsapi.org/v2/everything?q=angular&apiKey=ecf84d5a084e4a2ca8d741538a99555a';
  
  constructor(private http: HttpClient) { }
  
  public getNews(): Promise<News> {
    return this.http.get(this.queryNews).toPromise<any>();
  }
  
  public getSources(): Promise<Sources> {
    return this.http.get(this.querySourses).toPromise<any>();
  }
}