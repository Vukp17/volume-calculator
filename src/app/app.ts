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
  ) { }

  ngOnInit(): void {
    const categories = this.dataService.getCategories();
    this.rooms = categories.map((category, index) => ({
      id: index + 1,
      name: category.name,
      category: category,
      subtotalVolume: 0,
      estimatedCartons: 0,
      boxes: {
        small: 0,
        medium: 0,
        large: 0,
        custom: []
      }
    }));
    this.updateTotals();
    this.addJsonLd();
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

  resetAll(): void {
    this.rooms.forEach(room => {
      room.category.items.forEach(item => item.quantity = 0);
      room.boxes.small = 0;
      room.boxes.medium = 0;
      room.boxes.large = 0;
      room.boxes.custom = [];
      this.calculator.updateRoomCalculations(room);
    });
    this.updateTotals();
  }

  // app.component.ts
  private addJsonLd() {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Container Volume Calculator",
      "description": "Calculate shipping and storage container volumes",
      "url": "https://containerzone.com.au/calculator",
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "All",
      "provider": {
        "@type": "Organization",
        "name": "ContainerZone",
        "url": "https://containerzone.com.au"
      }
    });
    document.head.appendChild(script);
  }
}
