import { Component, viewChild, ElementRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'ui-modal',
    imports: [CommonModule],
    template: `
<div class="modal show fade" [ngStyle]="{display: isVisible ? 'block' : 'none'}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" [ngClass]="['modal-'+size]">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5">{{ title }}</h1>
                <button type="button" class="btn-close" (click)="onClose()" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <ng-content></ng-content>
            </div>
            <div class="modal-footer" #footer [ngClass]="{'d-none': !hasFooter}">
                <ng-content select="[ui-modal-footer]"></ng-content>
            </div>
        </div>
    </div>
</div>
`})
export class UIModal {
    @Input() title: string = '';
    @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
    isVisible: boolean = false;
    footer = viewChild<ElementRef<any>>('footer');

    get hasFooter(): boolean {
        return this.footer()?.nativeElement?.children?.length > 0;
    }

    onClose(): void {
        this.close();
    }

    open(): void {
        this.isVisible = true;
    }

    close(): void {
        this.isVisible = false;
    }
}
