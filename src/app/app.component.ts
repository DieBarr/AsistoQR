import { Component } from '@angular/core';

import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor( private statusBar: StatusBar) {


// let status bar overlay webview
this.statusBar.overlaysWebView(false);
// set status bar to white
this.statusBar.backgroundColorByHexString('#b0ccff');



  }
}
