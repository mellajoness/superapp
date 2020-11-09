import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, MenuController } from '@ionic/angular';
import { UserService } from 'src/app/services/user/user.service';
import { SharedData } from 'src/app/shared/shared.components';
import { LoaderService } from 'src/app/services/utilities/loader.service';
import { AlertService } from 'src/app/services/utilities/alert.service';
import { BillspaymentsService } from 'src/app/services/billspayments/billspayments.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Handlers } from 'src/app/shared/handlers';
import { CustomalertComponent } from 'src/app/components/customalert/customalert.component';
import { EventsService } from 'src/app/services/events/events.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss', '../../../theme/payments.scss'],
})
export class NotificationsPage implements OnInit {

  notifications;
  notification;
  currEvent;

  constructor(
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private userSrvc: UserService,
    private loaderSrvc: LoaderService,
    private alertSrvc: AlertService,
    public sharedData: SharedData,
    private storageService: StorageService,
    public handlers: Handlers,
    private events: EventsService
  ) { }

  ngOnInit() {
    this.notifications = this.sharedData.NOTIFICATIONS;
    if(this.notifications && this.notifications.length > 0) {
      this.alertSrvc.showInfoToast('Swipe left to delete notification');
    }
  }

  ionViewWillEnter() {
    this.currEvent = this.events.observeModal.subscribe(res => {
      if (res === 'yes') {
        this.doDelete();
      } else {}
    });
  }

  ionViewWillLeave() {
    this.currEvent.unsubscribe();
  }

  goBack() {
    this.navCtrl.back();
  }

  showNotification(notification) {
    let index = this.sharedData.NOTIFICATIONS.indexOf(notification);
    this.sharedData.NOTIFICATIONS[index].read = true;
    this.storageService.store("app-notifications", this.sharedData.NOTIFICATIONS);
    this.alertSrvc.displayShowNotificationModal(notification, null)
  }

  async deleteNotification(notification) {
    this.notification = notification;
    this.alertSrvc.displayDeleteNotificationModal('Delete Notification?', null)
  }
  
  doDelete() {
    this.sharedData.NOTIFICATIONS.splice(this.sharedData.NOTIFICATIONS.indexOf(this.notification), 1);
    this.storageService.store('app-notifications', this.sharedData.NOTIFICATIONS);
    this.storageService.get("app-notifications").then(storageNotifications => {
      this.sharedData.NOTIFICATIONS = storageNotifications
      this.alertSrvc.showSuccessToast("Notification deleted");
    })
  }

}
