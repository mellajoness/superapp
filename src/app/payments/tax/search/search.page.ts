import { Handlers } from './../../../shared/handlers';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss', '../../../../theme/payments.scss'],
})
export class SearchPage implements OnInit {

  constructor(
    protected handlers: Handlers
  ) { }

  ngOnInit() {
  }

}
