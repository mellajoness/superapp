import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonSlides } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {

  plan;

  @ViewChild('slide',  {static: false}) slides: IonSlides;
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    allowTouchMove: false
  };

  slideOneForm = new FormGroup({
    amount: new FormControl('', [Validators.required,  Validators.min(9000)]),
  });

  constructor(
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {

      if ( this.router.getCurrentNavigation().extras.state) {
        this.plan =  this.router.getCurrentNavigation().extras.state.pageExtras;
      }
      console.log('params: ', this.plan);
    });
  }

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

  slideToNext() {
    this.slides.slideNext();
  }

  submitAction() {

  }


}
