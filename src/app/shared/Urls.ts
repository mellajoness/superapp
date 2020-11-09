import { Injectable } from '@angular/core';

@Injectable()

export class Config {

    private host = '//dtptest.fidelitybank.ng';
    private scheme = 'https:';
    private port = "";
    
    // private billsBase = '/billpayment/api';
    private billsBase = '/LimitlessAPIGateway/api/BillPayment';
    // private walletBase = '/eWalletAPI/api';
    private walletBase = '/LimitlessAPIGateway/api/Wallet';
    

    BillsPaymentUrl() {
        const base = this.scheme + this.host + this.port + this.billsBase;
        console.log(base);
        return base;
    }

    WalletUrl() {
        const base = this.scheme + this.host + this.port + this.walletBase;
        console.log(base);
        return base;
    }

    TruProfileUrl() {
        // const base = "https://digital.fidelitybank.ng/truprofile/api";
        const base = "https://dtptest.fidelitybank.ng/LimitlessAPIGateway/api/TruProfile";
        console.log(base);
        return base;
    }

    TruPayUrl() {
        // const base = "https://dtptest.fidelitybank.ng/TruPay/api";
        const base = "https://dtptest.fidelitybank.ng/LimitlessAPIGateway/api/TrupayExtension";
        console.log(base);
        return base;
    }

}