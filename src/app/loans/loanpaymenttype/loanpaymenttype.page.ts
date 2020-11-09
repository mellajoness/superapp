import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { NavigationExtras, ActivatedRoute , Router} from '@angular/router';
@Component({
  selector: 'app-loanpaymenttype',
  templateUrl: './loanpaymenttype.page.html',
  styleUrls: ['./loanpaymenttype.page.scss'],
})
export class LoanpaymenttypePage implements OnInit {
  loanData: any;
  constructor(
    public menu: MenuController,
    private router: Router,
    private activatedRoute:ActivatedRoute,
    private navCtrl: NavController
  ) { 

    activatedRoute.paramMap.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.loanData = this.router.getCurrentNavigation().extras.state.selectedLoan;

        console.log('data from payloanpage', this.loanData);
      }
    }
    );
  }

  ngOnInit() {
  }

  goBack() {
    this.menu.enable(true);
    this.navCtrl.navigateBack(['loans/payloan']);
  }

  
  paywithfidelity(){
   
    let loanType: NavigationExtras = {
      state: {
        selectedLoan: this.loanData
      }
    };
    if (this.loanData.loanType === 'Migo') {
    this.router.navigate(['loans'], loanType);
  }
    else {
    this.router.navigate(['loans/loanpaymentwithfidelity'],loanType);
   }
  
  }
  }


