import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionPinService } from 'src/app/services/security/transaction-pin.service';
import { LoaderService } from 'src/app/services/utilities/loader.service';
import { AlertService } from 'src/app/services/utilities/alert.service';
import { PasswordPinService } from 'src/app/services/security/password-pin.service';
import { SavingsService } from 'src/app/services/investment/savings.service';
import { ModalController, AlertController, NavController, Platform } from '@ionic/angular';
import { FundingService } from 'src/app/services/investment/funding.service';
import { Handlers } from 'src/app/shared/handlers';
import { ProfileService } from 'src/app/services/user/profile.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.page.html',
  styleUrls: ['./leaderboard.page.scss'],
})
export class LeaderboardPage implements OnInit {
  plan: any;
  users;
  index = 0;
  userEmail: string;
  userIsAdmin: boolean;
  filteredUsers: any;
  admin: any;
  currentUser: any;
  backButtonSubscription: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private transactionPinSrvc: TransactionPinService,
    private loaderService: LoaderService,
    private alertServcie: AlertService,
    private passwordPinSrvc: PasswordPinService,
    private savingsSrvc: SavingsService,
    private modalCtrl: ModalController,
    private platform: Platform,
    private navCtrl: NavController,
    public handlers: Handlers,
    private profileSrvc: ProfileService
  ) { }

  ngOnInit() {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      this.back();
    });

    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.plan = this.router.getCurrentNavigation().extras.state.pageExtras;
      }
      console.log('params: ', this.plan);
    });

    this.userEmail = this.profileSrvc.getUserEmail();
  }

  ionViewWillEnter() {
       this.savingsSrvc.getAllGroupMembersById(this.plan.goalId).subscribe(res => {
      console.log(res);
      if (res) {
        this.users = res;
        this.filteroutUser();
        this.setAdminWithEmail();
        console.log(this.userIsAdmin);
      }
    });
  }

  ionViewDidEnter() {
    // this.setAdminWithEmail();
    console.log(this.userIsAdmin);
    // this.filteroutAdmin();
  }

  setAdminWithEmail() {
    if (this.plan.email === this.userEmail) {
      this.userIsAdmin = true;
    } else {
      this.userIsAdmin = false;
    }
  }

  filteroutUser() {
    this.filteredUsers = this.users.filter((user) => {
      if (user.email === this.userEmail) {
        this.currentUser = user;
      }
      return user.email !== this.userEmail;
    });
    console.log(this.filteredUsers);
    console.log(this.currentUser);
  }

  back() {
    // this.navCtrl.back();
    this.router.navigate(['investments/save/group-detail'], {replaceUrl: false });
  }

  ionViewWillLeave() {
    this.backButtonSubscription.unsubscribe();
  }


}
