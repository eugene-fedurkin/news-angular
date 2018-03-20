import { Component, OnInit } from '@angular/core';
import { NoticeService } from '../services/notice.service';
import { Notice } from '../models/notice';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  animations: [
  trigger('flyInOut', [
    state('in', style({transform: 'translateY(0)', opacity: 1})),
    transition('void => *', [
      style({
        transform: 'translateY(300px)',
        opacity: 0,
      }),
      animate(300)
    ]),
    transition('* => void', [
      animate(300, style({transform: 'translateX(-100%)', opacity: 0}))
    ])
  ])]
})
export class NotificationComponent {

  constructor(private notice: NoticeService) {}

  public get queue(): Notice[] {
    return this.notice.queue;
  }
}
