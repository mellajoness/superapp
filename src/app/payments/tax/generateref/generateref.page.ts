import { Router } from '@angular/router';
import { Handlers } from './../../../shared/handlers';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-generateref',
  templateUrl: './generateref.page.html',
  styleUrls: ['./generateref.page.scss'],
})
export class GeneraterefPage implements OnInit {

  constructor(
    protected handlers: Handlers,
    private router: Router
  ) { }

  ngOnInit() {
  }

  verify() {
    console.log("Verify");
    this.router.navigate(['payments/tax/payment-form'])
  }

}
