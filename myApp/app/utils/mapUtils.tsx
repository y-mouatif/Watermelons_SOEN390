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
  {
    campus: Campus.SGW,
    name: "LB Building",
    coordinates: [
      { latitude: 45.49730622534821, longitude: -73.57807280428914 },
      { latitude: 45.496690697848365, longitude: -73.57864792247945 },
      { latitude: 45.49626806063387, longitude: -73.57770485232867 },
      { latitude: 45.49689659688067, longitude: -73.57717611463757 }
    ],
  },
  {
    campus: Campus.SGW,
    name: "Grey Nuns Building",
    coordinates: [
      { latitude: 45.49444588559977, longitude: -73.57704684530952 },
      { latitude: 45.49394352956143, longitude: -73.57761419053239 },
      { latitude: 45.49379003098923, longitude: -73.57718619325901 },
      { latitude: 45.49312370279178, longitude: -73.57780828231915 },
      { latitude: 45.492475465970664, longitude: -73.57653820344966 },
      { latitude: 45.493800943703896, longitude: -73.57548347923793 },
    ],
  },
  {
    campus: Campus.SGW,
    name: "ER Building",
    coordinates: [
      { latitude: 45.4966874910767, longitude: -73.58014312979104 },
      { latitude: 45.49629611013139, longitude: -73.58045288885724 },
      { latitude: 45.49613291868629, longitude: -73.57997345285033 },
      { latitude: 45.49653121561911, longitude: -73.57966172079647 }
    ],
  },
  {
    campus: Campus.SGW,
    name: "L Building",
    coordinates: [
      { latitude: 45.497090344163816, longitude: -73.57991901007613 },
      { latitude: 45.49687671299113, longitude: -73.58013715708758 },
      { latitude: 45.49644575396693, longitude: -73.57923256445521 },
      { latitude: 45.49664726157326, longitude: -73.57902320172452 }
    ],
  },
  {
    campus: Campus.LOY,
    name: "Communications and Journalism Building",
    coordinates: [
      { latitude: 45.4577701957712, longitude: -73.64038118418138 },
      { latitude: 45.45736903876269, longitude: -73.64079453277228 },
      { latitude: 45.45718581506977, longitude: -73.6403940864452 },
      { latitude: 45.457300881660174, longitude: -73.64030192741797 },
      { latitude: 45.4571896937227, longitude: -73.63989458451766 },
      { latitude: 45.45744956286186, longitude: -73.63974897325465 },
      { latitude: 45.45755170015586, longitude: -73.64011576618299 },
      { latitude: 45.45764737289635, longitude: -73.64002729351685 },
    ],
  },
  {
    campus: Campus.LOY,
    name: "Central Building",
    coordinates: [
      { latitude: 45.45879783164691, longitude: -73.64116974399921 },
      { latitude: 45.45839267330936, longitude: -73.64143115333147 },
      { latitude: 45.45781370224986, longitude: -73.63984341091212 },
      { latitude: 45.458255329639066, longitude: -73.63945350094436 },
    ],
  },
  {
    campus: Campus.LOY,
    name: "Vanier Library Building",
    coordinates: [
      { latitude: 45.45953646015888, longitude: -73.63909824014291 },
      { latitude: 45.45900914646988, longitude: -73.63947855461015 },
      { latitude: 45.458618310788864, longitude: -73.63834203346968 },
      { latitude: 45.459074285486665, longitude: -73.63793518543496 },
    ],
  },
  {
    campus: Campus.LOY,
    name: "Hingston Hall C Building",
    coordinates: [
      { latitude: 45.459906138169075, longitude: -73.64203607306884 },
      { latitude: 45.45963415262996, longitude: -73.64225135213151 },
      { latitude: 45.45954317786371, longitude: -73.64201735315037 },
      { latitude: 45.459828294166044, longitude: -73.64181544545804 },
    ],
  },
  {
    campus: Campus.LOY,
    name: "Hingston Hall B Building",
    coordinates: [
      { latitude: 45.45955663320831, longitude: -73.64198943146944 },
      { latitude: 45.459140240357215, longitude: -73.64233198897811 },
      { latitude: 45.4589276398003, longitude: -73.64182981043137 },
      { latitude: 45.45936919390666, longitude: -73.64150698136561 },
    ],
  },
  {
    campus: Campus.LOY,
    name: "Hingston Hall A Building",
    coordinates: [
      { latitude: 45.45969784997463, longitude:  -73.64136123390169 },
      { latitude: 45.45942894983393, longitude: -73.64155628153311 },
      { latitude: 45.45925345641895, longitude: -73.641076060813 },
      { latitude: 45.45950631772512, longitude: -73.64087697771338 },
    ],
  },
  {
    campus: Campus.LOY,
    name: "Concordia Applied Psychology Centre Building",
    coordinates: [
      { latitude: 45.45921923334769, longitude: -73.64058679662563 },
      { latitude: 45.45879999060788, longitude: -73.64086057116744 },
      { latitude: 45.45866366275162, longitude: -73.6404718531157 },
      { latitude: 45.459065315920746, longitude: -73.6401646404619 },
    ],
  },
];
