import { Component, OnInit } from '@angular/core';
import { SharedData } from 'src/app/shared/shared.components';
import { Router } from '@angular/router';
import { NavController, MenuController } from '@ionic/angular';
import { Handlers } from 'src/app/shared/handlers';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.page.html',
  styleUrls: ['./payments.page.scss', '../../theme/payments.scss'],
})
export class PaymentsPage implements OnInit {

  menu;
  route;

  constructor(
    public sharedData: SharedData,
    public handlers: Handlers,
    private router: Router,
    private navCtrl: NavController,
    private menuCtrl: MenuController,
  ) {

    this.actions();
    this.route = this.router.url; 

  }

  ngOnInit() {
  }

  toggleMenu(m) {
    this.menuCtrl.toggle('invest-menu');
    if (m.url === '/home') {
      this.navCtrl.navigateBack(m.url);
    }
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true, 'invest-menu')
  }

  ionViewWillLeave() {
    this.menuCtrl.enable(false, 'invest-menu');
  }

  actions() {
    this.menu = [
      {
        id: "1", name: "Home", icon: "../../assets/icon/home.png", url: ""
      },
      {
        id: "2", name: "Profile", icon: "../../assets/icon/user.png", url: ""
      },
      {
        id: "3", name: "Accounts & Cards", icon: "../../assets/icon/credit-card.png", url: ""
      },
      {
        id: "4", name: "Settings", icon: "../../assets/icon/settings.png", url: ""
      },
      {
        id: "5", name: "Recurring bill payment", icon: "../../assets/icon/file-text.png", url: ""
      },
      {
        id: "6", name: "Talk with us", icon: "../../assets/icon/customer-service.png", url: ""
      },
      {
        id: "7", name: "Logout", icon: "../../assets/icon/logout-circle-line.png", url: "/home"
      },
    ]
  }

}
