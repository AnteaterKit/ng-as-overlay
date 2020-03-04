import { Component, ElementRef, ViewChild } from '@angular/core';
import { FoOverlayService } from 'projects/tooltip-lib/src/public-api';
import { OriginConnectionPosition, OverlayConnectionPosition } from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'ng-as-overlay';
  @ViewChild('custom' ) custom: ElementRef;
  @ViewChild('origin' ) origin: ElementRef;
  @ViewChild('origin2' ) origin2: ElementRef;
  constructor(private foOverlayService: FoOverlayService) {

  }


  showTooltip() {

    let originConnectionPosition: OriginConnectionPosition;
    originConnectionPosition = { originX: 'center', originY: 'center' };

    let overlayConnectionPosition: OverlayConnectionPosition;
    overlayConnectionPosition = { overlayX: 'center', overlayY: 'center' };

    this.foOverlayService.open({ data:
      {
        name: '',
        element: this.origin,
        elementView: this.custom,
        originConnectionPosition, overlayConnectionPosition
      }});
  }

  showTooltipLeftbutton() {
    let originConnectionPosition: OriginConnectionPosition;
    originConnectionPosition = { originX: 'start', originY: 'bottom' };

    let overlayConnectionPosition: OverlayConnectionPosition;
    overlayConnectionPosition = { overlayX: 'start', overlayY: 'bottom' };

    this.foOverlayService.open({ data:
      {
        name: '',
        element: this.origin2,
        elementView: this.custom,
        originConnectionPosition, overlayConnectionPosition
      }});
  }
}

