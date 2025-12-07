import { ViewChild, TemplateRef, ViewContainerRef, AfterViewInit, Directive } from '@angular/core';
import { BasePage } from '@pages/base-page';

@Directive()
export class BaseNoWrappingPage extends BasePage implements AfterViewInit {
    @ViewChild('content', { read: TemplateRef }) contentTemplate!: TemplateRef<any>;
    constructor(protected viewContainerRef: ViewContainerRef) { super() }
    ngAfterViewInit(): void {
        this.viewContainerRef.createEmbeddedView(this.contentTemplate);
    }
}