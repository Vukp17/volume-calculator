import { Injectable } from '@angular/core';
import { Category } from '../models/volume.models';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private categories: Category[] = [
    {
      name: 'Bedroom',
      image: 'bed',
      items: [
        { name: 'Single bed', volume: 1.2, quantity: 0, packable: false, dimensions: { length: 2.0, width: 1.0, height: 0.6, unit: 'm' } },
        { name: 'Double bed', volume: 1.8, quantity: 0, packable: false, dimensions: { length: 2.0, width: 1.5, height: 0.6, unit: 'm' } },
        { name: 'Nightstand', volume: 0.2, quantity: 0, packable: false, dimensions: { length: 0.5, width: 0.4, height: 1.0, unit: 'm' } },
        { name: 'Chest of drawers', volume: 0.6, quantity: 0, packable: false, dimensions: { length: 1.0, width: 0.5, height: 1.2, unit: 'm' } },
        { name: 'Wardrobe', volume: 1.5, quantity: 0, packable: false, dimensions: { length: 1.2, width: 0.6, height: 2.0, unit: 'm' } },
        { name: 'Wardrobe, dismantled per meter', volume: 0.5, quantity: 0, packable: false, dimensions: { length: 1.0, width: 0.3, height: 1.7, unit: 'm' } },
        { name: 'TV', volume: 0.15, quantity: 0, packable: false, dimensions: { length: 1.2, width: 0.08, height: 0.7, unit: 'm' } },
        { name: 'Bedding', volume: 0.2, quantity: 0, packable: true, dimensions: { length: 0.8, width: 0.5, height: 0.5, unit: 'm' } },
      ]
    },
    {
      name: 'Living and Dining room',
      image: 'living',
      items: [
        { name: 'VCR', volume: 0.02, quantity: 0, packable: true, dimensions: { length: 0.35, width: 0.25, height: 0.08, unit: 'm' } },
        { name: 'Hi-Fi System', volume: 0.25, quantity: 0, packable: false, dimensions: { length: 0.8, width: 0.4, height: 0.8, unit: 'm' } },
        { name: 'Sideboard', volume: 0.7, quantity: 0, packable: false, dimensions: { length: 1.5, width: 0.4, height: 1.2, unit: 'm' } },
        { name: 'Sideboard with Top Board', volume: 0.9, quantity: 0, packable: false, dimensions: { length: 1.5, width: 0.4, height: 1.5, unit: 'm' } },
        { name: 'Grand Piano', volume: 2.5, quantity: 0, packable: false, dimensions: { length: 2.3, width: 1.5, height: 1.0, unit: 'm' } },
        { name: 'Desk', volume: 0.8, quantity: 0, packable: false, dimensions: { length: 1.4, width: 0.7, height: 0.8, unit: 'm' } },
        { name: 'Piano', volume: 1.5, quantity: 0, packable: false, dimensions: { length: 1.5, width: 0.6, height: 1.3, unit: 'm' } },
        { name: 'TV Table', volume: 0.4, quantity: 0, packable: false, dimensions: { length: 1.0, width: 0.5, height: 0.8, unit: 'm' } },
        { name: 'Cupboard', volume: 0.7, quantity: 0, packable: false, dimensions: { length: 1.0, width: 0.4, height: 1.8, unit: 'm' } },
        { name: 'TV', volume: 0.15, quantity: 0, packable: false, dimensions: { length: 1.2, width: 0.08, height: 0.7, unit: 'm' } },
        { name: 'Armchair with armrest', volume: 0.6, quantity: 0, packable: false, dimensions: { length: 0.9, width: 0.8, height: 0.8, unit: 'm' } },
        { name: 'Chandelier', volume: 0.3, quantity: 0, packable: true, dimensions: { length: 0.8, width: 0.8, height: 0.5, unit: 'm' } },
        { name: 'Armchair w/o armrest', volume: 0.4, quantity: 0, packable: false, dimensions: { length: 0.7, width: 0.6, height: 0.8, unit: 'm' } },
        { name: 'Table medium', volume: 0.7, quantity: 0, packable: false, dimensions: { length: 1.2, width: 0.8, height: 0.8, unit: 'm' } },
        { name: 'Glass cabinet', volume: 0.8, quantity: 0, packable: false, dimensions: { length: 1.0, width: 0.4, height: 2.0, unit: 'm' } },
        { name: 'Table big', volume: 1.2, quantity: 0, packable: false, dimensions: { length: 1.8, width: 1.0, height: 0.8, unit: 'm' } },
        { name: 'Secretary', volume: 0.6, quantity: 0, packable: false, dimensions: { length: 1.0, width: 0.5, height: 1.2, unit: 'm' } },
        { name: 'Couch per seat', volume: 0.9, quantity: 0, packable: false, dimensions: { length: 0.9, width: 0.8, height: 0.8, unit: 'm' } },
        { name: 'Rug', volume: 0.2, quantity: 0, packable: true, dimensions: { length: 2.0, width: 1.5, height: 0.02, unit: 'm' } },
        { name: 'Lamp', volume: 0.1, quantity: 0, packable: true, dimensions: { length: 0.3, width: 0.3, height: 1.5, unit: 'm' } },
        { name: 'Chair w/o armrest', volume: 0.2, quantity: 0, packable: false, dimensions: { length: 0.5, width: 0.5, height: 0.8, unit: 'm' } },
      ]
    },
    {
      name: 'Office',
      image: 'work',
      items: [
        { name: 'Desk', volume: 0.8, quantity: 0, packable: false, dimensions: { length: 1.4, width: 0.7, height: 0.8, unit: 'm' } },
        { name: 'Office Chair', volume: 0.3, quantity: 0, packable: false, dimensions: { length: 0.6, width: 0.6, height: 1.2, unit: 'm' } },
        { name: 'Bookshelf', volume: 0.7, quantity: 0, packable: false, dimensions: { length: 1.0, width: 0.3, height: 2.0, unit: 'm' } },
        { name: 'Filing Cabinet', volume: 0.4, quantity: 0, packable: false, dimensions: { length: 0.4, width: 0.6, height: 1.3, unit: 'm' } },
        { name: 'Computer & Screen', volume: 0.1, quantity: 0, packable: true, dimensions: { length: 0.6, width: 0.4, height: 0.4, unit: 'm' } },
      ]
    },
    {
      name: 'Children\'s room',
      image: 'child_care',
      items: [
        { name: 'Child\'s bed', volume: 0.8, quantity: 0, packable: false, dimensions: { length: 1.5, width: 0.8, height: 0.5, unit: 'm' } },
        { name: 'Toy box', volume: 0.3, quantity: 0, packable: true, dimensions: { length: 0.8, width: 0.5, height: 0.6, unit: 'm' } },
        { name: 'Small desk', volume: 0.4, quantity: 0, packable: false, dimensions: { length: 1.0, width: 0.6, height: 0.7, unit: 'm' } },
        { name: 'Small wardrobe', volume: 0.8, quantity: 0, packable: false, dimensions: { length: 0.8, width: 0.5, height: 1.8, unit: 'm' } },
      ]
    },
    {
      name: 'Cellar & Garage',
      image: 'garage',
      items: [
        { name: 'Tools (box)', volume: 0.1, quantity: 0, packable: true, dimensions: { length: 0.5, width: 0.3, height: 0.4, unit: 'm' } },
        { name: 'Set of Tires', volume: 0.4, quantity: 0, packable: false, dimensions: { length: 0.7, width: 0.7, height: 0.8, unit: 'm' } },
        { name: 'Bicycle', volume: 0.5, quantity: 0, packable: false, dimensions: { length: 1.8, width: 0.6, height: 1.2, unit: 'm' } },
        { name: 'Shelving unit (per meter)', volume: 0.3, quantity: 0, packable: false, dimensions: { length: 1.0, width: 0.3, height: 2.0, unit: 'm' } },
      ]
    },
    {
      name: 'Kitchen',
      image: 'kitchen',
      items: [
        { name: 'Refrigerator', volume: 1.0, quantity: 0, packable: false, dimensions: { length: 0.6, width: 0.6, height: 1.8, unit: 'm' } },
        { name: 'Oven', volume: 0.4, quantity: 0, packable: false, dimensions: { length: 0.6, width: 0.6, height: 0.8, unit: 'm' } },
        { name: 'Microwave', volume: 0.1, quantity: 0, packable: true, dimensions: { length: 0.5, width: 0.4, height: 0.3, unit: 'm' } },
        { name: 'Dishwasher', volume: 0.4, quantity: 0, packable: false, dimensions: { length: 0.6, width: 0.6, height: 0.8, unit: 'm' } },
        { name: 'Kitchen Table', volume: 0.7, quantity: 0, packable: false, dimensions: { length: 1.2, width: 0.8, height: 0.8, unit: 'm' } },
        { name: 'Kitchen Chair', volume: 0.2, quantity: 0, packable: false, dimensions: { length: 0.5, width: 0.5, height: 0.8, unit: 'm' } },
        { name: 'Small appliances', volume: 0.2, quantity: 0, packable: true, dimensions: { length: 0.4, width: 0.3, height: 0.3, unit: 'm' } },
      ]
    },
    {
      name: 'Bathroom',
      image: 'bathtub',
      items: [
        { name: 'Washing machine', volume: 0.4, quantity: 0, packable: false, dimensions: { length: 0.6, width: 0.6, height: 0.85, unit: 'm' } },
        { name: 'Dryer', volume: 0.4, quantity: 0, packable: false, dimensions: { length: 0.6, width: 0.6, height: 0.85, unit: 'm' } },
        { name: 'Bathroom Cabinet', volume: 0.3, quantity: 0, packable: false, dimensions: { length: 0.8, width: 0.4, height: 1.0, unit: 'm' } },
      ]
    }
  ];

  constructor() { }

  getCategories(): Category[] {
    return JSON.parse(JSON.stringify(this.categories));
  }
} 