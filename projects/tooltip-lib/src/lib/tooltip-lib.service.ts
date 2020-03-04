import { Injectable, Injector, ComponentRef, ElementRef } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef, ScrollDispatcher,
    OverlayConnectionPosition, HorizontalConnectionPos, OriginConnectionPosition } from '@angular/cdk/overlay';
import { PortalInjector, ComponentPortal } from '@angular/cdk/portal';
import { TooltipLibRef } from './tooltip-lib-ref';
import { TooltipLibComponent } from './tooltip-lib.component';
import { TOOLTIP_LIB_DATA } from './tooltip-lib.tokens';

export interface FoOverlayModel {
    name: string;
    // ориж
    element: ElementRef<HTMLElement>;
    // кастомное вью
    elementView: ElementRef<HTMLElement>;
    originConnectionPosition: OriginConnectionPosition;
    overlayConnectionPosition: OverlayConnectionPosition;
}


interface FilePreviewDialogConfig {
    panelClass?: string;
    hasBackdrop?: boolean;
    backdropClass?: string;
    data?: FoOverlayModel;
}

const DEFAULT_CONFIG: FilePreviewDialogConfig = {
    hasBackdrop: true,
    backdropClass: 'dark-backdrop',
    panelClass: 'fo-overview-panel',
    data: null
};

@Injectable({  providedIn: 'root' })
export class FoOverlayService {
    constructor(
        private injector: Injector,
        private overlay: Overlay,
        // tslint:disable-next-line:variable-name
        private _scrollDispatcher: ScrollDispatcher) { }

    open(config: FilePreviewDialogConfig = {}) {
        const dialogConfig = { ...DEFAULT_CONFIG, ...config };
        const overlayRef = this.createOverlay(dialogConfig);
        const dialogRef = new TooltipLibRef(overlayRef);

        const overlayComponent = this.attachDialogContainer(overlayRef, dialogConfig, dialogRef);

        overlayRef.backdropClick().subscribe(_ =>  {
            console.log('backdor');
            dialogRef.close();
        });

        return dialogRef;

    }

    private attachDialogContainer(overlayRef: OverlayRef, config: FilePreviewDialogConfig, dialogRef: TooltipLibRef) {
        const injector = this.createInjector(config, dialogRef);

        const containerPortal = new ComponentPortal(TooltipLibComponent, null, injector);
        const containerRef: ComponentRef<TooltipLibComponent> = overlayRef.attach(containerPortal);

        return containerRef.instance;
    }

    private createInjector(config: FilePreviewDialogConfig, dialogRef: TooltipLibRef): PortalInjector {
        const injectionTokens = new WeakMap();

        injectionTokens.set(TooltipLibRef, dialogRef);
        injectionTokens.set(TOOLTIP_LIB_DATA, config.data);

        return new PortalInjector(this.injector, injectionTokens);
    }

    private createOverlay(config: FilePreviewDialogConfig) {
        const overlayConfig = this.getOverlayConfig(config);
        return this.overlay.create(overlayConfig);
    }

    private getOverlayConfig(config: FilePreviewDialogConfig): OverlayConfig {

        const scrollableAncestors =
        this._scrollDispatcher.getAncestorScrollContainers(config.data.element);

        const strategy  = this.overlay.position()
            .connectedTo(config.data.element,
                config.data.originConnectionPosition,
                config.data.overlayConnectionPosition);
        console.log(config);
        const overlayConfig = new OverlayConfig({
            hasBackdrop: config.hasBackdrop,
            backdropClass: config.backdropClass,
            panelClass: config.panelClass,
            scrollStrategy: this.overlay.scrollStrategies.close(),
            positionStrategy: strategy
        });
        console.log(overlayConfig);
        return overlayConfig;
    }
}

