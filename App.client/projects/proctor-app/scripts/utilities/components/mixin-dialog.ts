import { Component, Injectable, Directive, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Constructor } from "@utilities/components/mixin-base";
import { ComponentType } from '@angular/cdk/portal';

@Component({
    selector: 'app-confirm-dialog',
    standalone: true,
    imports: [CommonModule],
    template: `
<div class="modal-overlay" *ngIf="show" (click)="onBackdropClick()">
  <div class="modal-content" (click)="$event.stopPropagation()">
    <div class="modal-header">
      <h5 class="modal-title">{{ data.title }}</h5>
      <button type="button" class="btn-close" (click)="onCancel()" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>{{ data.message }}</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary" (click)="onConfirm()">Confirm</button>
      <button type="button" class="btn btn-outline-secondary" (click)="onCancel()">Cancel</button>
    </div>
  </div>
</div>
`,
    styles: [`
      .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1050;
      }
      
      .modal-content {
        background: white;
        border-radius: 0.375rem;
        box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
        max-width: 500px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
      }
      
      .modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem 1.25rem;
        border-bottom: 1px solid #dee2e6;
        border-top-left-radius: calc(0.375rem - 1px);
        border-top-right-radius: calc(0.375rem - 1px);
      }
      
      .modal-title {
        margin: 0;
        font-size: 1.125rem;
        font-weight: 600;
        color: #495057;
      }
      
      .btn-close {
        background: none;
        border: none;
        font-size: 1.25rem;
        cursor: pointer;
        color: #6c757d;
        padding: 0;
        width: 1.5rem;
        height: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .modal-body {
        padding: 1.25rem;
      }
      
      .modal-footer {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 0.5rem;
        padding: 1rem 1.25rem;
        border-top: 1px solid #dee2e6;
        border-bottom-left-radius: calc(0.375rem - 1px);
        border-bottom-right-radius: calc(0.375rem - 1px);
      }
      
      .btn {
        padding: 0.375rem 0.75rem;
        border: 1px solid transparent;
        border-radius: 0.375rem;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        text-align: center;
        cursor: pointer;
        transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;
      }
      
      .btn-primary {
        color: #fff;
        background-color: #0d6efd;
        border-color: #0d6efd;
      }
      
      .btn-primary:hover {
        background-color: #0b5ed7;
        border-color: #0a58ca;
      }
      
      .btn-outline-secondary {
        color: #6c757d;
        background-color: transparent;
        border-color: #6c757d;
      }
      
      .btn-outline-secondary:hover {
        color: #fff;
        background-color: #6c757d;
        border-color: #6c757d;
      }
    `]
})
class ConfirmDialogComponent {
    show = false;
    data: any = {};
    closed = new EventEmitter<boolean>();

    onConfirm() {
        this.closed.emit(true);
        this.show = false;
    }

    onCancel() {
        this.closed.emit(false);
        this.show = false;
    }

    onBackdropClick() {
        this.onCancel();
    }
}

@Injectable()
class CustomDialogService {
    private confirmDialog: ConfirmDialogComponent | null = null;

    setConfirmDialog(dialog: ConfirmDialogComponent) {
        this.confirmDialog = dialog;
    }

    showConfirmation(title: string, message: string): Promise<boolean> {
        return new Promise((resolve) => {
            if (this.confirmDialog) {
                this.confirmDialog.data = { title, message };
                this.confirmDialog.show = true;
                
                const subscription = this.confirmDialog.closed.subscribe((result: boolean) => {
                    resolve(result);
                    subscription.unsubscribe();
                });
            } else {
                resolve(false);
            }
        });
    }
}

export function DialogMixin<TBase extends Constructor>(Base: TBase) {
    @Directive()
    class Dialog extends Base {
        private dialogService = new CustomDialogService();
        
        showDialog<TComponent>(component: ComponentType<TComponent>, data?: any): Promise<any> {
            // This is a simplified implementation
            // In a real scenario, you might want to dynamically create components
            return Promise.resolve(null);
        }
        
        showConfirmation(message: string): Promise<boolean> {
            return this.dialogService.showConfirmation('Confirmation', message);
        }
    };
    return class extends Dialog { };
}

export { ConfirmDialogComponent, CustomDialogService }; 