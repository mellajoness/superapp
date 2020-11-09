import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-view-si',
  templateUrl: './view-si.component.html',
  styleUrls: ['./view-si.component.scss', '../../../theme/payments.scss'],
})
export class ViewSiComponent implements OnInit {

  @ViewChild('slide',  {static: false}) slides: IonSlides;

  contents;

  constructor(
    private modalCtrl: ModalController,
    private storageService: StorageService
  ) { }

  ngOnInit() {
  }


  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

}
