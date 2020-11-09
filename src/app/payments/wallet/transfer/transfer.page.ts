import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { SharedData } from 'src/app/shared/shared.components';
import { AlertService } from 'src/app/services/utilities/alert.service';
import { Handlers } from 'src/app/shared/handlers';
import { WalletService } from 'src/app/services/payments/wallet/wallet.service';
import { WalletlogicService } from 'src/app/services/payments/walletlogic/walletlogic.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.page.html',
  styleUrls: ['./transfer.page.scss', '../../../../theme/payments.scss'],
})
export class TransferPage implements OnInit {

  pageReady;
  walletId;
  accountNo;
  selectedBank;
  amount;
  narration;
  busy;
  accountDetails;
  institutions;
  selectedBankObj;
  getAllBanksAndBankCodesSubscription;
  beneficiaries;
  beneficiary;
  bank;
  ben;
  ban;
  nameEnquiryForInterbankTransfer;
  doSaveBeneficiary;
  newBeneficiaryChange;

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private alertSrvc: AlertService,
    public sharedData: SharedData,
    public handlers: Handlers,
    private walletService: WalletService,
    private walletlogicService: WalletlogicService,
  ) { 
    if(this.sharedData.wallet.pageView === 'transfer-bank') {
      this.getAllBanksAndBankCodes();
    } else {
      this.busy = this.handlers.busy();
      this.getBeneficiaries();
    }
  }

  ngOnInit() {}

  goBack() {
    this.navCtrl.back();
  }

  ionViewWillLeave() {
    this.getAllBanksAndBankCodesSubscription && this.getAllBanksAndBankCodesSubscription.unsubscribe();
    this.nameEnquiryForInterbankTransfer && this.nameEnquiryForInterbankTransfer.unsubscribe();
  }

  ionViewWillEnter() {
    console.log(this.sharedData.walletBeneficiary)
    if (this.sharedData.walletBeneficiary) {
      this.ben = true;
      this.beneficiary = this.sharedData.walletBeneficiary;
      console.log(this.beneficiary);
    } else {
      this.sharedData.walletBeneficiary = null;
      this.beneficiary = this.sharedData.wallet.pageView === 'transfer-bank' ? "Select a beneficiary" : "Select Wallet ID";
      this.ben = false;
      console.log("HEY")
    }
    
    console.log(this.sharedData.walletBank)
    if (this.sharedData.walletBank) {
      this.ban = true;
      this.bank = this.sharedData.walletBank;
      console.log(this.bank);
      this.bankSelected(this.bank.name)
    } else {
      this.sharedData.walletBank = null;
      this.bank = "Select Bank";
      this.ban = false;
      console.log("HEY")
    }
  }

  go(route) {
    this.navCtrl.navigateForward(route);
  }
  getBeneficiaries() {
    const data = { wallet_id: this.sharedData.userProfile.walletAcctNumber };
    this.walletService.GetBeneficiaries(data)
    .subscribe(
      (res: any) => {
        this.busy = !this.handlers.busy();
        console.log(res)
        if(res && res.responseCode && res.data.length > 0) {
          this.beneficiaries = res.data;
          console.log(this.beneficiaries)
          if(this.sharedData.wallet.pageView === 'transfer-wallet') {
            this.beneficiaries = this.walletlogicService.walletBeneficiaries(this.beneficiaries);
            console.log(this.beneficiaries);
            this.sharedData.walletBeneficiaries = this.beneficiaries;
          } else {
            this.beneficiaries = this.walletlogicService.bankAccountBeneficiaries(this.beneficiaries);
            console.log(this.beneficiaries);
            this.sharedData.walletBeneficiaries = this.beneficiaries;
          }
        }
      },
      err => {
        this.busy = !this.handlers.busy();
        console.log(err)
      }
    )
  }

  walletIdChange() {
    this.accountDetails = null;
    if (this.walletId.length === 11) {
      console.log(this.accountNo);
      const data = { wallet_id: this.walletId }
      this.busy = this.handlers.busy();
      this.walletService.Checkbalance(data)
      .subscribe(
        (res: any) => {
          this.busy = !this.handlers.busy();
          if (res.responseCode === '00' && res.data) {
            this.accountDetails = res.data;
          } else if (res.code !== '00') {
            this.alertSrvc.showErrorToast(res.responseMessage);
            this.walletId = "";
          } else {
            this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
            this.walletId = "";
          }
          console.log(res)
        },
        err => {
          this.walletId = "";
          this.busy = !this.handlers.busy();
          this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
          console.log(err);
        }
      )
    }
  }

  amountChange() { }

  accountNoChange() {
    this.accountDetails = null;
    if((this.accountNo && this.accountNo.length === 10) && !this.selectedBank) {
      this.alertSrvc.showErrorToast("Please select bank");
    } else if ((this.accountNo && this.accountNo.length === 10) && this.selectedBank) {
      console.log(this.accountNo);
      if(this.selectedBankObj.numericCode === '000007' || this.selectedBankObj.numericCode === '070') {
        this.getIntraBankAccountDetails();
      } else if (this.selectedBankObj.numericCode !== '000007' && this.selectedBankObj.numericCode !== '070') {
        this.getInterBankAccountDetails();
      }
    }
  }

  bankSelected(name) {
    this.selectedBank = name;
    console.log(this.selectedBank);
    let x = this.walletlogicService.getInstitutionObj(this.institutions, this.selectedBank);
    this.selectedBankObj = x;
    console.log(x);

    if((this.accountNo && this.accountNo.length === 10) && (this.selectedBankObj.numericCode === '000007' || this.selectedBankObj.numericCode === '070')) {
      this.getIntraBankAccountDetails();
    } else if ((this.accountNo && this.accountNo.length === 10) && (this.selectedBankObj.numericCode !== '000007' && this.selectedBankObj.numericCode !== '070')) {
      this.getInterBankAccountDetails();
    }
  }

  narrationChange() { }

  proceed(route) {
    if (this.sharedData.wallet.pageView === 'transfer-wallet') {
      if (parseFloat(this.amount) < 1) {
        this.alertSrvc.showErrorToast('Invalid Amount');
        return
      } else {
        this.sharedData.paymentObj = {
          sender_wallet_id: this.sharedData.userProfile.walletAcctNumber,
          receiver_wallet_id: this.accountDetails ? this.walletId : this.beneficiary.beneficiary_account_number,
          channel_source: 'Wallet',
          DestinationAccountName: this.accountDetails ? this.accountDetails.full_name : this.beneficiary.beneficiary_name,
          currency: 'NGN',
          tran_amount: this.amount,
          tran_particular: this.narration,
          tran_pin: null
        }
        this.sharedData.paymentInfo = {
          amount: this.amount,
          accountNo: this.accountDetails ? this.walletId : this.beneficiary.beneficiary_account_number,
          name: this.accountDetails ? this.accountDetails.full_name : this.beneficiary.beneficiary_name
        }
        this.navCtrl.navigateForward(route);
        if(this.doSaveBeneficiary) {
          const data = {
            wallet_id: this.sharedData.userProfile.walletAcctNumber,
            beneficiary_name: this.accountDetails.full_name,
            beneficiary_account_number: this.walletId,
            bank_code: "FIDWALLET",
            bank_name: "LIMITLESS"
          }
          this._saveBeneficiary(data);
        }
      }
    } else if (this.sharedData.wallet.pageView === 'transfer-bank') {
      if(this.accountNo && this.accountNo.length < 10) {
        this.alertSrvc.showErrorToast('Invalid Account Number')
        return;
      } else if (parseFloat(this.amount) < 1) {
        this.alertSrvc.showErrorToast('Invalid Amount');
        return
      } else if ((this.beneficiary && this.beneficiary.bank_name === 'Fidelity Bank') || (this.selectedBankObj && (this.selectedBankObj.numericCode === '000007' || this.selectedBankObj.numericCode === '070'))) {
        this.sharedData.paymentObj = {
          phoneNumber: this.sharedData.userProfile.walletAcctNumber,
          amount: this.amount,
          fidelityAccountNumber: this.accountDetails ? this.accountNo : this.beneficiary.beneficiary_account_number.trim(),
          DestinationAccountName: this.accountDetails ? this.accountDetails[0].accountName : this.beneficiary.beneficiary_name,
          narration: this.narration,
          channelSource: 'Wallet',
          transactionPin: null
        }
        this.sharedData.paymentInfo = {
          amount: this.amount,
          accountNo: this.accountDetails ? this.accountNo : this.beneficiary.beneficiary_account_number.trim(),
          name: this.accountDetails ? this.accountDetails[0].accountName : this.beneficiary.beneficiary_name,
          bank: this.beneficiary && this.beneficiary.bank_name ? this.beneficiary.bank_name : this.selectedBankObj.name
        }
        this.navCtrl.navigateForward(route);
        if(this.doSaveBeneficiary) {
          const data = {
            wallet_id: this.sharedData.userProfile.walletAcctNumber,
            beneficiary_name: this.accountDetails[0].accountName,
            beneficiary_account_number: this.accountNo,
            bank_code: this.selectedBankObj.numericCode,
            bank_name: this.selectedBankObj.name
          }
          this._saveBeneficiary(data);
        }
      } else if ((this.beneficiary && this.beneficiary.bank_name !== 'Fidelity Bank') || (this.selectedBankObj && (this.selectedBankObj.numericCode !== '000007' && this.selectedBankObj.numericCode !== '070'))) {
        this.sharedData.paymentObj = {
          transactionPin: null,
          destinationAccountNumber: this.accountDetails ? this.accountNo : this.beneficiary.beneficiary_account_number.trim(),
          destinationBankCode: this.accountDetails ? this.selectedBankObj.numericCode : this.beneficiary.bank_code,
          destinationAccountName: this.accountDetails ? this.accountDetails : this.beneficiary.beneficiary_name,
          phoneNumber: this.sharedData.userProfile.walletAcctNumber,
          amount: this.amount,
          fidelityAccountNumber: "0000000000",
          narration: this.narration,
          channelSource: "Wallet"
        }
        console.log(this.sharedData.paymentObj)
        this.sharedData.paymentInfo = {
          amount: this.amount,
          accountNo: this.accountDetails ? this.accountNo : this.beneficiary.beneficiary_account_number.trim(),
          name: this.accountDetails ? this.accountDetails : this.beneficiary.beneficiary_name,
          numericCode: this.accountDetails ? this.selectedBankObj.numericCode : this.beneficiary.bank_code,
          bank: this.accountDetails ? this.selectedBankObj.name : this.beneficiary.bank_name
        }
        this.navCtrl.navigateForward(route);
        if(this.doSaveBeneficiary) {
          const data = {
            wallet_id: this.sharedData.userProfile.walletAcctNumber,
            beneficiary_name: this.accountDetails,
            beneficiary_account_number: this.accountNo,
            bank_code: this.selectedBankObj.numericCode,
            bank_name: this.selectedBankObj.name
          }
          this._saveBeneficiary(data);
        }
      }
    }
  }

  getIntraBankAccountDetails() {
    const data = {
      accountNumber: this.accountNo
    }
    this.busy = this.handlers.busy();
    this.walletService.GetAccountDetails(data)
      .subscribe(
        (res: any) => {
          this.busy = !this.handlers.busy();
          if (res.responseCode === '00' && res.data && res.data.length > 0) {
            this.accountDetails = res.data;
          } else if (res.responseCode !== '00') {
            this.alertSrvc.showErrorToast(res.responseMessage);
            this.accountNo = "";
          } else {
            this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
            this.accountNo = "";
          }
          console.log(res)
        },
        err => {
          this.accountNo = "";
          this.busy = !this.handlers.busy();
          this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
          console.log(err);
        }
      )
  }

  getInterBankAccountDetails() {
    const data = {
      accountNumber: this.accountNo,
      bankCode: this.selectedBankObj.numericCode
    }
    this.busy = this.handlers.busy();
    this.nameEnquiryForInterbankTransfer = this.walletService.NameEnquiryForInterbankTransfer(data)
      .subscribe(
        (res: any) => {
          this.busy = !this.handlers.busy();
          if (res.responseCode === '00' && res.data) {
            this.accountDetails = res.data;
          } else if (res.code !== '00') {
            this.alertSrvc.showErrorToast(res.responseMessage);
            this.accountNo = "";
          } else {
            this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
            this.accountNo = "";
          }
          console.log(res)
        },
        err => {
          this.accountNo = "";
          this.busy = !this.handlers.busy();
          this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
          console.log(err);
        }
      )
  }

  
  getAllBanksAndBankCodes() {
    this.busy = this.handlers.busy();
    this.getAllBanksAndBankCodesSubscription = this.walletService.GetAllBanksAndBankCodes()
    .subscribe(
      (res: any) => {
        if(res && res.responseCode === '00' && res.data && res.data.institutions) {
          this.institutions = res.data.institutions;
          this.sharedData.walletBanks = this.institutions;
          console.log(this.institutions)
          this.getBeneficiaries();
        } else if (res && res.responseCode !== '00') {
          this.alertSrvc.showErrorToast(res.message || res.responseMessage);
          this.goBack();
          this.busy = !this.handlers.busy();
        } else {
          this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
          this.goBack();
          this.busy = !this.handlers.busy();
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

  showBeneficiaries(route) {
    if (!this.busy) {
      // this.sharedData.walletBeneficiary = null;
      this.navCtrl.navigateForward(route);
    }
  }

  showBanks(route) {
    if (!this.busy) {
      // this.sharedData.walletBank = null;
      this.navCtrl.navigateForward(route);
    }
  }

  saveBeneficiary() {
    console.log(this.doSaveBeneficiary)
  }

  newBeneficiary() {
    console.log(this.newBeneficiaryChange);
    this.sharedData.walletBeneficiary = null;
    this.sharedData.walletBank = null;
    this.beneficiary = this.sharedData.wallet.pageView === 'transfer-bank' ? "Select a beneficiary" : "Select Wallet ID";
    this.bank = "Select Bank";
    this.accountDetails = null;
    this.walletId = null;
    this.accountNo = null;
    this.ben = null;
    if(!this.newBeneficiaryChange) {
      this.doSaveBeneficiary = null;
    }
  }

  _saveBeneficiary(data) {
    if(this.doSaveBeneficiary) {
      this.walletService.SaveBeneficiary(data)
      .subscribe(
        (res: any) => {
          console.log(res)
        },
        err => {
          console.log(err)
        }
      )
    }
  }

}
