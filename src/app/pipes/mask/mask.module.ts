import { NgModule } from '@angular/core';
import { MaskPipe } from './mask.pipe';

@NgModule({
  exports: [MaskPipe],
  declarations: [MaskPipe],
})
export class MaskModule { }
