import { NgModule } from '@angular/core';
import { TooltipLibComponent } from './tooltip-lib.component';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';



@NgModule({
  declarations: [TooltipLibComponent],
  imports: [
    CommonModule,

    OverlayModule
  ],
  exports: [TooltipLibComponent]
})
export class TooltipLibModule { }
