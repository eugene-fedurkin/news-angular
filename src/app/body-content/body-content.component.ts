import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from '../services/http.service';
import { IHttpService } from '../services/interfaces/i.http.service';
import { SpinnerService } from '../services/spinner.service';
import { ModalService } from '../services/modal.service';
import { Article } from '../models/article';
import { StoreService } from '../services/store.services';

@Component({
  selector: 'body-content',
  templateUrl: './body-content.component.html',
  styleUrls: ['./body-content.component.css'],
})
export class BodyContentComponent implements OnInit, OnDestroy {

  public get query(): string {
    return this.store.query;
  };
  public isWatchLater: boolean = false;
  public get watchMod(): string {
    return this.isWatchLater ? 'Watch News' : 'Watch Later';
  }
  private get articles(): Article[] {
    return this.isWatchLater ? this.store.articlesToWatchLater : this.store.articles;
  }
  private isLoadingDate: boolean = false;

  constructor(
    private store: StoreService,
    private httpService: IHttpService,
    private spinnerService: SpinnerService,
    private modalService: ModalService,
  ) {}

  public saveQueryToStore(input: string): void {
    this.store.query = input;
  }

  public getNewsByQuery(event: KeyboardEvent) {
    if (event.keyCode === 13 && this.query.length > 2) {
      this.spinnerService.show();
      this.httpService.getNewsByQuery(this.query, this.store.selectedSources)
        .then(resp => {
          this.store.articles = this.store.addId(resp.articles);
          this.spinnerService.hide();
        });
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

  public deleteFromWatchLater(id: string): void {
    if (localStorage[id]) {
      localStorage.removeItem(id);
      this.initializeArticlesFromStore();
    }
  }

  public confirmTodelete(id: string): void {
    const messege = 'Are you sure that you want to remove the news from "Watch Later"';
    this.modalService.openModal(messege, () => this.deleteFromWatchLater(id));
  }

  public saveForLater(article: Article): void {
    this.store.saveArticleForLater(article);
    this.initializeArticlesFromStore();
  }

  private throttle(action: any): any {
    let isRunning = false;
    return function() {
      if (isRunning) return;
      isRunning = true;
      window.requestAnimationFrame(() => {
        action();
        isRunning = false;
      });
    }
  }

  ngOnInit() {
    this.spinnerService.show();
    this.httpService.getNews()
      .then(resp => {
        this.store.articles = this.store.addId(resp.articles);
        this.spinnerService.hide();
      });
    this.initializeArticlesFromStore();
    window.addEventListener('scroll', this.throttle(() => {
      if (!this.isLoadingDate && window.pageYOffset + window.innerHeight >= document.getElementsByClassName('newsList')[0].offsetHeight) {
        this.spinnerService.show();
        this.isLoadingDate = true;
        this.httpService.getNewsByQuery(this.query, this.store.selectedSources, true)
          .then(resp => {
            this.isLoadingDate = false;
            this.store.articles = this.store.articles.concat(this.store.addId(resp.articles));
            this.spinnerService.hide();
        })
      }
    }));
  }

  ngOnDestroy() {
    window.removeEventListener('scroll') //TODO: add func
  }
}
