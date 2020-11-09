import { Component, OnInit } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-success',
  templateUrl: './success.page.html',
  styleUrls: ['./success.page.scss'],
})
export class SuccessPage implements OnInit {
  groupInfo: any;
  backButtonSubscription: any;

  constructor(
    private socialSharing: SocialSharing,
    private route: ActivatedRoute,
    private router: Router,
    private platform: Platform,
  ) { }

  ngOnInit() {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      this.router.navigate(['investments/landing']);
    });

    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.groupInfo = this.router.getCurrentNavigation().extras.state.data;
      }
      console.log('params: ', this.groupInfo);
    });
  }

  socialShare() {
    // this is the complete list of currently supported params you can pass to the plugin (all optional)
    const options = {
      message: `Use this code ${this.groupInfo.groupCode} to join a challenge on SuperAppInvestments`,
      // not supported on some apps (Facebook, Instagram)
    };
    this.socialSharing.shareWithOptions(options);
  }

  navToLanding() {
    this.router.navigate(
      ['/', 'investments', 'landing']);
  }

  ionViewWillLeave() {
    this.backButtonSubscription.unsubscribe();
  }

}
