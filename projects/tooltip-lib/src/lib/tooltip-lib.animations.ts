import { AnimationTriggerMetadata, trigger, state, style, keyframes, animate, transition } from "@angular/animations";

export const tooltipLibAnimations: {
    readonly tooltipState: AnimationTriggerMetadata;
  } = {
    tooltipState: trigger('state', [
      state('initial, void, hidden', style({opacity: 0, transform: 'scale(0)'})),
      state('visible', style({transform: 'scale(1)'})),
      transition('* => visible', animate('200ms cubic-bezier(0, 0, 0.2, 1)', keyframes([
        style({opacity: 0, transform: 'scale(0)', offset: 0}),
        style({opacity: 0.4, transform: 'scale(0.99)', offset: 0.4}),
        style({opacity: 1, transform: 'scale(1)', offset: 1})
      ]))),
      transition('* => hidden', animate('120ms cubic-bezier(0, 0, 0.2, 1)', style({opacity: 0}))),
    ])
  };
