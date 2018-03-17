import { Injectable } from '@angular/core';
import { Source } from '../models/source';
import { Article } from '../models/article';

@Injectable()
export class StoreService {
  public articles: Article[] = [];
  public sources: Source[] = [];
  public filteredSources: Source[] = [];
  public selectedSources: Source[] = [];

  saveArticleForLater(article: Article): void {
    if (!localStorage[article.source.name]) {
      localStorage[article.source.name] = JSON.stringify(article);
    } else {
      console.log('The article is exist') // TODO: add notification
    }
  }
}