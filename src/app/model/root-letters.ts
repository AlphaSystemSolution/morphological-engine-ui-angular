import { ArabicLetter } from './arabic-letter';

export class RootLetters {
  constructor(public firstRadical: ArabicLetter = ArabicLetter.FA, public secondRadical: ArabicLetter = ArabicLetter.AIN,
    public thirdRadical: ArabicLetter = ArabicLetter.LAM, public fourthRadical: ArabicLetter = ArabicLetter.TATWEEL) { }

  get label(): string {
    let label = this.firstRadical.label + this.secondRadical.label + this.thirdRadical.label;
    if (this.fourthRadical !== null && this.fourthRadical.name !== 'TATWEEL') {
      label += this.fourthRadical.label;
    }
    return label;
  }

  equals(other: RootLetters): boolean {
    let result = (this.firstRadical.equals(other.firstRadical)) && (this.secondRadical.equals(other.secondRadical))
      && (this.thirdRadical.equals(other.thirdRadical));
    if (this.fourthRadical !== null) {
      result = result && (this.fourthRadical.equals(other.fourthRadical));
    }
    return result;
  }
}
