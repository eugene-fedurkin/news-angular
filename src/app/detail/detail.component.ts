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

  private nameArticle: string;
  public article: Article;
  private subscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: StoreService
  ) {
    this.subscription = activatedRoute.params.subscribe(params => this.nameArticle = params['name']);
  }

  ngOnInit() {
    this.article = this.store.articles.find(article => article.source.name === this.nameArticle);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
