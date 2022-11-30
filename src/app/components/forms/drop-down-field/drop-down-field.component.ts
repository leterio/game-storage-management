import { Component } from '@angular/core';
import { AbstractField } from '../abstract-field';

@Component({
  selector: 'drop-down-field[fieldId][fieldName][fieldLabel]',
  templateUrl: './drop-down-field.component.html',
})
export class DropDownFieldComponent extends AbstractField<any> {}
