import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoansPageRoutingModule } from './loans-routing.module';
import { CreditCheckComponent } from '../../../src/app/loans/modals/credit-check/credit-check.component';
import { SucessmodalComponent } from '../../../src/app/loans/modals/sucessmodal/sucessmodal.component';
import { ExtenloansuccessmodalComponent } from '../../../src/app/loans/modals/extenloansuccessmodal/extenloansuccessmodal.component';
import { PayloansuccessmodalComponent } from '../../../src/app/loans/modals/payloansuccessmodal/payloansuccessmodal.component';
import { PayloanfailuremodalComponent } from 'src/app/loans/modals/payloanfailuremodal/payloanfailuremodal.component';
import {CreditcheckfailuremodalComponent} from '../../../src/app/loans/modals/creditcheckfailuremodal/creditcheckfailuremodal.component'
import { LoansPage } from './loans.page';
import { from } from 'rxjs';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoansPageRoutingModule
  ],
  declarations: [LoansPage,CreditCheckComponent,SucessmodalComponent,ExtenloansuccessmodalComponent,PayloansuccessmodalComponent,PayloanfailuremodalComponent,CreditcheckfailuremodalComponent],
  entryComponents: [CreditCheckComponent,SucessmodalComponent,ExtenloansuccessmodalComponent,PayloansuccessmodalComponent,PayloanfailuremodalComponent,CreditcheckfailuremodalComponent]
})
export class LoansPageModule {}
