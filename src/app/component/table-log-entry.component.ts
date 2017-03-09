import { Component, OnInit } from '@angular/core';
import {SettingService} from "../service/setting.service";
import {ILogEntry, LogEntry} from "../shared/log-entry";
import {SocketService} from "../service/socket.service";
import {LogEntryService} from "../service/log-entry.service";

@Component({
  selector: 'app-table-log-entry',
  templateUrl: './table-log-entry.component.html',
  styleUrls: ['./table-log-entry.component.css']
})
export class TableLogEntryComponent implements OnInit {

  private logNames: Array<string> = [];

  private maxRows: number = 0;
  private logMessages: Array<ILogEntry> = [];

  constructor(private settingService: SettingService, private socketService: SocketService, private logEntryService: LogEntryService) { }

  ngOnInit() {

    this.settingService.addVisibleColumnListener((names: string[]) => {
      this.logNames = names;
      console.log('Log Names: %s', JSON.stringify(this.logNames));
    });

    this.settingService.addMaxRowsListener((maxRows) => {
      this.maxRows = maxRows;
      console.log('MaxCount %s', this.maxRows);
    });

    this.socketService.addMessageListener((logEntry: ILogEntry) => {

      this.logMessages.unshift(logEntry);

      if (this.logMessages.length > this.maxRows) {
        while (this.logMessages.length > this.maxRows) {
          this.logMessages.pop();
        }
      }
    });

    this.logEntryService.addClearingListener((t) => {
      this.logMessages = [];
      console.log('Clear Log Messages');
    });
  }

  getColumnTitle(name: string): string {
    return this.settingService.getColumnTitle(name);
  }

  getColumnValue(index: number, message: ILogEntry, name: string): any {
    if (name == 'no') {
      return this.logMessages.length - index;
    }
    return message.get(name);
  }
}

/*
 [2017-03-01T13:00:41.102+0100] [Payara 4.1] [INFO] [NCLS-LOGGING-00009] [javax.enterprise.logging] [tid: _ThreadID=18 _ThreadName=RunLevelControllerThread-1488369640990] [timeMillis: 1488369641102] [levelValue: 800] [[
 Running Payara Version: Payara Server  4.1.1.164 #badassfish (build 28)]]

 */
