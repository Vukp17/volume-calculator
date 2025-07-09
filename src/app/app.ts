import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomComponent } from './components/room/room.component';
import { SummaryComponent } from './components/summary/summary.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { DataService } from './services/data.service';
import { CalculatorService } from './services/calculator.service';
import { Room } from './models/volume.models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RoomComponent, SummaryComponent, FooterComponent, HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  rooms: Room[] = [];
  totalVolume = 0;
  totalCartons = 0;

  constructor(
    private dataService: DataService,
    private calculator: CalculatorService
  ) {}

  ngOnInit(): void {
    const categories = this.dataService.getCategories();
    this.rooms = categories.map((category, index) => ({
      id: index + 1,
      name: category.name,
      category: category,
      subtotalVolume: 0,
      estimatedCartons: 0,
    }));
    this.updateTotals();
  }

  onRoomChange(updatedRoom: Room): void {
    const index = this.rooms.findIndex(r => r.id === updatedRoom.id);
    if (index !== -1) {
      this.rooms[index] = updatedRoom;
      this.updateTotals();
    }
  }

  updateTotals(): void {
    this.totalVolume = this.calculator.calculateGrandTotalVolume(this.rooms);
    this.totalCartons = this.calculator.calculateGrandTotalCartons(this.rooms);
  }
}
