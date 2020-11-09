import { Component, OnInit, Input } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sucessmodal',
  templateUrl: './sucessmodal.component.html',
  styleUrls: ['./sucessmodal.component.scss'],
})
export class SucessmodalComponent implements OnInit {
  @Input() navparams: any;
  params: any;
  message: any;
  isSuccess: any;
  total_Eligible_Amount: any;
  constructor(
    private navParams: NavParams, 
    private modalCtrl: ModalController,
    private router: Router,
  ) {
    this.params = navParams.get('data');

   }

  ngOnInit() {
    console.log('my params',this.params);
   
  }
  
  gotoDashboard(){
    this.modalCtrl.dismiss();
    this.router.navigate(['loans']);
  }

}
