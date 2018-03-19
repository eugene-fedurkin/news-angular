import { Component } from '@angular/core';
import { StoreService } from '../services/store.services';
import { Article } from '../models/article';
import { Router } from '@angular/router';

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
    private router: Router
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
  }
}
