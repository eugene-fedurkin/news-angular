import { Injectable } from '@angular/core';
import { Source } from '../models/source';
import { Article } from '../models/article';

@Injectable()
export class StoreService {
  public articles: Article[] = [];
  public sources: Source[] = [];
  public filteredSources: Source[] = [];
  public selectedSources: Source[] = [];
  public articlesToWatchLater: Article[] = [];

  public saveArticleForLater(article: Article): void {
    if (!localStorage[article.source.id]) {
      localStorage[article.source.id] = JSON.stringify(article);
    } else {
      console.log('The article is exist') // TODO: add notification
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