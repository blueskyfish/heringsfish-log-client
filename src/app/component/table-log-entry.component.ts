import { Component, OnInit } from '@angular/core';
import {SettingService} from "../service/setting.service";
import {ILogEntry, LogEntry} from "../shared/log-entry";

@Component({
  selector: 'app-table-log-entry',
  templateUrl: './table-log-entry.component.html',
  styleUrls: ['./table-log-entry.component.css']
})
export class TableLogEntryComponent implements OnInit {

  private logNames: Array<string> = [];

  private logMessages: Array<ILogEntry> = [];

  constructor(private settingService: SettingService) { }

  ngOnInit() {
    this.logNames = this.settingService.getColumnNames();
    console.log('Log Names: %s', JSON.stringify(this.logNames));

    this.logMessages.push(new LogEntry('2017-03-01T13:00:41.102+0100', 1488369641102, 'INFO', 800, 'javax.enterprise.logging', '18', 'RunLevelControllerThread-1488369640990', 'NCLS-LOGGING-00009', 'Running Payara Version: Payara Server  4.1.1.164 #badassfish (build 28)'));
    this.logMessages.push(new LogEntry('2017-03-01T13:00:41.102+0100', 1488369641102, 'INFO', 800, 'javax.enterprise.logging', '18', 'RunLevelControllerThread-1488369640990', 'NCLS-LOGGING-00009', 'Running Payara Version: Payara Server  4.1.1.164 #badassfish (build 28)'));
    this.logMessages.push(new LogEntry('2017-03-01T13:00:41.102+0100', 1488369641102, 'WARNING', 900, 'javax.enterprise.logging', '18', 'RunLevelControllerThread-1488369640990', 'NCLS-LOGGING-00009', 'Running Payara Version: Payara Server  4.1.1.164 #badassfish (build 28)'));
  }

  getColumnTitle(name: string): string {
    return this.settingService.getLogColumnTitle(name);
  }

  getColumnValue(index: number, message: ILogEntry, name: string): any {
    if (name == 'no') {
      return index + 1;
    }
    return message.get(name);
  }
}

/*
 [2017-03-01T13:00:41.102+0100] [Payara 4.1] [INFO] [NCLS-LOGGING-00009] [javax.enterprise.logging] [tid: _ThreadID=18 _ThreadName=RunLevelControllerThread-1488369640990] [timeMillis: 1488369641102] [levelValue: 800] [[
 Running Payara Version: Payara Server  4.1.1.164 #badassfish (build 28)]]

 */
