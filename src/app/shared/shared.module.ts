import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PaymentSourceLoaderComponent } from '../components/payment-source-loader/payment-source-loader.component';
import { AccordionComponent } from '../components/accordion/accordion.component';

@NgModule({
    imports:      [ CommonModule, IonicModule ],
    declarations: [ PaymentSourceLoaderComponent, AccordionComponent],
    exports:      [ PaymentSourceLoaderComponent, AccordionComponent]
})
export class SharedModule { }
