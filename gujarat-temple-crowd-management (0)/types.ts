
export enum TempleName {
  Somnath = "Somnath",
  Dwarka = "Dwarka",
  Ambaji = "Ambaji",
  Pavagadh = "Pavagadh",
}

export enum CrowdLevel {
  Low = "Low",
  Moderate = "Moderate",
  High = "High",
  Critical = "Critical",
}

export interface TempleData {
  name: TempleName;
  location: string;
  image: string;
  mapCoords: { x: string; y: string };
  liveStatus: {
    crowdLevel: CrowdLevel;
    waitTime: number; // in minutes
    visitorCount: number;
    parkingSlots: number;
  };
  weather: {
    temp: number; // in Celsius
    condition: string;
    icon: React.ComponentType<{ className?: string }>;
  };
}

export interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}
