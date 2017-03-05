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

  constructor() { }


  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  public onClickBrand() {
    this.aboutDialog.show();
  }

  public onClickRefresh() {
    console.log('Refresh Clicked');
  }

  public onClickSetting() {
    this.settingDialog.show();
  }

}
