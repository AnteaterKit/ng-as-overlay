import { Component, Input, Inject } from '@angular/core';
import { tooltipLibAnimations } from './tooltip-lib.animations';
import { TOOLTIP_LIB_DATA } from './tooltip-lib.tokens';
import { TooltipLibRef } from './tooltip-lib-ref';

@Component({
  selector: 'as-tooltip-lib',
  template: `
    <div class="overlay-content">
      <div *ngIf='view'>
        <ng-container *ngTemplateOutlet='view'>
        </ng-container >
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    h1 {
      margin: 0;
      padding: 1em;
    }

    img {
      width: 100%;
      max-width: 500px;
      height: auto;
    }

    .overlay-content {
      width: auto;
      height: auto;
      background-color: white;
      border-radius: 4px;
    }
  `],
  animations: [tooltipLibAnimations.tooltipState]
})
export class TooltipLibComponent {
  view: any;
  constructor(
    public dialogRef: TooltipLibRef,
    @Inject(TOOLTIP_LIB_DATA) public data: any) {
      this.view = data.elementView;
    }
}

