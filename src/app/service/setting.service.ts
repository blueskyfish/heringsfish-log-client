import { Injectable } from '@angular/core';

@Injectable()
export class SettingService {

  private _mLogSettings: { [index: string] : LogSettingItem } = {};

  constructor() {
    this.addLogColumn('no', true, '#');
    this.addLogColumn('timestamp', true, 'Timestamp');
    this.addLogColumn('timeMillis', false, 'Time in Milliseconds');
    this.addLogColumn('logLevel', true, 'Log Level');
    this.addLogColumn('logValue', false, 'Log Value');
    this.addLogColumn('logName', true, 'Log Name');
    this.addLogColumn('threadId', true, 'Thread ID');
    this.addLogColumn('threadName', false, 'Thread Name');
    this.addLogColumn('messageId', false, 'Message ID');
    this.addLogColumn('logMessage', true, 'Message');
  }

  public isLogColumnShow(name: string): boolean {
    const s: LogSettingItem = this.getLogColumn(name);
    return s != null ? s.show : false;
  }

  public setLogColumnShow(name: string, show: boolean) {
    const s: LogSettingItem = this.getLogColumn(name);
    if (s) {
      s.show = show;
    }
  }

  public getLogColumnTitle(name: string): string {
    const s: LogSettingItem = this.getLogColumn(name);
    return s != null ? s.title : null;
  }

  public getLogColumn(name: string): LogSettingItem {
    if (this._mLogSettings.hasOwnProperty(name)) {
      return this._mLogSettings[name];
    }
    return null;
  }

  public addLogColumn(name: string, show: boolean, title: string) {
    this._mLogSettings[name] = new LogSettingItem(name, show, title);
  }

  public getColumnNames(): Array<string> {
    const names: Array<string> = [];
    for (let name in this._mLogSettings) {
      if (this.isLogColumnShow(name)) {
        names.push(name);
      }
    }
    return names;
  }

}

export class LogSettingItem {

  constructor(public name: string, public show: boolean, public title: string) {}


}
