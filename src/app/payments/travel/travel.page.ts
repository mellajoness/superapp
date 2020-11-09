import { NavController } from '@ionic/angular';
import { Handlers } from './../../shared/handlers';
import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/utilities/alert.service';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.page.html',
  styleUrls: ['./travel.page.scss', '../../../theme/payments.scss'],
})
export class TravelPage implements OnInit {

  slideOptions = {
    // initialSlide: 0,
    slidesPerView: 3,
    allowSlidePrev: false,
    allowSlideNext: false,
  };

  slideOptions2 = {
    // initialSlide: 0,
    slidesPerView: 3,
  };

  constructor(
    public handlers: Handlers,
    private alertService: AlertService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    // this.testNotes();
  }

  back() {
    this.navCtrl.back()
  }

}
