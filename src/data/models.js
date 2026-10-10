/**
 * @typedef {Object} ModelSpec
 * @property {string} label
 * @property {number} value
 * @property {number} decimals
 * @property {string} unit
 */

/**
 * @typedef {Object} Photo
 * @property {string} id the part of the Unsplash URL after "photo-"
 * @property {string} alt
 * @property {string} author
 */

/**
 * @typedef {Object} PorscheModel
 * @property {string} id
 * @property {string} line
 * @property {string} name
 * @property {string} drive
 * @property {string} text
 * @property {ModelSpec[]} specs
 * @property {Photo} photo
 */

/** @type {PorscheModel[]} */
export const MODELS = [
  {
    id: 'gt3',
    line: '911',
    name: 'GT3',
    drive: '4.0-litre flat-six, naturally aspirated',
    text: 'A road car built around a race engine that revs to 9,000 rpm. Still offered with a six-speed manual.',
    specs: [
      { label: 'Power', value: 510, decimals: 0, unit: 'PS' },
      { label: '0–100 km/h', value: 3.4, decimals: 1, unit: 's' },
      { label: 'Top speed', value: 311, decimals: 0, unit: 'km/h' },
    ],
    photo: { id: '1732624697936-8eb03a91979e', alt: 'A black Porsche 911 with a rear wing against a burning sunset', author: 'Jack White' },
  },
  {
    id: 'turbo-s',
    line: '911',
    name: 'Turbo S',
    drive: '3.6-litre twin-turbo flat-six, T-Hybrid',
    text: 'The most powerful production 911 so far. An electric turbocharger means there is no lag left to wait for.',
    specs: [
      { label: 'Power', value: 711, decimals: 0, unit: 'PS' },
      { label: '0–100 km/h', value: 2.5, decimals: 1, unit: 's' },
      { label: 'Top speed', value: 322, decimals: 0, unit: 'km/h' },
    ],
    photo: { id: '1643108239223-e82d41b7be88', alt: 'A grey Porsche 911 Turbo parked on a city street', author: 'Yannic Alexander' },
  },
  {
    id: 'taycan',
    line: 'Taycan',
    name: 'Turbo S',
    drive: 'Two electric motors, all-wheel drive',
    text: 'Porsche’s first electric car, and the quickest of the four. With launch control engaged it puts out up to 700 kW.',
    specs: [
      { label: 'Power', value: 952, decimals: 0, unit: 'PS' },
      { label: '0–100 km/h', value: 2.4, decimals: 1, unit: 's' },
      { label: 'Top speed', value: 260, decimals: 0, unit: 'km/h' },
    ],
    photo: { id: '1695692864721-1641934a4113', alt: 'A bright green Porsche Taycan parked under trees', author: 'Vincent Raine' },
  },
  {
    id: 'gt4-rs',
    line: '718 Cayman',
    name: 'GT4 RS',
    drive: '4.0-litre flat-six behind the driver',
    text: 'The GT3 engine moved to the middle of a smaller car. Air intakes sit right behind your head, and you hear all of it.',
    specs: [
      { label: 'Power', value: 500, decimals: 0, unit: 'PS' },
      { label: '0–100 km/h', value: 3.4, decimals: 1, unit: 's' },
      { label: 'Top speed', value: 315, decimals: 0, unit: 'km/h' },
    ],
    photo: { id: '1699325346504-e6c960f8ae21', alt: 'A red Porsche 718 Cayman in front of a Porsche showroom', author: 'Rico Reynaldi' },
  },
];
