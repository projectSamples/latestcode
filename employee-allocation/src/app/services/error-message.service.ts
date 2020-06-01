import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {

  itemsAdded: Subject<IErrorMessage> = new Subject<IErrorMessage>();

  constructor() { }

  push(message) {
    this.itemsAdded.next(message);
  }
}

export interface IErrorMessage {
  id: string;
  message: string;
}
