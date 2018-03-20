import { Component } from '@angular/core';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  public get message(): string {
    return this.modal.message;
  }
  public get isOpen(): boolean {
    return this.modal.isOpen;
  }

  constructor(private modal: ModalService) { }

  public prefer(): void {
    this.modal.perform();
  }

  public close(): void {
    this.modal.close();
  }
}
