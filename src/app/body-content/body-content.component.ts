import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { IHttpService } from '../services/interfaces/i.http.service';
import { SpinnerService } from '../services/spinner.service';
import { Article } from '../models/article';
import { StoreService } from '../services/store.services';


@Component({
  selector: 'body-content',
  templateUrl: './body-content.component.html',
  styleUrls: ['./body-content.component.css']
})
export class BodyContentComponent implements OnInit {


  public query: string = '';
  public isWatchLater: boolean = false;
  public get watchMod(): string {
    return this.isWatchLater ? 'Watch News' : 'Watch Later';
  }
  private get articles(): Article[] {
    return this.isWatchLater ? this.store.articlesToWatchLater : this.store.articles;
  }

  constructor(
    private store: StoreService,
    private httpService: IHttpService,
    private spinnerService: SpinnerService
  ) {}

  public getNewsByQuery(event: KeyboardEvent) {
    if (event.keyCode === 13 && this.query.length > 1) {
      this.spinnerService.show();
      this.httpService.getNewsByQuery(this.query, this.store.selectedSources)
        .then(resp => {
          this.store.articles = this.store.addId(resp.articles);
          this.spinnerService.hide();
        });
        console.log(this.query)
    }
  }

  private initializeArticlesFromStore(): void {
    const articles = [];
    for (let article in localStorage) {
      if (localStorage.hasOwnProperty(article)) {
        articles.push(JSON.parse(localStorage[article]));
      }
    }
    this.store.articlesToWatchLater = articles;
  }

  private deleteFromWatchLater(id: string): void {
    if (localStorage[id]) {
      localStorage.removeItem(id);
      this.initializeArticlesFromStore();
    }
  }

  public saveForLater(article: Article): void {
    this.store.saveArticleForLater(article);
    this.initializeArticlesFromStore();
  }

  ngOnInit() {
    this.spinnerService.show();
    this.httpService.getNews()
      .then(resp => {
        this.store.articles = this.store.addId(resp.articles);
        this.spinnerService.hide();
      });
    this.initializeArticlesFromStore();
  }
}
