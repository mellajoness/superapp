import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss', '../../../theme/payments.scss'],
})
export class OnboardingPage implements OnInit {

  @ViewChild('slide',  {static: false}) slides: IonSlides;

  contents;
  activeIndex;

  constructor(
    private modalCtrl: ModalController,
    private storageService: StorageService,
    private router: Router
  ) {
    this.loadContent();
  }

  ngOnInit() {
  }


  dismiss() {
    this.router.navigateByUrl('');
    this.storageService.store('onboarding', true);
  }

  loadContent() {
    this.contents = [
      {
        image: 'assets/icon/layer-1.svg',
        message: 'Your one-stop shop to managing your finances and growing your wealth',
      },
      {
        image: 'assets/icon/layer-2.svg',
        message: 'You need that credit, get it fast, get it in minutes',
      },
      {
        image: 'assets/icon/layer-3.svg',
        message: 'Enjoy that awesome lifestyle, we make payment easy, safe and secured',
      },
      {
        image: 'assets/icon/layer-4.svg',
        message: 'Expand your limits',
      }
    ]
  }

  next(i) {
    this.activeIndex = i;
    if(i < 3) {
      this.slides.slideNext();
    } else {
      this.dismiss()
    }
  }

}
