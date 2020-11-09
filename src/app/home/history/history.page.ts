import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/user/profile.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss', '../../../theme/payments.scss'],
})
export class HistoryPage implements OnInit {

  consolidatedTransactions;
  transactionsSubscription;

  constructor(
    private profileSrvc: ProfileService,
    private router: Router
  ) {
    // Get Transactions
    this.transactionsSubscription = setInterval(() => {
      if (this.router.url.split('/')[1] === 'home' && this.router.url.split('/')[2] === 'dashboard') {
        this.getConsolidatedTransactions();
      }
    }, 60000);
  }

  ngOnInit() {
    // Get Transactions
    this.getConsolidatedTransactions();
  }

  getConsolidatedTransactions() {
    this.profileSrvc.getConsolidatedTransactions()
      .subscribe(
        (res: any) => {
          this.consolidatedTransactions = res
        },
        err => {
          // this.consolidatedTransactions = [];
        }
      )
  }

}
