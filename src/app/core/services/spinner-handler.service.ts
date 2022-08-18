import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SpinnerHandlerService {
  // public reqNumber: number = 0;
  private showSpinner: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public readonly showSpinner$ = this.showSpinner.asObservable();

  // handleRequest = (state: string = 'minus') => {
  //   this.reqNumber = (state === 'plus') ? this.reqNumber + 1 : this.reqNumber - 1;
  //   this.showSpinner.next(this.reqNumber > 0);
  // }

  constructor() { }
  show() {
    Promise.resolve().then(() => { this.showSpinner.next(true) });
    // Swal.fire('Please wait')
    // Swal.showLoading();
  }

  hide() {
    Promise.resolve().then(() => { this.showSpinner.next(false) });

    // Swal.close();
  }
}