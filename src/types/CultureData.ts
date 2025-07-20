export interface MediaFile {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video';
  size: number;
}

export interface BaseItem {
  id: string;
  name: string;
  place: string;
  description: string;
  images: MediaFile[];
  videos: MediaFile[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Temple extends BaseItem {
  type: 'temple';
  deity: string;
  age: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Festival extends BaseItem {
  type: 'festival';
  date: string;
  history: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Food extends BaseItem {
  type: 'food';
  taste: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Cloth extends BaseItem {
  type: 'cloth';
  clothType: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Village extends BaseItem {
  type: 'village';
  state: string;
  specialty: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export type CultureItem = Temple | Festival | Food | Cloth | Village;
export type ItemType = 'temple' | 'festival' | 'food' | 'cloth' | 'village';

export interface CultureDatabase {
  temples: Temple[];
  festivals: Festival[];
  food: Food[];
  clothes: Cloth[];
  villages: Village[];
}

export interface FormData {
  name: string;
  place: string;
  description: string;
  images: File[];
  videos: File[];
  // Type-specific fields
  deity?: string;
  age?: string;
  date?: string;
  history?: string;
  taste?: string;
  clothType?: string;
  state?: string;
  specialty?: string;
}