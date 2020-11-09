import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private currentAccountsSubject: BehaviorSubject<any[]> =  new BehaviorSubject<any>([]);
  public currentAccountsData: Observable<any>;

  constructor() {
    this.currentAccountsData = this.currentAccountsSubject.asObservable();
  }

  updateAccounts(value) {
    this.currentAccountsSubject.next(value);
  }
}
