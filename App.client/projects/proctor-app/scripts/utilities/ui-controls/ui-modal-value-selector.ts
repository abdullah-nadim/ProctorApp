import { Component, Input, Output, EventEmitter, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIModal } from '@utilities/ui-controls/ui-modal';

export interface SelectionOption {
    key: number | string;
    value: string;
}

@Component({
    selector: 'ui-modal-value-selector',
    standalone: true,
    imports: [CommonModule, UIModal],
    template: `
<button type="button" class="btn btn-primary btn-lg btn-outline-primary btn-rounded" (click)="onSelect()">
  {{  value ? value.value : label }}
</button>

<ui-modal title="label" #optionsModal>
  <div class="list-group">
    <button type="button" class="list-group-item list-group-item-action d-flex align-items-center" 
        *ngFor="let option of options" [class.active]="option.key == value?.key" (click)="onOptionSelected(option)">
        {{ option.value }}
    </button>
  </div>
</ui-modal>
`})
export class UIModalValueSelector {
    @Input() label: string = 'Please select';
    @Input() options: SelectionOption[] = [];
    @Input() value: SelectionOption | null = null;
    @Output() onSelected = new EventEmitter<SelectionOption>();

    optionsModal = viewChild<UIModal>('optionsModal');

    onSelect() {
        console.log('clicked');
        this.optionsModal()?.open();
    }

    onOptionSelected(value: SelectionOption) {
        this.value = value;
        this.onSelected.emit(value);
        this.optionsModal()?.close();
    }
}
