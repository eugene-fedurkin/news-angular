import { Component, OnInit } from '@angular/core';
import { NoticeService } from '../services/notice.service';
import { Notice } from '../models/notice';

@Component({
  selector: 'notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {

  constructor(private notice: NoticeService) {}

  public get queue(): Notice[] {
    return this.notice.queue;
  }
}
