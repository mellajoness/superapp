import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-group-detail-popover',
  templateUrl: './group-detail-popover.component.html',
  styleUrls: ['./group-detail-popover.component.scss'],
})
export class GroupDetailPopoverComponent implements OnInit {
  plan: any;

  constructor(
    private navParams: NavParams,
    private router: Router,
    public popoverCtrl: PopoverController
  ) { }

  ngOnInit() {
    this.plan = this.navParams.data.plan;
  }

  openLeaderboard(pageExtras) {
    const navigationExtras: NavigationExtras = {
      state: {
        pageExtras,
      },
    };
    this.router.navigate(
      ['/', 'investments', 'save', 'group-detail', 'leaderboard'],
      navigationExtras
    );

    this.popoverCtrl.dismiss();
  }
}
