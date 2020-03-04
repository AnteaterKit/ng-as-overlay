import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { AppComponent } from './app.component';
import { TooltipLibModule, FoOverlayService, TooltipLibComponent } from 'projects/tooltip-lib/src/public-api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TooltipLibModule,
    OverlayModule,
    BrowserAnimationsModule,
    MatGridListModule
  ],
  providers: [FoOverlayService],
  bootstrap: [AppComponent],
  entryComponents: [TooltipLibComponent]
})
export class AppModule { }
