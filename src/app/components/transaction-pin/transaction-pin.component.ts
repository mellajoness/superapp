import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-transaction-pin',
  templateUrl: './transaction-pin.component.html',
  styleUrls: ['./transaction-pin.component.scss'],
})
export class TransactionPinComponent implements OnInit {
  hideButtonBool;

  otp;
  
  config = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: true,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      width: '2rem',
      height: '2rem',
      color: '#000000',
    },
    containerClass: 'otp-container'
  };


  @ViewChild('ngOtpInput',  {static: false}) ngOtpInput: any;

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams
  ) { }

  ngOnInit() {}

  onOtpChange(otp) {
    this.otp = otp;
    console.log(this.otp);
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

  clearOTP(){
    this.ngOtpInput.setValue(0);
  }

  getPin() {
    this.modalCtrl.dismiss(this.otp);
  }

  hideButton() {
    if (this.otp !== '') {
      if (isNaN(parseInt(this.otp, 10))) {
        return this.hideButtonBool = true;
      } else {
        return this.hideButtonBool = false;
      }
    } else {
      return this.hideButtonBool = true;
    }
    // return this.hideButtonBool();
  }

}
