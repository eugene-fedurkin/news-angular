import { Injectable } from '@angular/core';
import { Notice } from '../models/notice';

@Injectable()
export class NoticeService {
  public queue: Notice[] = [];

  public success(message: string, time: number = 4): void {
    this.queue.push(new Notice('success', message));
    setTimeout(() => this.queue.shift(), time * 1000);
  }

  public warning(message: string, time: number = 4): void {
    this.queue.push(new Notice('warning', message));
    setTimeout(() => this.queue.shift(), time * 1000);
  }

  public error(message: string, time: number = 4): void {
    this.queue.push(new Notice('error', message));
    setTimeout(() => this.queue.shift(), time * 1000);
  }
}