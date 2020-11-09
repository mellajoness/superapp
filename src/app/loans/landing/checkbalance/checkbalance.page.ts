import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { ScrollDetail } from '@ionic/core';
import { ProfileService } from 'src/app/services/user/profile.service';
import { LoanService } from 'src/app/services/loan/loan.service';
import { Router, NavigationExtras } from '@angular/router';
import { LoaderService } from 'src/app/services/utilities/loader.service';
import { AlertService } from 'src/app/services/utilities/alert.service';
@Component({
  selector: 'app-checkbalance',
  templateUrl: './checkbalance.page.html',
  styleUrls: ['./checkbalance.page.scss'],
})
export class CheckbalancePage implements OnInit {
  showToolbar = false;
  loanLabel = [];
  bar = [];
  total: any;
  phoneNumber: any;
  customerId: any;
  @ViewChild('barCanvas',{static: false}) barCanvas: ElementRef;
  private barChart: Chart;
  max = 100;
  graph = [];
  show = false;
  hide = false;
  showGraph = false;
  hideGraph = false;
 
  dashboardData: any;
  loanLists: any;
  totalEligibleAmount: number;
  constructor(
    private profileSrvc: ProfileService,
    private loanService: LoanService,
    private router: Router,
    private loaderSrvc: LoaderService,
    private alertSrvc: AlertService,
    private loanSrvc: LoanService,
  ) { }

  ngOnInit() {
    
    this.loanService.dashboardData.subscribe(data=>{
      if(data){
        this.dashboardData = data;
        this.customerId=this.dashboardData.eligibleData.customer_Id;
        this.total =this.dashboardData.totalLoanBal
        this.show = true;
        console.log(data);
        console.log('my customer id',this.customerId);
        console.log('my total',this.total);
      }
    });
    this.phoneNumber = this.profileSrvc.getUserPhone().replace(/^0+/, '234');;
    console.log('my  phone no',this.phoneNumber);
  
  }

  ionViewWillEnter(){
    this.getGraph(this.customerId,this.phoneNumber)
  }


  
  onScroll($event: CustomEvent<ScrollDetail>) {
    if ($event && $event.detail && $event.detail.scrollTop) {
      const scrollTop = $event.detail.scrollTop;
      this.showToolbar = scrollTop >= 10;
    }}

  async getGraph(customerId,phoneNumber) {
    const loader = await this.loaderSrvc.loadCtrl('');
    loader.present();
   
    this.loanSrvc.getGraph(customerId,phoneNumber).subscribe(resp => {
      loader.dismiss();
      this.graph = resp;
      if (this.graph.length > 0) {
        this.show = true;
        this.showGraph = true;
      } else if (this.graph.length < 1) {
        this.hide = true;
        this.hideGraph = true;
      }
      console.log('Graph Response', resp);
      resp.forEach(i => {
        console.log('INDEX', i);
        this.loanLabel.push(i.loanType);
        console.log('LOAN LABEL', this.loanLabel);
        this.bar.push(i.principal);
        console.log('BAR', this.bar);
      });
      this.barChart = new Chart(this.barCanvas.nativeElement, {
        type: 'bar',
        data: {
          labels: this.loanLabel,
          datasets: [
            {
              label: 'Loans',
              data: this.bar,
              backgroundColor: [
                '#0E237E',
                '#0E237E',
                '#0E237E',
                '#0E237E',
                '#0E237E',
                '#0E237E',
                
              ],
              borderColor: [
                '#0E237E',
                '#0E237E',
              ],
              borderWidth: 1,
            }
          ]
        },
        options: {
          scales: {
            xAxes: [{
              ticks: {
                 fontColor:'#9C9E9B',
              }
           }],
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  fontColor:'#9C9E9B',
                }
              }
            ]
          }
        }
      });

    this.show = true;
    },
    err=>{
      this.loaderSrvc.hideLoader();
      this.alertSrvc.showErrorToast('An unexpected error occured. Kindly retry in a moment');
    });
  }

    goBack() {
    this.router.navigate(['loans']);
  }

  payLoan() {
    this.router.navigate(['loans/payloan']);
  }

  loanBalance(val) {
    console.log('Data to Balance Page', val);
    let loanBalanceData: NavigationExtras = {
      state: {
        dashboardData: val
      }
    };
    this.router.navigate(['loans/loan-balance'],loanBalanceData);
  }

}
