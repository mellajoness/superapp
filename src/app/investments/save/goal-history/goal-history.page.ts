import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SavingsService } from 'src/app/services/investment/savings.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-goal-history',
  templateUrl: './goal-history.page.html',
  styleUrls: ['./goal-history.page.scss'],
})
export class GoalHistoryPage implements OnInit {
  plan;
  id;
  historyData:[];
  backButtonSubscription: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private savingsSrvc: SavingsService,
    private platform: Platform,
  ) { }

  ngOnInit() {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      this.back();
    });

    this.route.queryParams.subscribe(params => {

      if ( this.router.getCurrentNavigation().extras.state) {
        this.plan =  this.router.getCurrentNavigation().extras.state.pageExtras;
        this.id = this.plan.goalId;
      }
      console.log('params: ', this.plan);
    });
  }

  back() {
    // this.navCtrl.back();
    this.router.navigate(['investments/save/plan-detail'], {replaceUrl: true });
  }

  ionViewWillEnter( ) {
    this.getGoalsHistory();
  }

  getGoalsHistory() {
    if (this.id) {
      this.savingsSrvc.getGoalsTransactionHistory(this.id).subscribe(res => {
        console.log(res);
        this.historyData = res;
      });
    }
  }

  ionViewWillLeave() {
    this.backButtonSubscription.unsubscribe();
  }

}
