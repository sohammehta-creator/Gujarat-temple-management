
import type { TempleData, ChatMessage } from './types';
import { TempleName, CrowdLevel } from './types';
import { SunIcon, CloudIcon, ZapIcon } from './components/icons';

export const TEMPLES_DATA: Record<TempleName, TempleData> = {
  [TempleName.Somnath]: {
    name: TempleName.Somnath,
    location: "Veraval, Gujarat",
    image: "https://picsum.photos/seed/somnath/800/600",
    mapCoords: { x: "25%", y: "85%" },
    liveStatus: {
      crowdLevel: CrowdLevel.Moderate,
      waitTime: 45,
      visitorCount: 1250,
      parkingSlots: 150,
    },
    weather: { temp: 32, condition: "Sunny", icon: SunIcon },
  },
  [TempleName.Dwarka]: {
    name: TempleName.Dwarka,
    location: "Dwarka, Gujarat",
    image: "https://picsum.photos/seed/dwarka/800/600",
    mapCoords: { x: "10%", y: "55%" },
    liveStatus: {
      crowdLevel: CrowdLevel.Low,
      waitTime: 20,
      visitorCount: 800,
      parkingSlots: 300,
    },
    weather: { temp: 30, condition: "Cloudy", icon: CloudIcon },
  },
  [TempleName.Ambaji]: {
    name: TempleName.Ambaji,
    location: "Banaskantha, Gujarat",
    image: "https://picsum.photos/seed/ambaji/800/600",
    mapCoords: { x: "55%", y: "15%" },
    liveStatus: {
      crowdLevel: CrowdLevel.High,
      waitTime: 90,
      visitorCount: 3500,
      parkingSlots: 50,
    },
    weather: { temp: 28, condition: "Sunny", icon: SunIcon },
  },
  [TempleName.Pavagadh]: {
    name: TempleName.Pavagadh,
    location: "Panchmahal, Gujarat",
    image: "https://picsum.photos/seed/pavagadh/800/600",
    mapCoords: { x: "68%", y: "45%" },
    liveStatus: {
      crowdLevel: CrowdLevel.Critical,
      waitTime: 150,
      visitorCount: 5200,
      parkingSlots: 10,
    },
    weather: { temp: 29, condition: "Thunderstorm", icon: ZapIcon },
  },
};

export const CROWD_LEVEL_COLORS: Record<CrowdLevel, string> = {
  [CrowdLevel.Low]: "bg-green-500",
  [CrowdLevel.Moderate]: "bg-yellow-500",
  [CrowdLevel.High]: "bg-orange-500",
  [CrowdLevel.Critical]: "bg-red-500",
};

export const CROWD_LEVEL_TEXT_COLORS: Record<CrowdLevel, string> = {
    [CrowdLevel.Low]: "text-green-500",
    [CrowdLevel.Moderate]: "text-yellow-500",
    [CrowdLevel.High]: "text-orange-500",
    [CrowdLevel.Critical]: "text-red-500",
};

export const CROWD_PREDICTION_DATA = [
    { name: '3 days ago', visitors: 2200 },
    { name: '2 days ago', visitors: 2900 },
    { name: 'Yesterday', visitors: 4100 },
    { name: 'Today', visitors: 3500 },
    { name: 'Tomorrow (Pred.)', visitors: 3800 },
    { name: 'In 2 days (Pred.)', visitors: 4500 },
];

export const INITIAL_CHAT_MESSAGE: ChatMessage = {
  sender: 'bot',
  text: 'Namaste! How can I help you with your darshan today? You can ask me about crowd status, timings, or even book a slot.'
};
