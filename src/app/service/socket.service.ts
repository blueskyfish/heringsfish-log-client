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

  private _socketUrl = null;
  private _socket = null;
  private _socketCount: number;
  private _socketOpen: boolean = false;

  constructor(@Inject('Window') window: any) {
    this._socketUrl = SocketService.buildSocketUrl(window);
    this._socketCount = 0;
    console.info('SocketURL %s', this._socketUrl);
  }

  public socketOpen() : boolean {
    return this._socketOpen;
  }

  public start() {
    this.checkSocket();
    this._socket.open();
    this._socket.connect();
    this._socketOpen = true;
  }

  public pause() {
    this.checkSocket();
    this._socket.disconnect();
    this._socketOpen = false;
  }


  public getLogMessages(): Observable<ILogEntry> {
    this.checkSocket();
    return new Observable((observer) => {
      this._socketCount++;
      this._socket.on('message', (data) => {

        console.log('Receive LogEntry: %s', JSON.stringify(data));

        const logEntry: ILogEntry = new LogEntry(data.timestamp, data.timeMillis,
          data.logLevel, data.logValue, data.logName, data.threadId, data.threadName,
          data.messageId, data.logMessage);

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
      this._socketCount++;
      this._socket.on('server-config', (data) => {

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
    if (!this._socket) {
      // reconnect !!
      this._socket = io(this._socketUrl, {
        autoConnect: false
      });
      this._socketCount = 0;
    }
  }

  private releaseSocket(): void {
    if (this._socketCount > 0) {
      this._socketCount--;
      if (this._socketCount === 0) {
        this._socket.disconnect();
        this._socket = null;
      }
    }
  }


  private static buildSocketUrl(window: any): String {
    if (environment.socketUrl) {
      return environment.socketUrl;
    }

    const l: Location = window.location || {};
    const port: number = window.socketPort || 5000;

    return (l.protocol || 'http') + "//" + (l.hostname || 'localhost') + ":" + port;
  }
}
