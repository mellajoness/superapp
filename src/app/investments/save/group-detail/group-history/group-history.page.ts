import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SavingsService } from 'src/app/services/investment/savings.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-group-history',
  templateUrl: './group-history.page.html',
  styleUrls: ['./group-history.page.scss'],
})
export class GroupHistoryPage implements OnInit {

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
    this.router.navigate(['investments/save/group-detail'], {replaceUrl: true });
  }

  ionViewWillEnter( ) {
    this.getGroupTransactionHistory();
  }

  getGroupTransactionHistory() {
    if (this.id) {
      this.savingsSrvc.getIndividualGroupChallengeTransactionHistory(this.id).subscribe(res => {
        console.log(res);
        this.historyData = res;
      });
    }
  }

  ionViewWillLeave() {
    this.backButtonSubscription.unsubscribe();
  }

}


