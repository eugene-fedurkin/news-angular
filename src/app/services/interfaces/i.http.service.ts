import { News } from '../../models/news';
import { Sources } from '../../models/sources';
import { Source } from '../../models/source';

export abstract class IHttpService {
  abstract getNews(): Promise<News>;
  abstract getSources(): Promise<Sources>;
  abstract getNewsBySources(sources: Source[]): Promise<News>;
  abstract getNewsByQuery(query: string, source: Source[]): Promise<News>;
}
