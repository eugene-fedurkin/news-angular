import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IHttpService } from './interfaces/i.http.service';
import { Sources } from '../models/sources';
import { News } from '../models/news';
import { Source } from '../models/source';
import { Article } from '../models/article';

@Injectable()
export class HttpMockService implements IHttpService {

  private querySourses: string = 'https://newsapi.org/v2/sources?apiKey=ecf84d5a084e4a2ca8d741538a99555a';
  private queryNews: string = 'https://newsapi.org/v2/everything?q=angular&apiKey=ecf84d5a084e4a2ca8d741538a99555a';
  
  constructor(private http: HttpClient) { }
  
  public getNews(): Promise<any> {
    return Promise.resolve(news);
  }
  
  public getSources(): Promise<Sources> {
    return Promise.resolve(sources);
  }
  
  public getNewsBySources(sources: Source[]): Promise<any> {
    return Promise.resolve(news);
  }

  public getNewsByQuery(query: string, source: Source[]): Promise<any> {
    return Promise.resolve(news);
  }
}

const sources = {
  "status": "ok",
  "sources": [
  {
  "id": "abc-news",
  "name": "ABC News",
  "description": "Your trusted source for breaking news, analysis, exclusive interviews, headlines, and videos at ABCNews.com.",
  "url": "http://abcnews.go.com",
  "category": "general",
  "language": "en",
  "country": "us"
  },
  {
    "id": "bbc-news",
    "name": "BBC News",
    "description": "Use BBC News for up-to-the-minute news, breaking news, video, audio and feature stories. BBC News provides trusted World and UK news as well as local and regional perspectives. Also entertainment, business, science, technology and health news.",
    "url": "http://www.bbc.co.uk/news",
    "category": "general",
    "language": "en",
    "country": "gb"
  },
  {
    "id": "crypto-coins-news",
    "name": "Crypto Coins News",
    "description": "Providing breaking cryptocurrency news - focusing on Bitcoin, Ethereum, ICOs, blockchain technology, and smart contracts.",
    "url": "https://www.ccn.com",
    "category": "technology",
    "language": "en",
    "country": "us"
  },
  {
    "id": "daily-mail",
    "name": "Daily Mail",
    "description": "All the latest news, sport, showbiz, science and health stories from around the world from the Daily Mail and Mail on Sunday newspapers.",
    "url": "http://www.dailymail.co.uk/home/index.html",
    "category": "entertainment",
    "language": "en",
    "country": "gb"
  },
  {
    "id": "globo",
    "name": "Globo",
    "description": "Só na globo.com você encontra tudo sobre o conteúdo e marcas do Grupo Globo. O melhor acervo de vídeos online sobre entretenimento, esportes e jornalismo do Brasil.",
    "url": "http://www.globo.com/",
    "category": "general",
    "language": "pt",
    "country": "br"
  },
  ]
};

const news = {
  "status": "ok",
  "totalResults": 44741,
  "articles": [
    {
    "source": {
      "id": "",
      "name": "Investopedia.com"
    },
    "author": "John Kelleher",
    "title": "Bitcoin",
    "description": "Bitcoin is a digital or virtual currency that uses peer-to-peer technology to facilitate instant payments.",
    "url": "https://www.investopedia.com/terms/b/bitcoin.asp",
    "urlToImage": "https://i.investopedia.com/dimages/graphics/bitcoin.jpg",
    "publishedAt": "2018-03-08T07:00:00Z"
    },
    {
      "source": {
      "id": "Qz",
      "name": "Qz.com"
    },
    "author": "Dan Kopf",
    "title": "Why are people still using so much cash?",
    "description": "Bitcoin bitcoin bitcoin. All I ever hear about it bitcoin. (And when it’s not bitcoin, it’s often other cryptocurrencies.) But there is another means of…",
    "url": "https://qz.com/1227322/why-are-people-still-using-so-much-cash/",
    "urlToImage": "https://qzprod.files.wordpress.com/2018/03/mnuchincash.jpg?quality=80&strip=all&w=1600",
    "publishedAt": "2018-03-15T16:46:45Z"
    },
    {
      "source": {
        "id": "the-new-york-times",
        "name": "The New York Times"
      },
      "author": "BORHAN OSMAN",
      "title": "Op-Ed Contributor: The U.S. Needs to Talk to the Taliban in Afghanistan",
      "description": "Washington shies away from the idea of direct talks, but the Taliban see the United States as the decisive actor on the battlefield.",
      "url": "https://www.nytimes.com/2018/03/19/opinion/america-afghanistan-taliban-talks.html",
      "urlToImage": "https://static01.nyt.com/images/2018/03/13/opinion/13osman/13osman-facebookJumbo.jpg",
      "publishedAt": "2018-03-19T09:45:06Z"
    },
    {
      "source": {
        "id": "the-wall-street-journal",
        "name": "The Wall Street Journal"
      },
      "author": "Jay Greene",
      "title": "Oracle Earnings: What to Watch",
      "description": "Oracle is set to report earnings for its fiscal third quarter after the close of trading Monday.",
      "url": "https://www.wsj.com/articles/oracle-earnings-what-to-watch-1521451801",
      "urlToImage": "https://images.wsj.net/im-4219/social",
      "publishedAt": "2018-03-19T09:30:10Z"
    }
  ]
}