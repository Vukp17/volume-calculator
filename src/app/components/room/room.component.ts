import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Room, Item } from '../../models/volume.models';
import { CalculatorService } from '../../services/calculator.service';
import { DimensionsModalComponent } from './dimensions-modal.component';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent {
  @Input() room!: Room;
  @Output() roomChange = new EventEmitter<Room>();

  constructor(private calculator: CalculatorService, private dialog: MatDialog) {}

  onQuantityChange(item: Item, quantity: number) {
    if (quantity >= 0) {
      item.quantity = quantity;
      this.calculator.updateRoomCalculations(this.room);
      this.roomChange.emit(this.room);
    }
  }

  increment(item: Item) {
    this.onQuantityChange(item, item.quantity + 1);
  }

  decrement(item: Item) {
    this.onQuantityChange(item, item.quantity - 1);
  }

  openDimensionsModal() {
    this.dialog.open(DimensionsModalComponent, {
      width: '600px',
      data: { 
        roomName: this.room.name,
        items: this.room.category.items 
      }
    });
  }
} 