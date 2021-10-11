import {
    Directive, Host, Input, NgZone, Optional,
    Renderer2, TemplateRef, ViewContainerRef
} from '@angular/core';
import { DataGridComponent } from '@components/data-grid-component/data-grid.component';

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[templateKey]',
})

export class KeyedTemplateDirective {
    private key: string;
    @Input() set templateKey(key: any) {
        this.parentGrid.registerTemplate(key, this);
    }

    get templateKey() {
        return this.key;
    }

    constructor(
        @Host() @Optional() public parentGrid: DataGridComponent,
        private vcRef: ViewContainerRef,
        private templateRef: TemplateRef<any>,
        private renderer: Renderer2,
        private zone: NgZone,
    ) {
    }

    public render(renderData: any) {
        const _that = this;
        let childView;
        if (this.zone.isStable) {
            childView = this.zone.run(function () {
                return this.renderTemplate(renderData);
            });
        } else {
            childView = this.renderTemplate(renderData);
            childView.detectChanges();
        }
        return childView.rootNodes;
    }

    private renderTemplate(renderData) {
        const _that = this;
        const childView = _that.vcRef.createEmbeddedView(this.templateRef, {
            $implicit: renderData.model,
        });
        const container = this.getElement(renderData.container);
        if (renderData.container) {
            let element;
            for (element of childView.rootNodes) {
                _that.renderer.appendChild(container.nativeElement, element);
            }
        }
        return childView;
    }

    private getElement(element) {
        return element.get ? element.get(0) : element;
    }

    get template(): TemplateRef<any> {
        return this.templateRef;
    }

}
