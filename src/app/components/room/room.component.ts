import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Room, Item } from '../../models/volume.models';
import { CalculatorService } from '../../services/calculator.service';
import { DimensionsModalComponent } from './dimensions-modal.component';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, MatButtonModule, MatDialogModule],
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

  // Standard box quantity change
  changeBoxQuantity(type: 'small' | 'medium' | 'large', delta: number) {
    const newValue = (this.room.boxes[type] || 0) + delta;
    this.room.boxes[type] = Math.max(0, newValue);
    this.roomChange.emit(this.room);
  }

  onBoxInput(type: 'small' | 'medium' | 'large', value: number) {
    this.room.boxes[type] = Math.max(0, value || 0);
    this.updateBoxCalculations();
    this.roomChange.emit(this.room);
  }

  addCustomBox() {
    this.room.boxes.custom.push({ length: 1, width: 1, height: 1, quantity: 0 });
    this.updateBoxCalculations();
    this.roomChange.emit(this.room);
  }

  removeCustomBox(index: number) {
    this.room.boxes.custom.splice(index, 1);
    this.updateBoxCalculations();
    this.roomChange.emit(this.room);
  }

  updateBoxCalculations() {
    // Standard box volumes in m^3
    const boxVolumes = { small: 0.040, medium: 0.052, large: 0.104 };
    let boxVolume = 0;
    boxVolume += (this.room.boxes.small || 0) * boxVolumes.small;
    boxVolume += (this.room.boxes.medium || 0) * boxVolumes.medium;
    boxVolume += (this.room.boxes.large || 0) * boxVolumes.large;
    // Custom boxes: convert mm^3 to m^3
    for (const box of this.room.boxes.custom) {
      if (box.length && box.width && box.height && box.quantity) {
        boxVolume += (box.length / 1000) * (box.width / 1000) * (box.height / 1000) * box.quantity;
      }
    }
    // Add to subtotalVolume
    const itemsVolume = this.room.category.items.reduce((acc, item) => acc + (item.quantity * item.volume), 0);
    this.room.subtotalVolume = itemsVolume + boxVolume;
    // Cartons: count all boxes (standard + custom)
    const standardBoxCount = (this.room.boxes.small || 0) + (this.room.boxes.medium || 0) + (this.room.boxes.large || 0);
    const customBoxCount = this.room.boxes.custom.reduce((acc, box) => acc + (box.quantity || 0), 0);
    this.room.estimatedCartons = standardBoxCount + customBoxCount;
  }
} 