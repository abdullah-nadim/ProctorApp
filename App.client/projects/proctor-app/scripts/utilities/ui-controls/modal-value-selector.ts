import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal';

export interface SelectableValue {
  id: number | string;
  name: string;
  icon?: string;
}

@Component({
  selector: 'modal-value-selector',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  template: `
<button type="button" class="btn btn-primary btn-lg btn-outline-primary btn-rounded" (click)="showModal()">
  {{ buttonText }}
</button>

<uc-modal [show]="show" [title]="buttonText" (closed)="onCancel()">
  <div class="list-group">
    <button *ngFor="let value of values" type="button" class="list-group-item list-group-item-action d-flex align-items-center" 
      [class.active]="isSelected(value)" (click)="selectValue(value)">
      <i *ngIf="value.icon" [class]="value.icon + ' me-2'"></i>
      {{ value.name }}
    </button>
  </div>
</uc-modal>
`})
export class ModalValueSelectorComponent {
  @Input() show: boolean = false;
  @Input() buttonText: string = 'Select Value';
  @Input() values: SelectableValue[] = [];
  @Input() selected: SelectableValue | null = null;

  @Output() confirmed = new EventEmitter<SelectableValue>();
  @Output() cancelled = new EventEmitter<void>();

  showModal() {
    this.show = true;
  }

  selectValue(value: SelectableValue) {
    this.selected = value;
    this.confirmed.emit(value);
    this.onCancel();
  }

  isSelected(value: SelectableValue): boolean {
    return this.selected?.id === value.id;
  }

  onCancel() {
    this.show = false;
    this.cancelled.emit();
  }
}
