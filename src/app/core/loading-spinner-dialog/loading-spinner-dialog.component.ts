import { Component, OnInit } from '@angular/core';
import { SpinnerHandlerService } from '../services/spinner-handler.service';

@Component({
  selector: 'app-loading-spinner-dialog',
  templateUrl: './loading-spinner-dialog.component.html',
  styleUrls: ['./loading-spinner-dialog.component.css']
})
export class LoadingSpinnerDialogComponent implements OnInit {

  spinnerActive: boolean = true;
  loading$ = this.spinnerHandler.showSpinner$;

  constructor(
    public spinnerHandler: SpinnerHandlerService  
  ) {
    // this.spinnerHandler.showSpinner.subscribe(this.showSpinner.bind(this))
  }

  ngOnInit(): void {
  }

  showSpinner = (state: boolean) => {
    this.spinnerActive = state;
    console.log('observable desde loading spinner');
  }
}
