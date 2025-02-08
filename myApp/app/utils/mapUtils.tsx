// Enum for campus locations
export enum Campus {
  SGW = "SGW",
  LOY = "LOY",
}

// Interface for building data
interface Building {
  campus: Campus;
  name: string;
  coordinates: { latitude: number; longitude: number }[];
}

// Building coordinates
export const buildings: Building[] = [
  {
    campus: Campus.SGW,
    name: "Hall Building",
    coordinates: [
      { latitude: 45.497708764170056, longitude: -73.57903745550924 },
      { latitude: 45.4971677836167, longitude: -73.57954322525673 },
      { latitude: 45.49683156812768, longitude: -73.5788507530604 },
      { latitude: 45.497373147743474, longitude: -73.57834232326353 }
    ],
  },
  {
    campus: Campus.SGW,
    name: "John Molson School of Business",
    coordinates: [
      { latitude: 45.49551994498565, longitude: -73.57920062907395 },
      { latitude: 45.49535857941148, longitude: -73.5793643521431 },
      { latitude: 45.49501011165603, longitude: -73.5787600651902 },
      { latitude: 45.495193735650766, longitude: -73.57853184516286 }
    ],
  },
  {
    campus: Campus.SGW,
    name: "Pavillon EV Building",
    coordinates: [
      { latitude: 45.49567383989148, longitude: -73.57807898778127 },
      { latitude: 45.49586446758388, longitude: -73.57849838295294 },
      { latitude: 45.49561182833434, longitude: -73.57876050493525 },
      { latitude: 45.49524664777955, longitude: -73.57790860849278 },
      { latitude: 45.495832313560506, longitude: -73.57726313311137},
      { latitude: 45.49604131438413, longitude: -73.57771529353083 },
    ],
  },
  {
    campus: Campus.SGW,
    name: "Faubourg Ste-Catherine Building",
    coordinates: [
      { latitude: 45.494697617359805, longitude: -73.57803821546234 },
      { latitude: 45.493842086826234, longitude: -73.57907383173514 },
      { latitude: 45.493637259181746, longitude: -73.57873392697057 },
      { latitude: 45.49445099181303, longitude: -73.57761880079917 }
    ],
  },
  {
    campus: Campus.SGW,
    name: "Learning Square Building",
    coordinates: [
      { latitude: 45.49653594280453, longitude: -73.57957024371711 },
      { latitude: 45.49642006398626, longitude: -73.57968408412736 },
      { latitude: 45.49637079806912, longitude: -73.57958608238289 },
      { latitude: 45.49627087833015, longitude: -73.57967517487786 },
      { latitude: 45.496166101191235, longitude: -73.57944749405738 },
      { latitude: 45.49638328802403, longitude: -73.57923664181928 }
    ],
  },
];
