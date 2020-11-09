import { Component, OnInit, Input } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payloansuccessmodal',
  templateUrl: './payloansuccessmodal.component.html',
  styleUrls: ['./payloansuccessmodal.component.scss'],
})
export class PayloansuccessmodalComponent implements OnInit {
  @Input() navparams: any;
  params: any;
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
