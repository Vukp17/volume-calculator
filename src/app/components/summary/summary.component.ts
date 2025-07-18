import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent {
  @Input() totalVolume = 0;
  @Input() totalCartons = 0;
  @Output() resetAll = new EventEmitter<void>();

  onResetAll() {
    this.resetAll.emit();
  }
} 