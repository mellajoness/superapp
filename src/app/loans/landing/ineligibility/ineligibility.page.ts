import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ineligibility',
  templateUrl: './ineligibility.page.html',
  styleUrls: ['./ineligibility.page.scss'],
})
export class IneligibilityPage implements OnInit {

  constructor(
    private router: Router,
  ) {
    
   }

  ngOnInit() {
  }

  landing(){
    this.router.navigate(['loans']);
  }

}
