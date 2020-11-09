import { Component, OnInit } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-social-share',
  templateUrl: './social-share.component.html',
  styleUrls: ['./social-share.component.scss'],
})
export class SocialShareComponent implements OnInit {

  planData;


  constructor(
    private navParams: NavParams,
    private socialSharing: SocialSharing,
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    this.planData = this.navParams.data;
  }

  socialShare() {
    // this is the complete list of currently supported params you can pass to the plugin (all optional)
    const options = {
      message: `Use this code ${this.planData.groupSavingCode} to join a challenge on SuperAppInvestments`,
      // not supported on some apps (Facebook, Instagram)
    };
    this.socialSharing.shareWithOptions(options);
    this.dismiss();
  }

  dismiss(){
    this.modalCtrl.dismiss();
  }

}
