import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({ template: '' })
export abstract class AbstractField<T> implements OnInit {
  @Input() fieldId!: string;
  @Input() fieldName!: string;
  @Input() fieldLabel!: string;
  @Input() fieldRequired: boolean = false;

  @Input() fieldValue?: T;
  @Output() fieldValueChange = new EventEmitter<T>();

  onChange(newValue: T): void {
    console.log(this);
    console.log(this.fieldValue);
    console.log(newValue);
    this.fieldValueChange.emit(newValue);
  }

  ngOnInit(): void {
    this.fieldValueChange.subscribe((value) => (this.fieldValue = value));
  }
}
