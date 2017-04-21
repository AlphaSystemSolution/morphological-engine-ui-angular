export class RootLetters {
  public id: string;
  public displayName: string;
  public firstRadical: string;
  public secondRadical: string;
  public thirdRadical: string;
  public fourthRadical: string;
  public name: string;
  public empty: string;

  get label(): string {
    return this.firstRadical + this.secondRadical + this.thirdRadical;
  }
}

export class ChartMode {
  constructor(public template: string, public rootType: string, public verbType: string, public weakVerbType: string) { }
}

export class ConjugationHeader {
  constructor(public rootLetters: RootLetters, public chartMode: ChartMode, public baseWord: string, public pastTenseRoot: string,
    public presentTenseRoot: string, public translation: string, public title: string, public typeLabel1: string,
    public typeLabel2: string, public typeLabel3: string) { }
}
