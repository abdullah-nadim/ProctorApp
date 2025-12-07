import { Directive, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Directive()
export class BasePage {
    @ViewChild('cForm') cForm!: NgForm;
    protected isLoading = false;

    constructor() { }

    startLoading() {
        this.isLoading = true;
    }

    stopLoading() {
        this.isLoading = false;
    }

    validateForm() {
        Object.values(this.cForm.controls).forEach(control => {
            console.log(control);
            control.markAsTouched();
        });
        return this.cForm.valid;
    }

    onServiceError(error: any): void { console.log(error); }
    onServiceCompleted(): void { console.log('completed'); this.stopLoading(); }
}