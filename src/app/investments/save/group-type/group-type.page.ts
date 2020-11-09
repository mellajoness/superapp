import { Component, OnInit } from '@angular/core';
import { SavingsService } from 'src/app/services/investment/savings.service';

@Component({
  selector: 'app-group-type',
  templateUrl: './group-type.page.html',
  styleUrls: ['./group-type.page.scss'],
})
export class GroupTypePage implements OnInit {

  constructor(
    private savingsSrvc: SavingsService

  ) { }

  ngOnInit() {

  }

  ionViewWillEnter(){
    this.savingsSrvc.getAllGroupSavingsType().subscribe(res => console.log(res));
  }

}
