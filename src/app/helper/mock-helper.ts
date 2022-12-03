import { max } from 'rxjs';

export class MockHelper {
  private constructor() {}

  private static readonly wordList: Array<string> = [
    'God',
    'of',
    'War',
    'No',
    "Man's",
    'Sky',
    'New',
    'World',
    'League',
    'Legends',
    'Valorant',
    'Gruntz',
    'Zed',
    'Doom',
    'The',
    'Elder',
    'Scrolls',
    'Skyrim',
    'Minecraft',
    'Sid',
    "Meier's",
    'Civilization',
    'Portal',
    'Magicka',
    'Grand',
    'Theft',
    'Auto',
    'I',
    'II',
    'III',
    'IV',
    'V',
    'Outward',
    'Among',
    'Us',
    'Spore',
    'GRIS',
    "Grimm's",
    'Hollow',
    'The',
    "Begginer's",
    'Guide',
    'Torchlight',
    'Age',
    'Empires',
    'Cities',
    'Skylines',
  ];

  /**
   * Returns a single word based on a dictionary
   * @returns Single world
   */
  public static getWord(): string {
    return this.wordList[this.getInt(0, this.wordList.length - 1)];
  }

  /**
   * Returns a phrase with 'wordsCount' words based on a dictionary
   * @returns Single world
   */
  public static getWords(min: number = 1, max: number = min): string {
    let wordCount = this.getInt(min, max);
    if (wordCount == 1) return this.getWord();

    let phrase: string = '';
    for (let i = 0; i < wordCount; i++) phrase += this.getWord() + ' ';
    return phrase.trim();
  }

  /**
   * Generate an ranged integer number
   * @param minInclusive Minimum value included in range
   * @param maxInclusive Maximum value included in range
   * @returns Generated ranged integer
   */
  public static getInt(minInclusive: number, maxInclusive: number): number {
    if (maxInclusive < minInclusive) maxInclusive = minInclusive;
    if (maxInclusive == minInclusive) return maxInclusive;
    return Math.floor(Math.random() * (maxInclusive - minInclusive + 1) + minInclusive);
  }

  /**
   * Generate a color in hexadecimal
   * @returns Hex color "FFFFFF"
   */
  public static generateColorHEX(): string {
    let red: string = MockHelper.getInt(0, 255).toString(16);
    let green: string = MockHelper.getInt(0, 255).toString(16);
    let blue: string = MockHelper.getInt(0, 255).toString(16);

    if (red.length == 1) red = `0${red}`;
    if (green.length == 1) green = `0${green}`;
    if (blue.length == 1) blue = `0${blue}`;

    return `${red}${green}${blue}`.toUpperCase();
  }

  /**
   * Invert a color.
   * Subtract the color hexadecimal from 'FFFFFF'
   * @param color color as Hexadecimal
   * @returns negative color
   */
  public static generateContrastantColor(color: string): string {
    if (color.length != 6) {
      throw new Error(`Invalid color format. ${color}. Eg: FF00FF`);
    }

    let redNumber: number = 255 - parseInt(color.substring(0, 2), 16);
    redNumber = redNumber < 127 ? Math.round(redNumber / 2) : redNumber * 2;
    redNumber = redNumber > 255 ? 255 : redNumber;

    let greenNumber: number = 255 - parseInt(color.substring(2, 4), 16);
    greenNumber = greenNumber < 127 ? Math.round(greenNumber / 2) : greenNumber * 2;
    greenNumber = greenNumber > 255 ? 255 : greenNumber;

    let blueNumber: number = 255 - parseInt(color.substring(4, 6), 16);
    blueNumber = blueNumber < 127 ? Math.round(blueNumber / 2) : blueNumber * 2;
    blueNumber = blueNumber > 255 ? 255 : blueNumber;

    let redHex: string = redNumber.toString(16);
    let greenHex: string = greenNumber.toString(16);
    let blueHex: string = blueNumber.toString(16);

    if (redHex.length == 1) redHex = `0${redHex}`;
    if (greenHex.length == 1) greenHex = `0${greenHex}`;
    if (blueHex.length == 1) blueHex = `0${blueHex}`;

    return `${redHex}${greenHex}${blueHex}`.toUpperCase();
  }
}
