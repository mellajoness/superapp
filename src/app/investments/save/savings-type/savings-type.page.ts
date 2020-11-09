import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-savings-type',
  templateUrl: './savings-type.page.html',
  styleUrls: ['./savings-type.page.scss'],
})
export class SavingsTypePage implements OnInit {
  homePage = {
    name: 'home',
    description: 'predefined: savings for a home'
  };

  educationPage = {
    name: 'education',
    description: 'predefined: savings for an education'
  };

  businessPage = {
    name: 'business',
    description: 'predefined: savings for a business'
  };

  rainydayPage = {
    name: 'rainy day',
    description: 'predefined: savings for emergencies'
  };

  vacationPage = {
    name: 'vacation',
    description: 'predefined: savings for a vacation'
  };

  weddingPage = {
    name: 'wedding',
    description: 'predefined: savings for a wedding'
  };


constructor(
  private router: Router,
) { }

ngOnInit() {
}

openPresetGoal(pageExtras) {
  const navigationExtras: NavigationExtras = {
    state: {
      pageExtras
    }
  };
  this.router.navigate(['/', 'investments', 'save', 'preset-goal'], navigationExtras);
}

}
