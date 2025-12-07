import { Component, Input, forwardRef } from '@angular/core';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'form-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormInputComponent),
      multi: true
    }
  ],
  template: `
    <div class="form-group">
      <label *ngIf="label">{{ label }}</label>
      <ng-container>
        <ng-container *ngIf="type === 'textarea'">
          <textarea
            [(ngModel)]="value"
            [name]="name"
            #textareaCtrl="ngModel"
            [required]="required"
            [minlength]="minLength || ''"
            [maxlength]="maxLength || ''"
            [pattern]="pattern || ''"
            class="form-control"
            (blur)="touched = true; onTouched()"
            (ngModelChange)="onChange($event)"
            [attr.placeholder]="placeholder"
            [attr.rows]="rows || 3"
            [disabled]="!!disabled"
          ></textarea>
          <div class="text-danger mt-1" *ngIf="textareaCtrl?.invalid && (textareaCtrl.dirty || textareaCtrl.touched || touched)">
            <div *ngIf="textareaCtrl.errors && textareaCtrl.errors['required']">This field is required.</div>
            <div *ngIf="textareaCtrl.errors && textareaCtrl.errors['minlength']">Minimum {{ minLength }} characters required.</div>
            <div *ngIf="textareaCtrl.errors && textareaCtrl.errors['maxlength']">Maximum {{ maxLength }} characters allowed.</div>
            <div *ngIf="textareaCtrl.errors && textareaCtrl.errors['pattern']">Invalid format.</div>
          </div>
        </ng-container>
        <ng-container *ngIf="type !== 'textarea'">
          <input
            [type]="type"
            [(ngModel)]="value"
            [name]="name"
            #inputCtrl="ngModel"
            [required]="required"
            [minlength]="minLength || ''"
            [maxlength]="maxLength || ''"
            [pattern]="pattern || ''"
            class="form-control"
            (blur)="touched = true; onTouched()"
            (ngModelChange)="onChange($event)"
            [attr.placeholder]="placeholder"
            [attr.autocomplete]="autocomplete"
            [attr.min]="min || ''"
            [attr.max]="max || ''"
            [attr.step]="step || ''"
            [disabled]="!!disabled"
          />
          <div class="text-danger mt-1" *ngIf="inputCtrl?.invalid && (inputCtrl.dirty || inputCtrl.touched || touched)">
            <div *ngIf="inputCtrl.errors && inputCtrl.errors['required']">This field is required.</div>
            <div *ngIf="inputCtrl.errors && inputCtrl.errors['minlength']">Minimum {{ minLength }} characters required.</div>
            <div *ngIf="inputCtrl.errors && inputCtrl.errors['maxlength']">Maximum {{ maxLength }} characters allowed.</div>
            <div *ngIf="inputCtrl.errors && inputCtrl.errors['pattern']">Invalid format.</div>
          </div>
        </ng-container>
      </ng-container>
    </div>
  `
})
export class FormInputComponent implements ControlValueAccessor {
  @Input() name!: string;
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() required: boolean = false;
  @Input() minLength?: number;
  @Input() maxLength?: number;
  @Input() pattern?: string;
  @Input() placeholder?: string;
  @Input() autocomplete?: string;
  @Input() min?: number;
  @Input() max?: number;
  @Input() step?: number;
  @Input() rows?: number;
  @Input() disabled?: boolean;
  
  touched = false;
  value: any = '';

  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
} 