import { ArabicLetter } from './arabic-letter';

export class RootLetters {
  constructor(public firstRadical: ArabicLetter = ArabicLetter.FA, public secondRadical: ArabicLetter = ArabicLetter.AIN,
    public thirdRadical: ArabicLetter = ArabicLetter.LAM, public fourthRadical: ArabicLetter = ArabicLetter.TATWEEL) { }

  get label(): string {
    let label = this.firstRadical.label + this.secondRadical.label + this.thirdRadical.label;
    if (this.hasFourthRadical) {
      label += this.fourthRadical.label;
    }
    return label;
  }

  get name(): string {
    let result = this.firstRadical.name + '_' + this.secondRadical.name + '_' + this.thirdRadical.name;
    if (this.hasFourthRadical) {
      result += '_' + this.fourthRadical.name;
    }
    return result;
  }

  get hasFourthRadical(): boolean {
    return this.fourthRadical !== null && this.fourthRadical.name !== 'TATWEEL';
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
