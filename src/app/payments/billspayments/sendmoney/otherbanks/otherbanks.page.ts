import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { SharedData } from 'src/app/shared/shared.components';
import { Handlers } from 'src/app/shared/handlers';
import { WalletmodalComponent } from 'src/app/components/walletmodal/walletmodal.component';
import { CustomalertComponent } from 'src/app/components/customalert/customalert.component';
import { PaymentslogicService } from 'src/app/services/payments/paymentslogic/paymentslogic.service';
import { AlertService } from 'src/app/services/utilities/alert.service';
import { BillspaymentsService } from 'src/app/services/billspayments/billspayments.service';

@Component({
  selector: 'app-otherbanks',
  templateUrl: './otherbanks.page.html',
  styleUrls: ['./otherbanks.page.scss', '../../../../../theme/payments.scss'],
})
export class OtherbanksPage implements OnInit {

  pageReady;
  busy;
  busy_;
  noBenef;

  amount;
  banks;
  narration;
  additionalInfo;
  accountToDebit;
  accountToDebitObj;
  bankObj;
  beneficiary;
  atd;
  ben;
  ban;
  accounts;
  accounts_;
  bType;
  doSaveBeneficiary;

  benefAccountNo;
  benefAccountObj;
  institutions;
  getAllUserAccountsSubscription;
  getInstititionsSubscription;

  constructor(
    private router: Router,
    private navCtrl: NavController,
    public sharedData: SharedData,
    public handlers: Handlers,
    private alertSrvc: AlertService,
    private paymentlogicService: PaymentslogicService,
    private billsPaymentsService: BillspaymentsService,
  ) {

    this.getInstitutions();

    this.accountToDebit = "Account to debit";
    this.atd = false;
    this.ban = false;
    this.bType = 'old';


    this.accounts = this.sharedData.userAccounts;

    if ((this.accounts && this.accounts.length < 1) || (!this.accounts && this.sharedData.userProfile.finaclePhoneNumber && this.sharedData.userProfile.isFidelityCustomerValidated)) {
      const data = {
        phoneNo: this.sharedData.userProfile.finaclePhoneNumber
      }
      this.getUserAccounts(data);
    } else {
      this.accounts = this.paymentlogicService.formatAccounts(this.accounts);
      this.accounts_ = this.accounts;
      console.log(this.accounts);
    }

  }

  ngOnInit() {

  }

  ionViewWillEnter() {
    console.log(this.sharedData.beneficiary)
    if (this.sharedData.beneficiary) {
      this.ben = true;
      this.beneficiary = this.sharedData.beneficiary;

    } else {
      this.sharedData.beneficiary = null;
      this.beneficiary = "Select a beneficiary";
      this.ben = false;
    }
  }

  ionViewWillLeave() {
    this.getInstititionsSubscription && this.getInstititionsSubscription.unsubscribe();
    this.getAllUserAccountsSubscription && this.getAllUserAccountsSubscription.unsubscribe();
  }

  goBack() {
    this.navCtrl.back();
  }

  go(route) {
    this.navCtrl.navigateForward(route);
  }

  getInstitutions() {
    this.busy = this.handlers.busy();
    this.getInstititionsSubscription = this.billsPaymentsService.GetInstititions()
    .subscribe(
      (res: any) => {
        if(res && res.code === '00' && res.data && res.data.length > 0) {
          this.banks = res.data;
          this.banks = this.paymentlogicService.formatBanks(this.banks);
          console.log(this.banks);
          this.getBeneficiaries('interbank');
        } else if (res && res.code !== '00') {
          this.busy = !this.handlers.busy();
          this.alertSrvc.showErrorToast(res.message);
          this.goBack();
        } else {
          this.busy = !this.handlers.busy();
          this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
          this.goBack();
        }
        console.log(res)
      },
      err => {
        console.log(err);
        this.busy = !this.handlers.busy();
        this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
        this.goBack();
      }
    )
  }

  getBeneficiaries(tranType) {
    const data = { userId: this.sharedData.userProfile.phoneNumber, channel: "trupay", transferType: tranType }
    this.billsPaymentsService.TransferBeneficiaries(data)
    .subscribe(
      (res: any) => {
        this.busy = !this.handlers.busy();
        if(res && res.code === '00' && res.data && res.data.length > 0) {
          this.sharedData.transferBeneficiaries = res.data;
          this.pageReady = true;
          console.log(this.sharedData.transferBeneficiaries);
        } else {
          this.noBenef = true;
          this.pageReady = true;
          this.bType = 'new';
        }
        console.log(res);
      },
      err => {
        console.log(err);
        this.busy = !this.handlers.busy();
        this.noBenef = true;
        this.pageReady = true;
        this.bType = 'new';
      }
    )
  }

  benefType(type) {
    this.bType = type;
    this.reset();
  }

  reset() {
    this.accountToDebit = "Account to debit";
    this.beneficiary = "Select a beneficiary";
    this.sharedData.beneficiary = null;
    this.ben = false;
    this.atd = false;
    this.ban = false;
    this.accountToDebitObj = null;
    this.bankObj = null;
    this.amount = null;
    this.narration = null;
    this.benefAccountNo = null;
    this.benefAccountObj = null;
  }

  amountChange() { }

  narrationChange() { }

  additionalInfoChange() { }

  saveBeneficiary() {
    console.log(this.doSaveBeneficiary);
  }

  benefChange() {
    this.benefAccountObj = null;
    this.ben = false;
    if ((this.benefAccountNo && this.benefAccountNo.length === 10) && !this.bankObj) {
      this.alertSrvc.showErrorToast("Please select bank");
    } else if ((this.benefAccountNo && this.benefAccountNo.length === 10) && this.bankObj) {
      console.log(this.benefAccountNo);
      this.nameEquiry();
    }
  }

  nameEquiry() {
    this.busy = this.handlers.busy();
    const data = {
      userId: this.sharedData.userProfile.phoneNumber,
      channel: "trupay",
      bankCode: this.bankObj.role.numericCode,
      accountNumber: this.benefAccountNo
    }

    console.log(data);

    this.billsPaymentsService.Nameinquiry(data)
    .subscribe(
      (res: any) => {
        this.busy = !this.handlers.busy();

        if(res && res.code === '00' && res.data) {
          this.benefAccountObj = res.data;
          console.log(this.benefAccountObj)
        } else if (res && res.code !== '00') {
          this.alertSrvc.showErrorToast(res.message);
          this.benefAccountNo = null;
        } else {
          this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
          this.benefAccountNo = null;
        }

        console.log(res);
      },
      err => {
        console.log(err);
        this.benefAccountNo = null;
        this.busy = !this.handlers.busy();
        this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
      }
    )
  }

  proceed(route) {
    if (parseFloat(this.amount) < 1) {
      this.alertSrvc.showErrorToast('Invalid Amount');
      return
    } else {

      this.sharedData.tranType = 'inter';
      this.sharedData.paymentObj = {
        userId: this.sharedData.userProfile.phoneNumber,
        tranID: this.paymentlogicService.generatetranID(),
        channel: "trupay",
        senderName: this.accountToDebitObj.role.accT_NAME,
        sourceAccount: this.accountToDebitObj.role.foracid,
        destinationAccount: this.beneficiary.beneficiaryAccountNo || this.benefAccountNo,
        destinationBankName: this.beneficiary.benBankName || this.bankObj.role.name,
        destinationBankCode: this.beneficiary.benBankCode || this.bankObj.role.numericCode,
        transferAmount: parseFloat(this.amount),
        narration: this.narration,
        transactionPin: null,
        beneficiaryName: this.beneficiary.beneficiaryName || this.benefAccountObj.accountName,
        tranRemarks: this.additionalInfo,
        transferType: "interbank",
        includeVAT: false,
        userToken: this.sharedData.TOKEN + '::' + this.sharedData.SESSIONID,
        saveBeneficiary: this.doSaveBeneficiary
      }
      console.log(this.sharedData.paymentObj);
      this.navCtrl.navigateForward(route);
    }
  }

  async showAccounts(mode) {
    if (!this.busy && !this.busy_) {
      let buttons = this.accounts;
      let account = await this.handlers.showActionSheet("Select the account to be debited", buttons);
      if (account.role !== 'backdrop' && mode === 'from') {
        this.atd = true;
        this.accountToDebitObj = account;
        this.accountToDebit = account.role['text'];
      }
    }
  }

  async showBanks() {
    if (!this.busy && !this.busy_) {
      let buttons = this.banks;
      let bank = await this.handlers.showActionSheet("Select a bank", buttons);
      if (bank.role !== 'backdrop') {
        this.ban = true;
        this.bankObj = bank;
        if(this.benefAccountNo && this.benefAccountNo.length === 10) {
          this.nameEquiry();
        }
      }
    }
  }

  openBeneficiaries(route) {
    if (!this.busy && !this.busy_) {
      this.sharedData.beneficiary = null;
      this.navCtrl.navigateForward(route);
    }
  }

  getUserAccounts(data) {
    this.busy_ = this.handlers.busy();
    if (data && data.phoneNo) {
      this.getAllUserAccountsSubscription = this.billsPaymentsService.GetAllUserAccounts(data.phoneNo).subscribe(
        res => {
          console.log(res);
          this.sharedData.userAccounts = res;
          this.accounts = this.sharedData.userAccounts;
          this.accounts = this.paymentlogicService.formatAccounts(this.accounts);
          this.accounts_ = this.accounts;
          this.busy_ = !this.handlers.busy();
          if (this.accounts && this.accounts.length < 1) {
            this.alertSrvc.showErrorToast('Accounts could not be fetched at this time, please try again later');
            this.navCtrl.back();
          }
        },
        err => {
          this.busy_ = !this.handlers.busy();
          this.alertSrvc.showErrorToast('Accounts could not be fetched at this time, please try again later');
          this.navCtrl.back();
        }
      );
    }
  }

}
