import { Component } from '@angular/core';
import { AbstractField } from '../abstract-field';

@Component({
  selector: 'check-field[fieldId][fieldName][fieldLabel]',
  templateUrl: './check-field.component.html',
})
export class CheckFieldComponent extends AbstractField<boolean> {
  click() {
    if (this.fieldReadOnly) {
      return false;
    }
    return true;
  }
}
