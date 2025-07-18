export interface Item {
  name: string;
  volume: number;
  quantity: number;
  packable: boolean;
  dimensions?: {
    length: number;
    width: number;
    height: number;
    unit: string;
  };
}

export interface Category {
  name: string;
  image: string;
  items: Item[];
}

export interface Box {
  id: string;
  name: string;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  volume: number; // in m³
  quantity: number;
  isStandard: boolean;
}

export interface Room {
  id: number;
  name:string;
  category: Category;
  subtotalVolume: number;
  estimatedCartons: number;
  boxes: Box[];
  boxSubtotals?: {
    total: number;
  };
} 