import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss', '../../../theme/payments.scss'],
})
export class OnboardingComponent implements OnInit {

  @ViewChild('slide',  {static: false}) slides: IonSlides;

  contents;

  constructor(
    private modalCtrl: ModalController,
    private storageService: StorageService
  ) {
    this.loadContent();
  }

  ngOnInit() {
  }


  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
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
        message: 'Enjoy that awesome lifestyle, we make',
      },
      {
        image: 'assets/icon/layer-4.svg',
        message: 'Expand your limits',
      }
    ]
  }

  next(i) {
    if(i < 3) {
      this.slides.slideNext();
    } else {
      this.dismiss()
    }
  }

}
