import { Injectable } from '@angular/core';

@Injectable()
export class SpinnerService {
  private spinnerRequests: number = 0;

  public show(): void {
    this.spinnerRequests++;
  }

  public hide(): void {
    if (this.spinnerRequests > 0) this.spinnerRequests--;
  }

  public isVisible() {
    return !!this.spinnerRequests;
  }
}