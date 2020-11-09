import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/user/profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IPaydayEligibilityCheckResp } from 'src/app/models/loan/IPaydayEligibilityCheckResp';

@Component({   
  selector: 'app-payday-ineligibility-feedback',
  templateUrl: './payday-ineligibility-feedback.page.html',
  styleUrls: ['./payday-ineligibility-feedback.page.scss'],
})
export class PaydayIneligibilityFeedbackPage implements OnInit {

  userInfo: any;
  reason: string[] = ['Loan amount is too high', 'Loan interest is too high', 'Changes are too much', 'Loan term is too short'];
  eligibilityInfo: IPaydayEligibilityCheckResp;
  userMessage: string;

  constructor(
    private ProfileService: ProfileService,
    activatedRoute: ActivatedRoute,
    private router: Router) { 
    activatedRoute.paramMap.subscribe(params => {
      if (router.getCurrentNavigation().extras.state) {
        this.eligibilityInfo = router.getCurrentNavigation().extras.state.intent;
        this.userMessage = this.eligibilityInfo.message;
        console.log('payday-application', this.eligibilityInfo);
      }
    });
  }

  ngOnInit() {
    this.userInfo = this.ProfileService.getUserProfileData()
  }

  gotoDashboard(){
    this.router.navigate(['loans']);
  }

}
