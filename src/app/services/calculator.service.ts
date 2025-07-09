import { Injectable } from '@angular/core';
import { Room } from '../models/volume.models';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  private readonly CARTON_VOLUME = 0.1; // m³

  constructor() { }

  calculateRoomSubtotal(room: Room): void {
    room.subtotalVolume = room.category.items.reduce((acc, item) => {
      return acc + (item.quantity * item.volume);
    }, 0);
  }

  estimateRoomCartons(room: Room): void {
    const packableVolume = room.category.items.reduce((acc, item) => {
      if (item.packable) {
        return acc + (item.quantity * item.volume);
      }
      return acc;
    }, 0);
    room.estimatedCartons = Math.ceil(packableVolume / this.CARTON_VOLUME);
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