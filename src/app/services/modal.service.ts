import { Injectable } from '@angular/core';

@Injectable()
export class ModalService {

  public isOpen: boolean = false;
  public message: string = '';
  public callback: any = () => {};

  constructor() {}

  public openModal(message: string, callback: any): void {
    this.isOpen = true;
    this.message = message;
    this.callback = callback;
  }

  public perform(): void {
    this.callback();
    this.isOpen = false;
  }

  public close(): void {
    this.isOpen = false;
  }


}
