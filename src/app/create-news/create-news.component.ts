import { Component } from '@angular/core';
import { StoreService } from '../services/store.services';
import { Article } from '../models/article';
import { Router } from '@angular/router';
import { NoticeService } from '../services/notice.service';

@Component({
  selector: 'app-create-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.css']
})
export class CreateNewsComponent {

  private title: string = '';
  private description: string = '';

  constructor(
    private store: StoreService,
    private router: Router,
    private notice: NoticeService,
  ) {}

  public createNews(): void {
    const article: Article = {
      source: {
        id: `my-news${new Date(Date.now()).toString()}`,
        name: 'my-news',
      },
      author: 'Me',
      title: this.title,
      description: this.description,
      url: '',
      urlToImage: '',
      publishedAt: new Date(Date.now()).toString()
    }
    this.store.articles.unshift(article);
    this.router.navigateByUrl('');
    this.notice.success('The news has been successfully created');
  }
}
