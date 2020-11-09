import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SharedData } from 'src/app/shared/shared.components';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  observeModal = new Subject<string>();
  afterModalIsClose = this.observeModal.asObservable();
  
  observeModal_ = new Subject<string>();
  afterModalIsClose_ = this.observeModal.asObservable();

  observeEvent = new Subject<string>();
  whenTrue = this.observeEvent.asObservable();

  observeWallet = new Subject<string>();
  whenWalletIsTrue = this.observeWallet.asObservable();

  observeDashboardWallet = new Subject<string>();
  whenDashboardWalletIsTrue = this.observeDashboardWallet.asObservable();

  observeWalletBalance = new Subject<string>();
  whenWalletBalanceIsTrue = this.observeWalletBalance.asObservable();

  constructor(
    public sharedData: SharedData,
  ) { }

  getModalValue() {
    this.observeModal.next(this.sharedData.action);
  }

  getModalValue_() {
    this.observeModal_.next(this.sharedData.action_);
  }

  getWalletBalance() {
    this.observeWalletBalance.next(this.sharedData.wallet.walletBalance);
  }

  getEvent() {
    this.observeEvent.next(this.sharedData.reloadAccount);
  }

  getWalletEvent() {
    this.observeWallet.next(this.sharedData.wallet.refreshWallet);
  }

  getDashboardWalletEvent() {
    this.observeDashboardWallet.next(this.sharedData.wallet.refreshDashboardWallet);
  }
}
