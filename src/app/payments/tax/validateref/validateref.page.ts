import { Router } from '@angular/router';
import { Handlers } from './../../../shared/handlers';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-validateref',
  templateUrl: './validateref.page.html',
  styleUrls: ['./validateref.page.scss'],
})
export class ValidaterefPage implements OnInit {

  constructor(
    protected handlers: Handlers,
    private router: Router
  ) { }

  ngOnInit() {
  }

  verify() {
    console.log("Verify");
    this.router.navigate(['payments/tax/payment-form']);
  }

}
