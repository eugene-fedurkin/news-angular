import { News } from '../../models/news';
import { Sources } from '../../models/sources';

export abstract class IHttpService {
  abstract getNews(): Promise<News>;
  abstract getSources(): Promise<Sources>;
}
