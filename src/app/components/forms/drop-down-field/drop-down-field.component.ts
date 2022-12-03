import { Component, Input } from '@angular/core';
import { AbstractField } from '../abstract-field';
import { DropDownOption } from './drop-down-option';

@Component({
  selector: 'drop-down-field[fieldId][fieldName][fieldLabel][fieldOptions]',
  templateUrl: './drop-down-field.component.html',
  styleUrls: ['../forms-commom.css'],
})
export class DropDownFieldComponent extends AbstractField<any> {
  @Input() fieldOptions!: DropDownOption[];
}
