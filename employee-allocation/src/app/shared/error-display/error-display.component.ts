import {Component, OnDestroy, OnInit} from '@angular/core';
import {ErrorMessageService, IErrorMessage} from '../../services/error-message.service';
import * as _ from 'lodash';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-error-display',
  templateUrl: './error-display.component.html',
  styleUrls: ['./error-display.component.scss']
})
export class ErrorDisplayComponent implements OnInit, OnDestroy {

  msgs: IErrorMessage[] = [];
  subscription: Subject<IErrorMessage>;

  constructor(private errorMessage: ErrorMessageService) {}

  ngOnInit(): void {
    this.errorMessage.itemsAdded.subscribe((error: IErrorMessage) => {
      this.msgs.push(error);
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
