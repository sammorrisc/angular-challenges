import { CommonModule } from '@angular/common';
import { Component, ElementRef, Renderer2 } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Component({
  imports: [CommonModule],
  selector: 'app-rating-control',
  templateUrl: 'rating-control.component.html',
  styleUrls: ['rating-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: RatingControlComponent,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: RatingControlComponent,
    },
  ],
})
export class RatingControlComponent implements ControlValueAccessor, Validator {
  value: number | null = null;
  validatorFn = () => {};
  onChange = (quantity: number) => {};
  onTouched = () => {};
  isDisabled: boolean = false;
  touched: boolean = false;
  constructor(
    public elementRef: ElementRef,
    public renderer: Renderer2,
  ) {}
  setRating(index: number): void {
    this.markAsTouched();
    this.value = index + 1;
    this.onChange(this.value);
  }
  validate(control: AbstractControl): ValidationErrors | null {
    return null;
  }
  registerOnValidatorChange(fn: () => void): void {
    this.validatorFn = fn;
  }

  isStarActive(index: number, value: number | null): boolean {
    return value ? index < value : false;
  }
  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }
  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
