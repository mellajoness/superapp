import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { SharedData } from 'src/app/shared/shared.components';
import { Handlers } from 'src/app/shared/handlers';
import { BillspaymentsService } from 'src/app/services/billspayments/billspayments.service';
import { CustomalertComponent } from 'src/app/components/customalert/customalert.component';
import { EventsService } from 'src/app/services/events/events.service';
import { AlertService } from 'src/app/services/utilities/alert.service';
import { WalletService } from 'src/app/services/payments/wallet/wallet.service';

@Component({
  selector: 'app-banks',
  templateUrl: './banks.page.html',
  styleUrls: ['./banks.page.scss'],
})
export class BanksPage implements OnInit {

  pageReady;
  searchContact;
  currEvent;
  banks;
  savedBanks;
  returnedBanks;

  constructor(
    private router: Router,
    private navCtrl: NavController,
    public sharedData: SharedData,
    public handlers: Handlers,
    private alertSrvc: AlertService,
    private walletService: WalletService
  ) {}

  ngOnInit() {

  }

  ionViewWillEnter() {

    console.log(this.sharedData.walletBanks);

    this.banks = this.sharedData.walletBanks;
    this.savedBanks = this.banks;
    console.log(this.savedBanks)
  }

  ionViewWillLeave() {
  }

  goBack() {
    this.navCtrl.back();
  }

  go(bank) {
    let name = bank.name;
    bank['name'] = name;
    this.sharedData.walletBank = bank;
    this.goBack();
  }

  // re-initializing beneficiaries
  recallBanks(){
    this.returnedBanks = this.savedBanks;
  }

  // Filter beneficiary for input fields
  onSearchContact(ev: any) {
    // Call to re-initialize beneficiaries
    this.recallBanks();

    let val = ev.target.value;

    this.banks = this.returnedBanks.filter((ban) => {
      return ban.name && ban.name.toLowerCase().indexOf(val.toLowerCase()) > -1
    });
  }

}
