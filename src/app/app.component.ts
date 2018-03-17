import { Component, OnInit } from '@angular/core';
import { HttpService } from './services/http.service';
import { HttpMockService } from './services/http.mock.service';
import { SpinnerService } from './services/spinner.service';
import { Article } from './models/article';
import { StoreService } from './services/store.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'NewsAPI.org.   ecf84d5a084e4a2ca8d741538a99555a';

  private articles: Article[];
  public isWatchLater: boolean = false;

  constructor(
    private store: StoreService,
    private httpService: HttpMockService,
    private spinnerService: SpinnerService
  ) {}

  saveForLater(article: Article):void {
    this.store.saveArticleForLater(article);
  }

  qwe() {console.log('qwe')}

  watchNews(): void {
    event.srcElement.innerHTML = 'Watch Later';
    this.isWatchLater = false;
    this.articles = this.store.articles
  }

  watchLater(): void {
    event.srcElement.innerHTML = 'Watch News';
    this.isWatchLater = true;
    this.articles = [];
    for (let article in localStorage) {
      if (localStorage.hasOwnProperty(article)) {
        this.articles.push(JSON.parse(localStorage[article]));
      }
    }
  }

  ngOnInit() {
    this.spinnerService.show();
    this.httpService.getNews()
      .then(resp => {
        this.articles = resp.articles;
        this.store.articles = resp.articles;
        this.spinnerService.hide();
      });
  }
}
