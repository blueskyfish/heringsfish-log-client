import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";

@Injectable()
export class LogEntryService {

  private _clearing: Subject<any> = new Subject();

  constructor() { }

  public getClearingSubject() : Subject<any> {
    return this._clearing;
  }

  public submitClearing() {
    this._clearing.next(1);
  }
}
