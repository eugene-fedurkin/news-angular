import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../models/article';
import { StoreService } from '../services/store.services';

@Component({
  selector: 'detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  private articleId: string;
  public article: Article;
  private subscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: StoreService
  ) {
    this.subscription = activatedRoute.params.subscribe(params => this.articleId = params['id']);
  }

  public deleteArticle(): void {
    const articleIndex = this.store.articles.findIndex(article => article === this.article);
    this.store.articles.splice(articleIndex, 1);
  }

  ngOnInit() {
    this.article = this.store.articles.find(article => article.source.id === this.articleId);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
