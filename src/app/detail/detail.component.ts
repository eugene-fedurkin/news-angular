import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router} from '@angular/router';
import { Article } from '../models/article';
import { StoreService } from '../services/store.service';
import { ModalService } from '../services/modal.service';
import { NoticeService } from '../services/notice.service';

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
    private router: Router,
    private store: StoreService,
    private modal: ModalService,
    private notice: NoticeService
  ) {
    this.subscription = activatedRoute.params.subscribe(params => this.articleId = params['id']);
  }

  public openModal(): void {
    const message = 'Are you sure that you want to delete this news?';
    console.log(this, 'detail')
    this.modal.openModal(message, () => this.deleteArticle());
  }

  public deleteArticle(): void {
    const articleIndex = this.store.articles.findIndex(article => article === this.article);
    this.store.articles.splice(articleIndex, 1);
    this.router.navigate(['']);
    this.notice.success('The news has been deleted');
  }

  ngOnInit() {
    this.article = this.store.articles.find(article => article.source.id === this.articleId);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
