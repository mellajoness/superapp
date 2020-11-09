import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { SharedData } from 'src/app/shared/shared.components';
import { Handlers } from 'src/app/shared/handlers';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss', '../../../../theme/payments.scss'],
})
export class ContactsPage implements OnInit {

  pageReady;
  searchContact;
  contacts;

  constructor(
    private router: Router,
    private navCtrl: NavController,
    public sharedData: SharedData,
    public handlers: Handlers,
  ) { }

  ngOnInit() {

  }

  goBack() {
    this.navCtrl.back();
  }

  go(route) {
    this.navCtrl.navigateForward(route);
  }

  onSearchContact(e) {

  }

}
