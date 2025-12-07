import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, ContentChild, contentChildren, ContentChildren, QueryList, AfterContentInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'uc-modal',
  imports: [CommonModule],
  template: `
<div class="modal fade show" tabindex="-1" [ngStyle]="{display: show ? 'block' : 'none', background: show ? 'rgba(0,0,0,0.5)' : ''}" *ngIf="show">
  <div class="modal-dialog" [ngClass]="getModalClasses()" [ngStyle]="getModalStyles()">
    <div class="modal-content" [ngStyle]="getContentStyles()">
      <div class="modal-header" #header>
        <h5 class="modal-title">{{ title }}</h5>
        <button type="button" class="btn-close" aria-label="Close" (click)="onClose()"></button>
      </div>
      <div class="modal-body" [ngStyle]="getBodyStyles()">
        <ng-content></ng-content>
      </div>
      <div class="modal-footer" #contentFooter>
        <ng-content select="[modal-footer]" ></ng-content>
      </div>
    </div>
  </div>
</div>
`})
export class ModalComponent implements AfterContentInit, AfterViewInit {
  @ViewChild('contentFooter') contentFooter!: ElementRef;


  @Input() show: boolean = false;
  @Input() title: string = '';
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' | 'fullscreen' | 'fullscreen-sm-down' = 'md';
  @Input() hasFooter: boolean = false;

  @Output() closed = new EventEmitter<void>();

  hasProjectedContent: boolean = false;
  

  ngAfterContentInit() {
    console.log('content init', this.contentFooter);
  }

  ngAfterViewInit(): void {
    console.log('content init', this.contentFooter);
  }

  getModalClasses(): string {
    const sizeClass = this.getModalSizeClass();
    const centerClass = this.isFullscreen() ? '' : 'modal-dialog-centered';
    return [sizeClass, centerClass].filter(cls => cls).join(' ');
  }

  getModalSizeClass(): string {
    switch (this.size) {
      case 'sm': return 'modal-sm';
      case 'lg': return 'modal-lg';
      case 'xl': return 'modal-xl';
      case 'fullscreen': return 'modal-fullscreen';
      case 'fullscreen-sm-down': return 'modal-fullscreen-sm-down';
      default: return '';
    }
  }

  isFullscreen(): boolean {
    return this.size === 'fullscreen' || this.size === 'fullscreen-sm-down';
  }

  getModalStyles(): any {
    if (this.isFullscreen()) {
      return {
        'max-width': '100%',
        'margin': '0',
        'width': '100vw',
        'height': '100vh'
      };
    }
    return {};
  }

  getContentStyles(): any {
    if (this.isFullscreen()) {
      return {
        'height': '100vh',
        'border-radius': '0',
        'border': 'none',
        'display': 'flex',
        'flex-direction': 'column'
      };
    }
    return {};
  }

  getBodyStyles(): any {
    if (this.isFullscreen()) {
      return {
        'flex': '1',
        'overflow-y': 'auto',
        'padding': '1rem'
      };
    }
    return {};
  }

  hideFooter() {
    console.log(this.contentFooter);
    return this.contentFooter && this.contentFooter.nativeElement.children.length>0;
  }

  onClose() {
    console.log(this.contentFooter);
    this.closed.emit();
  }
}