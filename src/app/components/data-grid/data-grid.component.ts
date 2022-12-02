import { Component, Input } from '@angular/core';
import { DataGridModels } from './data-grid-model';

@Component({
  selector: 'data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.css'],
})
export class DataGridComponent {
  @Input() dataGridModels!: DataGridModels;
  @Input() field1Label?: string;
  @Input() field2Label?: string;
  @Input() field3Label?: string;
  @Input() field4Label?: string;
}
