import { Component, OnInit } from '@angular/core';
import { HttpService } from './services/http.service';
import { HttpMockService } from './services/http.mock.service';
// import { News } from './models/news';
import { Article } from './models/article';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'NewsAPI.org.   ecf84d5a084e4a2ca8d741538a99555a';

  private articles: Article[];

  constructor(private httpService: HttpMockService) {}

  ngOnInit() {
    this.httpService.getNews()
      .then(resp => this.articles = resp.articles);
  }
}
