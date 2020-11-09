import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentslogicService {

  constructor() { }

  formatAccounts(accounts) {
    let acc = [];
    accounts.map((x) => {
      let data = {};
      let type = x.schM_TYPE === "CAA" ? "Current" : "Savings"
      let text = type + " - " + x.foracid + " " + "₦" + x.balance;
      data['text'] = text;
      x['text'] = text;
      data['role'] = x;
      acc.push(data);
    })
    return acc;
  }

  filterDestinationAccount(allAccounts, selectedAccountObject) {
    let accounts = (allAccounts.role.foracid != selectedAccountObject.role.foracid);
    return accounts;
  }

  formatBanks(banks) {
    let bnk = [];
    let bn = this.getFidelityAsIntitutionInter(banks);
    console.log(bn)
    bn.map((x) => {
      let data = {};
      let text = x.name;
      data['text'] = text;
      data['role'] = x;
      bnk.push(data);
    })
    return bnk;
  }

  generatetranID() {
    let x = Math.floor(100000000000 + Math.random() * 900000000000);
    let u;
    u = x;
    return u;
  }

  getFidelityAsIntitution(institutions) {
    let x;
    institutions.map(i => {
      if(i.numericCode === '000007' || i.numericCode === '999070') {
        x = i;
      }
    })
    return x;
  }

  getFidelityAsIntitutionInter(institutions) {
    console.log(institutions)
    let x = [];
    institutions.map(i => {
      if(i.numericCode !== '000007' && i.numericCode !== '999070') {
        x.push(i);
      }
    })
    return x;
  }

  filterAccount(allAccounts, beneficiaries) {
    let acc = [];
    allAccounts.map(x => {
      if(x.role.foracid !== beneficiaries.beneficiaryAccountNo) {
        acc.push(x);
      }
    })
    return acc;
  }

}
