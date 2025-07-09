import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Item } from '../../models/volume.models';

@Component({
  selector: 'app-dimensions-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class="modal-header">
      <h2 mat-dialog-title>{{ data.roomName }} - Item Dimensions</h2>
      <button mat-icon-button mat-dialog-close>
        <mat-icon>close</mat-icon>
      </button>
    </div>
    
    <mat-dialog-content class="modal-content">
      <div class="dimensions-grid">
        <div *ngFor="let item of data.items" class="dimension-item">
          <div class="item-info">
            <h3>{{ item.name }}</h3>
            <span class="volume">Volume: {{ item.volume }} m³</span>
            <span class="packable" [class.packable-yes]="item.packable" [class.packable-no]="!item.packable">
              {{ item.packable ? 'Packable' : 'Non-packable' }}
            </span>
          </div>
          <div class="dimensions" *ngIf="item.dimensions">
            <div class="dimension-row">
              <span class="label">Length:</span>
              <span class="value">{{ item.dimensions.length }} {{ item.dimensions.unit }}</span>
            </div>
            <div class="dimension-row">
              <span class="label">Width:</span>
              <span class="value">{{ item.dimensions.width }} {{ item.dimensions.unit }}</span>
            </div>
            <div class="dimension-row">
              <span class="label">Height:</span>
              <span class="value">{{ item.dimensions.height }} {{ item.dimensions.unit }}</span>
            </div>
          </div>
          <div class="no-dimensions" *ngIf="!item.dimensions">
            <span>Dimensions not available</span>
          </div>
        </div>
      </div>
    </mat-dialog-content>
    
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Close</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: -24px -24px 1rem -24px;
      padding: 1rem 1.5rem;
      background-color: #6c757d;
      color: white;
    }
    
    .modal-header h2 {
      margin: 0;
      color: white;
    }
    
    .modal-header button {
      color: white !important;
    }
    
    .modal-content {
      max-height: 60vh;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 0;
    }
    
    .dimensions-grid {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      width: 100%;
    }
    
    .dimension-item {
      border: 1px solid #dee2e6;
      border-radius: 0.25rem;
      padding: 1rem;
      background-color: #f8f9fa;
      width: 100%;
      box-sizing: border-box;
    }
    
    .item-info {
      margin-bottom: 1rem;
    }
    
    .item-info h3 {
      margin: 0 0 0.5rem 0;
      color: #212529;
      font-size: 1.1rem;
    }
    
    .volume {
      display: block;
      color: #6c757d;
      font-size: 0.9rem;
      margin-bottom: 0.25rem;
    }
    
    .packable {
      display: inline-block;
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      font-size: 0.8rem;
      font-weight: bold;
    }
    
    .packable-yes {
      background-color: #d4edda;
      color: #155724;
    }
    
    .packable-no {
      background-color: #f8d7da;
      color: #721c24;
    }
    
    .dimensions {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 1rem;
      width: 100%;
    }
    
    .dimension-row {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0.5rem;
      background-color: white;
      border-radius: 0.25rem;
      border: 1px solid #dee2e6;
      min-width: 0;
    }
    
    .label {
      font-weight: bold;
      color: #495057;
      font-size: 0.85rem;
      margin-bottom: 0.25rem;
    }
    
    .value {
      color: #212529;
      font-size: 1rem;
    }
    
    .no-dimensions {
      text-align: center;
      color: #6c757d;
      font-style: italic;
    }
    
    ::ng-deep .mat-dialog-container {
      overflow-x: hidden !important;
    }
    
    @media (max-width: 600px) {
      .dimensions {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class DimensionsModalComponent {
  constructor(
    public dialogRef: MatDialogRef<DimensionsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { roomName: string; items: Item[] }
  ) {}
} 