import { Component, Input } from '@angular/core';
import { AbstractField } from '../abstract-field';

@Component({
  selector: 'text-area-field[fieldId][fieldName][fieldLabel]',
  templateUrl: './text-area-field.component.html',
})
export class TextAreaFieldComponent extends AbstractField<string> {
  @Input() fieldRows: number = 5;
  @Input() fieldResizable: boolean = true;
}
