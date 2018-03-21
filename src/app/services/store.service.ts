import { Injectable } from '@angular/core';
import { Source } from '../models/source';
import { Article } from '../models/article';
import { NoticeService } from './notice.service';

@Injectable()
export class StoreService {
  public articles: Article[] = [];
  public query: string = '';
  public sources: Source[] = [];
  public filteredSources: Source[] = [];
  public selectedSources: Source[] = [];
  public articlesToWatchLater: Article[] = [];

  constructor(private notification: NoticeService) {}

  public saveArticleForLater(article: Article): void {
    if (!localStorage[article.source.id]) {
      localStorage[article.source.id] = JSON.stringify(article);
      this.notification.success('The news added to "Watch Later"')
    } else {
      this.notification.warning('The news exists to "Watch Later"');
    }
  }

  public addId(articles: Article[]): Article[] {
    return articles.map(article => {
      if (!article.source.id) {
        const id = `${article.source.name}${article.publishedAt.split(':').join('')}`;
        article.source.id = id
      }
      return article;
    });
  }
}