import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, NavParams, ModalController } from '@ionic/angular';
import { SharedData } from 'src/app/shared/shared.components';
import { Handlers } from 'src/app/shared/handlers';
import { EventsService } from 'src/app/services/events/events.service';

@Component({
  selector: 'app-bettingcompanies',
  templateUrl: './bettingcompanies.component.html',
  styleUrls: ['./bettingcompanies.component.scss'],
})
export class BettingcompaniesComponent implements OnInit {

  pageReady;
  searchContact;
  contacts;
  successRoute;
  bettingCompanies;
  savedCompanies;
  returnedCompanies;

  constructor(
    public modalCtrl: ModalController,
    private navParams: NavParams,
    private router: Router,
    private navCtrl: NavController,
    public sharedData: SharedData,
    public events: EventsService,
  ) { }

  ngOnInit() {
    this.bettingCompanies = this.navParams.get('message');
    this.savedCompanies = this.bettingCompanies
    this.successRoute = this.navParams.get('route');
  }

  goBack() {
    this.modalCtrl.dismiss();
  }

  getCompany(company, action) {
    this.sharedData.bettingBiller = company
    this.sharedData.action_ = action;
    this.events.getModalValue_();
    this.goBack()
  }

  // re-initializing beneficiaries
  recallBeneficiaries(){
    this.returnedCompanies = this.savedCompanies;
  }

  // Filter beneficiary for input fields
  onSearchContact(ev: any) {
    // Call to re-initialize beneficiaries
    this.recallBeneficiaries();

    let val = ev.target.value;

    this.bettingCompanies = this.returnedCompanies.filter((ben) => {
      return ben.billerName && ben.billerName.toLowerCase().indexOf(val.toLowerCase()) > -1;
    });
  }

}
