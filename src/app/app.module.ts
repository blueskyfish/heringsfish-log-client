/*!
 * Heringsfish Log Client - https://github.com/blueskyfish/heringsfish-log-client.git
 *
 * The small browser client for the Payara (or Glassfish) application server.
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2017 BlueSkyFish
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { Ng2BootstrapModule } from 'ng2-bootstrap';

import { AppRoot } from './app-root.component';

import { SocketService } from './service/socket.service';
import { SettingService } from "./service/setting.service";
import { DialogService } from "./dialog/dialog.service";

import { NavBarComponent } from './component/nav-bar.component';
import { TableLogEntryComponent } from './component/table-log-entry.component';
import { AboutComponent } from './dialog/about.component';

@NgModule({
  declarations: [
    AppRoot,
    NavBarComponent,
    TableLogEntryComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2BootstrapModule.forRoot()
  ],
  providers: [
    SocketService,
    SettingService,
    DialogService,
    { provide: 'Window', useValue: window }
  ],
  bootstrap: [AppRoot]
})
export class AppModule { }
