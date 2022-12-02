import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({ template: '' })
export abstract class AbstractField<T> {
  @Input() fieldId!: string;
  @Input() fieldName!: string;
  @Input() fieldLabel!: string;

  @Input() fieldRequired: boolean = false;
  @Input() fieldPattern?: string;
  @Input() fieldPatternDescription?: string[];

  @Input() fieldReadOnly: boolean = false;

  _fieldValue?: T;
  @Input() public set fieldValue(v: T | undefined) {
    this._fieldValue = v;
    this.updateEmpty();
  }
  public get fieldValue(): T | undefined {
    return this._fieldValue;
  }

  @Output() fieldValueChange = new EventEmitter<T>();

  fieldEmpty: boolean = true;

  updateEmpty(): void {
    this.fieldEmpty = true;
    if (this.fieldValue) {
      if (!(this.fieldValue instanceof String && (<String>this.fieldValue).length == 0)) {
        this.fieldEmpty = false;
      }
    }
  }

  onChange(newValue: T | undefined): void {
    this.fieldValue = newValue;
    this.updateEmpty();
    this.fieldValueChange.emit(newValue);
  }

  onBlur(event: any): void {
    if(!event.target.checkValidity()) {
      event.target.classList.add('is-invalid');
    } else {
      event.target.classList.remove('is-invalid');
    }
  }
}
