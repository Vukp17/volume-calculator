import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Room, Item, Box } from '../../models/volume.models';
import { CalculatorService } from '../../services/calculator.service';
import { DimensionsModalComponent } from './dimensions-modal.component';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  @Input() room!: Room;
  @Output() roomChange = new EventEmitter<Room>();

  // For adding new custom box
  newCustomBox = { length: 0, width: 0, height: 0 };

  constructor(private calculator: CalculatorService, private dialog: MatDialog) {}

  ngOnInit(): void {
    // Initialize standard boxes if needed
    this.calculator.initializeStandardBoxes(this.room);
  }

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

  // Box quantity management
  changeBoxQuantity(boxId: string, delta: number) {
    const box = this.room.boxes.find(b => b.id === boxId);
    if (box) {
      box.quantity = Math.max(0, box.quantity + delta);
      this.calculator.updateRoomCalculations(this.room);
      this.roomChange.emit(this.room);
    }
  }

  onBoxQuantityInput(boxId: string, value: number) {
    const box = this.room.boxes.find(b => b.id === boxId);
    if (box) {
      box.quantity = Math.max(0, value || 0);
      this.calculator.updateRoomCalculations(this.room);
      this.roomChange.emit(this.room);
    }
  }

  // Custom box management
  addCustomBox() {
    if (this.newCustomBox.length > 0 && this.newCustomBox.width > 0 && this.newCustomBox.height > 0) {
      const volume = (this.newCustomBox.length / 1000) * (this.newCustomBox.width / 1000) * (this.newCustomBox.height / 1000);
      const customId = `custom-${Date.now()}`;
      
      const newBox: Box = {
        id: customId,
        name: `Custom Box (${this.newCustomBox.length}×${this.newCustomBox.width}×${this.newCustomBox.height}mm)`,
        dimensions: { ...this.newCustomBox },
        volume: volume,
        quantity: 1,
        isStandard: false
      };

      this.room.boxes.push(newBox);
      this.newCustomBox = { length: 0, width: 0, height: 0 };
      this.calculator.updateRoomCalculations(this.room);
      this.roomChange.emit(this.room);
    }
  }

  removeBox(boxId: string) {
    const index = this.room.boxes.findIndex(box => box.id === boxId);
    if (index !== -1 && !this.room.boxes[index].isStandard) {
      this.room.boxes.splice(index, 1);
      this.calculator.updateRoomCalculations(this.room);
      this.roomChange.emit(this.room);
    }
  }

  // Helper methods
  getStandardBoxes(): Box[] {
    return this.room.boxes.filter(box => box.isStandard);
  }

  getCustomBoxes(): Box[] {
    return this.room.boxes.filter(box => !box.isStandard);
  }
} 