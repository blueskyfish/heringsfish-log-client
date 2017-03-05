/*!
 * Heringsfish Log Client - https://github.com/blueskyfish/heringsfish-log-client.git
 *
 * The small browser client for the Payara (or Glassfish) application server.
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2017 BlueSkyFish
 */

import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";


@Injectable()
export class SettingService {

  private _mLogSettings: { [index: string] : LogSettingItem } = {};

  private _subject: Subject<string[]> = new Subject();

  private _maxCount: number = 1000;
  private _subjectMaxCount: Subject<number> = new Subject();

  constructor() {
    this.addColumn('no', true, '#');
    this.addColumn('timestamp', true, 'Timestamp');
    this.addColumn('timeMillis', false, 'Time in Milliseconds');
    this.addColumn('logLevel', true, 'Log Level');
    this.addColumn('logValue', false, 'Log Value');
    this.addColumn('logName', true, 'Log Name');
    this.addColumn('threadId', true, 'Thread ID');
    this.addColumn('threadName', false, 'Thread Name');
    this.addColumn('messageId', false, 'Message ID');
    this.addColumn('logMessage', true, 'Message');
  }

  public isColumnShow(name: string): boolean {
    const s: LogSettingItem = this.getColumn(name);
    return s != null ? s.show : false;
  }

  public setColumnShow(name: string, show: boolean) {
    const s: LogSettingItem = this.getColumn(name);
    if (s) {
      s.show = show;
    }
  }

  public getColumnTitle(name: string): string {
    const s: LogSettingItem = this.getColumn(name);
    return s != null ? s.title : null;
  }

  public getColumn(name: string): LogSettingItem {
    if (this._mLogSettings.hasOwnProperty(name)) {
      return this._mLogSettings[name];
    }
    return null;
  }

  public addColumn(name: string, show: boolean, title: string) {
    this._mLogSettings[name] = new LogSettingItem(name, show, title);
  }

  public getAllColumnNames(): Array<string> {
    const names: Array<string> = [];
    for (let name in this._mLogSettings) {
      if (this._mLogSettings.hasOwnProperty(name)) {
        names.push(name);
      }
    }
    return names;
  }

  public updateMaxCount(maxCount: number) {
    if (this._maxCount != maxCount) {
      this._maxCount = maxCount;
      this.submitMaxCount();
    }
  }

  public submitMaxCount() {
    this._subjectMaxCount.next(this._maxCount);
  }

  public submitColumn() {
    const names = this._getAllVisibleColumnNames();
    this._subject.next(names);
  }

  public getColumnSubject() : Subject<string[]> {
    return this._subject;
  }

  public getMaxCountSubject(): Subject<number> {
    return this._subjectMaxCount;
  }

  private _getAllVisibleColumnNames(): Array<string> {
    const names: Array<string> = [];
    for (let name in this._mLogSettings) {
      if (this.isColumnShow(name)) {
        names.push(name);
      }
    }
    return names;
  }
}

export class LogSettingItem {

  constructor(public name: string, public show: boolean, public title: string) {}

}
