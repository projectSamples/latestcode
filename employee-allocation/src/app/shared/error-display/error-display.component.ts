import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ErrorMessageService, IErrorMessage} from '../../services/error-message.service';
import * as _ from 'lodash';
import {Subject, Subscription} from 'rxjs';

@Component({
  selector: 'app-error-display',
  templateUrl: './error-display.component.html',
  styleUrls: ['./error-display.component.scss']
})
export class ErrorDisplayComponent implements OnDestroy {

  msgs: IErrorMessage[] = [];
  subscription: Subscription;

  constructor(private errorMessage: ErrorMessageService,
              private ref: ChangeDetectorRef) {
    this.subscription = this.errorMessage.itemsAdded.subscribe((error: IErrorMessage) => {
      console.log(error);
      this.msgs.push(error);
      ref.detectChanges();
    });
  }

  remove(id: string) {
    _.remove(this.msgs, (item: IErrorMessage) => item.id === id);
  }

  close(id: string) {
    this.remove(id);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
