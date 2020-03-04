import { OverlayRef } from '@angular/cdk/overlay';

export class TooltipLibRef {

  constructor(private overlayRef: OverlayRef) { }

  close(): void {
    this.overlayRef.dispose();
  }
}
