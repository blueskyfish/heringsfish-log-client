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
import {AboutComponent} from "./about.component";
import {IDialog} from "./idialog.component";

@Injectable()
export class DialogService {

  private _dialogs: { [index: string] : IDialog} = {};

  constructor() { }

  public registerDialog(name: string, dialog: IDialog) {
    this._dialogs[name] = dialog;
  }

  public show(name: string) {
    if (this._dialogs.hasOwnProperty(name)) {
      this._dialogs[name].show();
      return;
    }
    console.log('unknown dialog "%s" for shown', name);
  }

  public hide(name: string) {
    if (this._dialogs.hasOwnProperty(name)) {
      this._dialogs[name].hide();
      return;
    }
    console.log('unknown dialog "%s" for hidden', name);
  }
}
