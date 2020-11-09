import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/superApp/IUser';
import { ProfileService } from 'src/app/services/user/profile.service';
import { LoaderService } from 'src/app/services/utilities/loader.service';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { Handlers } from 'src/app/shared/handlers';
import { CustomalertComponent } from 'src/app/components/customalert/customalert.component';

@Component({
  selector: 'app-invest',
  templateUrl: './invest.page.html',
  styleUrls: ['./invest.page.scss'],
})
export class InvestPage implements OnInit {

  userPhone;
  finacleNumber;
  profileData: IUser;
  isStaffValidated;

  constructor(
    public profileService: ProfileService,
    private loaderSrvc: LoaderService,
    private userSrvc: UserService,
    private router: Router,
    private handlers: Handlers
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.profileService.userProfileData.subscribe(res => {
      this.profileData = res;
      this.isStaffValidated = this.profileData.isFidelityCustomerValidated;
    });
  }


  performValidation(){
    // [routerLink]="['/investments', 'invest', 'fd-calculator']"
    if (this.isStaffValidated) {
      this.router.navigate(['/investments', 'invest', 'fd-calculator']);
    } else {
      this.handlers.validateFidelityCustomer(CustomalertComponent);
    }
  }

}
