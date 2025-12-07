import { ViewChild, Directive } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Constructor } from "@utilities/components/mixin-base";

export function FormValidationMixin<TBase extends Constructor>(Base: TBase, formName: string) {
    @Directive()
    class FormValidation extends Base {
        @ViewChild(formName) _Form!: NgForm;
        validateForm() {
            Object.values(this._Form.controls).forEach(control => {
                console.log(control);
                control.markAsTouched();
            });
            return this._Form.valid;
        }
    };
    return class extends FormValidation { };
}