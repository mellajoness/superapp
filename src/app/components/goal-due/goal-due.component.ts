import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-goal-due',
  templateUrl: './goal-due.component.html',
  styleUrls: ['./goal-due.component.scss'],
})
export class GoalDueComponent implements OnInit {

  constructor(
    public modalCtrlr: ModalController,
  ) { }

  ngOnInit() {}

  dismiss() {
    this.modalCtrlr.dismiss();
  }

}
