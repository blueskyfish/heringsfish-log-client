/*!
 * Heringsfish Log Client - https://github.com/blueskyfish/heringsfish-log-client.git
 *
 * The small browser client for the Payara (or Glassfish) application server.
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2017 BlueSkyFish
 */

import {Injectable, Inject} from '@angular/core';

import { environment } from '../../environments/environment';

import * as io from 'socket.io-client';

import { Observable } from "rxjs/Observable";

import { LogEntry, ILogEntry } from "../shared/log-entry";
import { IServerConfig, ServerConfig } from "../shared/server-config";

@Injectable()
export class SocketService {

  private socketUrl = null;
  private socket = null;
  private socketCount: number;

  constructor(@Inject('Window') window: any) {
    this.socketUrl = SocketService.buildSocketUrl(window);
    this.socket = io(this.socketUrl);
    this.socketCount = 0;

    console.info('SocketURL %s', this.socketUrl);
  }

  public getLogMessages(): Observable<ILogEntry> {
    this.checkSocket();
    return new Observable((observer) => {
      this.socketCount++;
      this.socket.on('log-message', (data) => {

        console.log('Receive LogEntry: %s', JSON.stringify(data));

        const logEntry: ILogEntry = new LogEntry(data.timestamp, data.timeMillis,
          data.logLevel, data.logValue, data.logName, data.threadId, data.threadName, data.messageId, data.logMessage);

        observer.next(logEntry);
      });

      return () => {
        this.releaseSocket();
      }
    });
  }

  public getServerConfig(): Observable<IServerConfig> {
    this.checkSocket();
    return new Observable((observer) => {
      this.socketCount++;
      this.socket.on('server-config', (data) => {

        console.log('Receive ServerConfig: %s', JSON.stringify(data));

        const serverConfig: IServerConfig = new ServerConfig(data.serverLog, data.domainName);
        observer.next(serverConfig);
      });
      return () => {
        this.releaseSocket();
      }
    });
  }

  private checkSocket(): void {
    if (!this.socket) {
      // reconnect !!
      this.socket = io(this.socketUrl);
      this.socketCount = 0;
    }
  }

  private releaseSocket(): void {
    if (this.socketCount > 0) {
      this.socketCount--;
      if (this.socketCount === 0) {
        this.socket.disconnect();
        this.socket = null;
      }
    }
  }


  private static buildSocketUrl(window: any): String {
    if (environment.socketUrl) {
      return environment.socketUrl;
    }

    const l: Location = window.location || {};

    return (l.protocol || 'http') + "//" + (l.hostname || 'localhost') + ":" + (l.port || '5000');
  }
}
