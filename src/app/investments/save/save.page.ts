import { Component, OnInit } from '@angular/core';
import { SavingsService } from 'src/app/services/investment/savings.service';

@Component({
  selector: 'app-save',
  templateUrl: './save.page.html',
  styleUrls: ['./save.page.scss'],
})
export class SavePage implements OnInit {

  constructor(
    private savingSrvc: SavingsService
  ) { }

  ngOnInit() {
    this.savingSrvc.getTargetSavingsRate().subscribe((res: any) => {
      this.savingSrvc.updateGoalRateValue(res.goalsAccountInterestRate);
      this.savingSrvc.updateGroupRateValue(res.groupAccountInterestRate);
    });
  }



}
