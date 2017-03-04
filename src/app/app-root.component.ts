/*!
 * Heringsfish Log Client - https://github.com/blueskyfish/heringsfish-log-client.git
 *
 * The small browser client for the Payara (or Glassfish) application server.
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2017 BlueSkyFish
 */

import {Component, OnInit, ViewChild} from '@angular/core';
import {DialogService} from "./dialog/dialog.service";
import {AboutComponent} from "./dialog/about.component";

@Component({
  selector: 'app-root',
  templateUrl: './app-root.component.html'
})
export class AppRoot implements OnInit {

  @ViewChild(AboutComponent)
  public readonly aboutDialog: AboutComponent;

  constructor(private dialogService: DialogService) {}

  ngOnInit(): void {
    this.dialogService.registerDialog('about', this.aboutDialog);
    console.log('register aboutDialog (%s)', (this.aboutDialog != null ? 'true' : 'null'));
  }
}
