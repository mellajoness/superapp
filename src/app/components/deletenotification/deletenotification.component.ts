import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Router } from '@angular/router';
import { EventsService } from 'src/app/services/events/events.service';
import { SharedData } from 'src/app/shared/shared.components';

@Component({
  selector: 'app-deletenotification',
  templateUrl: './deletenotification.component.html',
  styleUrls: ['./deletenotification.component.scss', '../../../theme/payments.scss'],
})
export class DeletenotificationComponent implements OnInit {

  successRoute;
  successMessage;

  constructor(
    public modalCtrl: ModalController,
    private navParams: NavParams,
    private router: Router,
    private events: EventsService,
    public sharedData: SharedData ) { }

  ngOnInit() {
    this.successMessage = this.navParams.get('message');
    this.successRoute = this.navParams.get('route');
  }

  dismiss(action) {
    this.sharedData.action = action;
    this.events.getModalValue();
    this.modalCtrl.dismiss();
  }

}
