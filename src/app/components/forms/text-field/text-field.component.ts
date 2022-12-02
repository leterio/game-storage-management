import { Component } from '@angular/core';
import { AbstractField } from '../abstract-field';

@Component({
  selector: 'text-field[fieldId][fieldName][fieldLabel]',
  templateUrl: './text-field.component.html',
})
export class TextFieldComponent extends AbstractField<string> {}
