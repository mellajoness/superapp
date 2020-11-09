import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';


@Injectable({
  providedIn: 'root'
})

export class StatusbarService {

  isCordova;
  oldUrl;

  constructor(
    private statusBar: StatusBar,
    private router: Router,
    private platform: Platform
  ) {
    console.log('Statusbar service started watching');
    // this.checkEvents();

    this.isCordova = this.platform.is('cordova')
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.


  }

  checkEvents() {
    // this.statusBar.overlaysWebView(false);
    this.router.events.subscribe(
      (event: any) => {
        if (event.url) {

          if (this.oldUrl === null) {
            this.oldUrl = event.url;
          }

          if (this.oldUrl === event.url) {
            return;
          }
          console.log('===================================', this.router.url);
          this.oldUrl = event.url;
          const url = event.url.toString();
          if (this.isCordova) {
            if (url.startsWith('/payments')) {
              setTimeout(() => {
                this.statusBar.overlaysWebView(true);
                this.statusBar.styleDefault();
              }, 100);
            }
            else {
              setTimeout(() => {
                this.statusBar.overlaysWebView(false);
                this.statusBar.styleBlackOpaque();
                if (this.platform.is('ios')) {
                  this.statusBar.backgroundColorByHexString('#000000');
                }
              }, 100);
            }
          }
        }
      });
  }

  textColor() {
    const modes = {
      light: () => {
        this.statusBar.styleLightContent();
      },
      dark: () => {
        this.statusBar.styleLightContent();
      }
    }
    return modes
  }

}
