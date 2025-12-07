import { ViewChild, TemplateRef, ViewContainerRef, AfterViewInit, Directive, inject } from '@angular/core';
import { Constructor, Base } from "@utilities/components/mixin-base";

export function NoRootWrappingMixin<TBase extends Constructor>(Base: TBase, contentName: string) {
    @Directive()
    class NoRootWrapping extends Base implements AfterViewInit {
        @ViewChild(contentName, { read: TemplateRef }) contentTemplate!: TemplateRef<any>;
        protected viewContainerRef = inject(ViewContainerRef);
        ngAfterViewInit(): void {
            this.viewContainerRef.createEmbeddedView(this.contentTemplate);
        }
    } 
    return NoRootWrapping;
}