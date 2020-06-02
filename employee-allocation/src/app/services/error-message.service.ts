import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {

  itemsAdded: Subject<IErrorMessage> = new Subject<IErrorMessage>();

  constructor() { }

  push(message: IErrorMessage) {
    message.id = _.uniqueId('fmId_');
    this.itemsAdded.next(message);
  }
}

export interface IErrorMessage {
  id?: string;
  message: string;
}
