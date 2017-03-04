import { Component, OnInit } from '@angular/core';
import {DialogService} from "../dialog/dialog.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.less']
})
export class NavBarComponent  {

  constructor(private dialogService: DialogService) { }

  public onClickBrand() {
    this.dialogService.show('about');
  }
  public onClickRefresh() {
    console.log('Refresh Clicked');
  }

}
