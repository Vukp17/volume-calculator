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

export interface Room {
  id: number;
  name:string;
  category: Category;
  subtotalVolume: number;
  estimatedCartons: number;
  boxes: {
    small: number;
    medium: number;
    large: number;
    custom: Array<{ length: number; width: number; height: number; quantity: number }>;
  };
} 