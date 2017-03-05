/*!
 * Heringsfish Log Client - https://github.com/blueskyfish/heringsfish-log-client.git
 *
 * The small browser client for the Payara (or Glassfish) application server.
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2017 BlueSkyFish
 */

import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {AboutDialogComponent} from "../dialog/about-dialog.component";
import {SettingDialogComponent} from "../dialog/setting-dialog.component";
import {SocketService} from "../service/socket.service";
import {LogEntryService} from "../service/log-entry.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.less']
})
export class NavBarComponent implements OnInit, AfterViewInit {

  @ViewChild(AboutDialogComponent)
  public readonly aboutDialog: AboutDialogComponent;

  @ViewChild(SettingDialogComponent)
  public readonly settingDialog: SettingDialogComponent;

  constructor(private socketService: SocketService, private logEntryService: LogEntryService) { }

  public running(): boolean {
    return this.socketService.socketOpen();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  public onClickBrand() {
    this.aboutDialog.show();
  }

  public onClickRefresh() {
    this.logEntryService.submitClearing();
  }

  public onClickStart() {
    this.socketService.start();
  }

  public onClickPause() {
    this.socketService.pause();
  }

  public onClickSetting() {
    this.settingDialog.show();
  }


}
