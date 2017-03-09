/*!
 * Heringsfish Log Client - https://github.com/blueskyfish/heringsfish-log-client.git
 *
 * The small browser client for the Payara (or Glassfish) application server.
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2017 BlueSkyFish
 */

import {Injectable, EventEmitter} from '@angular/core';

@Injectable()
export class LogEntryService {

  private _clearing: EventEmitter<any> = new EventEmitter(true);

  constructor() { }

  addClearingListener(callback: ICallback<any>): void {
    this._clearing.subscribe((value: any) => {
      callback(value);
    });
  }

  public submitClearing() {
    this._clearing.emit(1);
  }
}
