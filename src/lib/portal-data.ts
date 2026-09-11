export type Station = {
  slug: string;
  name: string;
  region: string;
  coords: [number, number];
  established: string;
  blurb: string;
  parameters: string[];
};

export const stations: Station[] = [
  {
    slug: "maitri",
    name: "Maitri",
    region: "Antarctica — Schirmacher Oasis",
    coords: [-70.766, 11.731],
    established: "1989",
    blurb:
      "India's second Antarctic station, supporting atmospheric sciences, geology and long-term meteorological observation.",
    parameters: ["Air temperature", "Wind speed", "Surface pressure", "Snow depth"],
  },
  {
    slug: "bharati",
    name: "Bharati",
    region: "Antarctica — Larsemann Hills",
    coords: [-69.404, 76.187],
    established: "2012",
    blurb:
      "A modern coastal station focused on oceanography, glaciology and coastal Antarctic ecosystem studies.",
    parameters: ["Sea surface temperature", "Salinity", "Solar radiation", "Humidity"],
  },
  {
    slug: "himadri",
    name: "Himadri",
    region: "Arctic — Ny-Ålesund, Svalbard",
    coords: [78.923, 11.922],
    established: "2008",
    blurb:
      "India's Arctic research base studying aerosols, space weather, glaciology and Arctic-monsoon teleconnections.",
    parameters: ["Aerosol optical depth", "Air temperature", "Snow cover", "UV index"],
  },
  {
    slug: "himansh",
    name: "Himansh",
    region: "Himalaya — Spiti, Himachal Pradesh",
    coords: [32.417, 77.617],
    established: "2016",
    blurb:
      "High-altitude glaciological laboratory monitoring mass balance and melt dynamics of Chandra basin glaciers.",
    parameters: ["Glacier mass balance", "Discharge", "Air temperature", "Precipitation"],
  },
  {
    slug: "southern-ocean",
    name: "Southern Ocean",
    region: "Expedition-based ship observations",
    coords: [-55.0, 45.0],
    established: "2004",
    blurb:
      "Annual Southern Ocean expeditions collecting hydrographic, biogeochemical and carbon-flux measurements.",
    parameters: ["CTD profiles", "Chlorophyll-a", "Dissolved oxygen", "pCO₂"],
  },
];

export const weatherSeries = [
  { month: "Jan", maitri: -4, bharati: -2, himadri: -12, himansh: 6 },
  { month: "Feb", maitri: -6, bharati: -4, himadri: -14, himansh: 4 },
  { month: "Mar", maitri: -12, bharati: -9, himadri: -11, himansh: 8 },
  { month: "Apr", maitri: -18, bharati: -14, himadri: -7, himansh: 11 },
  { month: "May", maitri: -22, bharati: -17, himadri: -2, himansh: 14 },
  { month: "Jun", maitri: -25, bharati: -19, himadri: 3, himansh: 16 },
  { month: "Jul", maitri: -27, bharati: -21, himadri: 5, himansh: 15 },
  { month: "Aug", maitri: -26, bharati: -20, himadri: 4, himansh: 14 },
  { month: "Sep", maitri: -23, bharati: -18, himadri: 0, himansh: 12 },
  { month: "Oct", maitri: -17, bharati: -13, himadri: -5, himansh: 10 },
  { month: "Nov", maitri: -9, bharati: -7, himadri: -9, himansh: 9 },
  { month: "Dec", maitri: -3, bharati: -1, himadri: -11, himansh: 7 },
];

export const newsItems = [
  {
    title: "43rd Indian Scientific Expedition to Antarctica sets sail",
    date: "2026-08-24",
    tag: "Expedition",
    excerpt:
      "The summer team departs for Maitri and Bharati with a payload of automatic weather stations and ice-core drilling equipment.",
  },
  {
    title: "Workshop: Polar Data Standards and FAIR Repositories",
    date: "2026-07-11",
    tag: "Workshop",
    excerpt:
      "A three-day hands-on workshop on metadata standards, NetCDF conventions and open publication of cryosphere datasets.",
  },
  {
    title: "Himansh station records earliest melt onset in a decade",
    date: "2026-06-02",
    tag: "Research",
    excerpt:
      "Chandra basin mass-balance stakes show an early transition to melt conditions, consistent with regional warming trends.",
  },
  {
    title: "India and Norway renew Arctic research cooperation",
    date: "2026-04-18",
    tag: "Collaboration",
    excerpt:
      "A renewed memorandum expands joint atmospheric observation campaigns at Ny-Ålesund through 2031.",
  },
  {
    title: "Southern Ocean carbon flux dataset released to the public",
    date: "2026-03-05",
    tag: "Dataset",
    excerpt:
      "Underway pCO₂ observations from three expedition seasons are now downloadable in CSV and NetCDF formats.",
  },
];
