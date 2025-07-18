import { Injectable } from '@angular/core';
import { Room, Box } from '../models/volume.models';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  private readonly CARTON_VOLUME = 0.1; // m³

  constructor() { }

  // Initialize standard boxes if room doesn't have them
  initializeStandardBoxes(room: Room): void {
    if (!room.boxes || room.boxes.length === 0) {
      room.boxes = [
        {
          id: 'small',
          name: 'Small Box (403x301x330mm, 40L)',
          dimensions: { length: 403, width: 301, height: 330 },
          volume: 0.040,
          quantity: 0,
          isStandard: true
        },
        {
          id: 'medium',
          name: 'Medium Box (406x298x431mm, 52L)',
          dimensions: { length: 406, width: 298, height: 431 },
          volume: 0.052,
          quantity: 0,
          isStandard: true
        },
        {
          id: 'large',
          name: 'Large Box (431x406x596mm, 104L)',
          dimensions: { length: 431, width: 406, height: 596 },
          volume: 0.104,
          quantity: 0,
          isStandard: true
        }
      ];
    }
  }

  calculateRoomSubtotal(room: Room): void {
    // Initialize standard boxes if needed
    this.initializeStandardBoxes(room);

    // Calculate items volume
    const itemsVolume = room.category.items.reduce((acc, item) => {
      return acc + (item.quantity * item.volume);
    }, 0);

    // Calculate box volumes
    const boxVolume = room.boxes.reduce((acc, box) => {
      return acc + (box.volume * box.quantity);
    }, 0);

    // Update box subtotals
    room.boxSubtotals = { total: boxVolume };

    // Total room volume = items + boxes
    room.subtotalVolume = itemsVolume + boxVolume;
  }

  estimateRoomCartons(room: Room): void {
    // Count packable items
    const packableVolume = room.category.items.reduce((acc, item) => {
      if (item.packable) {
        return acc + (item.quantity * item.volume);
      }
      return acc;
    }, 0);
    
    const itemCartons = Math.ceil(packableVolume / this.CARTON_VOLUME);
    
    // Count all boxes as cartons
    const boxCartons = room.boxes.reduce((acc, box) => acc + box.quantity, 0);
    
    room.estimatedCartons = itemCartons + boxCartons;
  }

  updateRoomCalculations(room: Room): void {
    this.calculateRoomSubtotal(room);
    this.estimateRoomCartons(room);
  }

  calculateGrandTotalVolume(rooms: Room[]): number {
    return rooms.reduce((acc, room) => acc + room.subtotalVolume, 0);
  }

  calculateGrandTotalCartons(rooms: Room[]): number {
    return rooms.reduce((acc, room) => acc + room.estimatedCartons, 0);
  }
} 