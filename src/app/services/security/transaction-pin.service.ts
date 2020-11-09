import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StorageService } from '../storage/storage.service';
import { HttpService } from '../http/http.service';
import { ProfileService } from '../user/profile.service';
import { LoaderService } from '../utilities/loader.service';
import { TransactionPinComponent } from 'src/app/components/transaction-pin/transaction-pin.component';

@Injectable({
  providedIn: 'root'
})
export class TransactionPinService {

  isTransactionPinSet: boolean;
  // isLoading: boolean;
  public transactionPinSet;
  userPhone;

  postData = {
    transactionPin : '',
    confirmTransactionPin: '',
    phoneNumber: '',
    password: ''
  };


  constructor(
    private modalCtrl: ModalController,
    private storageSrvc: StorageService,
    private httpSrvc: HttpService,
    private profileSrvc: ProfileService,
    private loaderSrvc: LoaderService,
  ) { 
    this.userPhone = this.profileSrvc.getUserPhone();
  }

  getTransactionPinStatus() {
    this.storageSrvc.get('isTransactionPinSet').then(res => {
     this.isTransactionPinSet = res;
   }).then(res => this.validateTransactionPin());
   //  return state;
 }

 setTransactionPinStatus(value: boolean) {
   this.storageSrvc.store('isTransactionPinSet', value);
 }


 validateTransactionPin() {
   if (this.isTransactionPinSet === true) {
     this.transactionPinSet = true;
   } else if (this.isTransactionPinSet === false) {
     this.loaderSrvc.showLoader();
     this.checkTranPinStatus().subscribe(res => {
       this.loaderSrvc.hideLoader();
       this.transactionPinSet = res.status;
       this.storageSrvc.store('isTransactionPinSet', res.status);
     });
   }
 }

 checkTranPinStatus() {
  //  return this.httpSrvc.post(`UserProfile/IsTransactionPinSet?PhoneNumber=${this.userPhone}`, null);
   return this.httpSrvc.post(`IsTransactionPinSet?PhoneNumber=${this.userPhone}`, null);
 }

 async displayPinModal(componentProps) {
   const modal = await this.modalCtrl.create({
     component: TransactionPinComponent,
     backdropDismiss: false,
     cssClass: 'tranPinModal',
     componentProps
   });

   modal.onDidDismiss()
     .then((data) => {
       const pin = data.data; // Here's your selected user!
       console.log(pin);
   });

   return await modal.present();
 }
}
