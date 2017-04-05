import {Document} from './common';

export enum PageOrientation {
  PORTRAIT, LANDSCAPE
}

export class PageOption extends Document {
  private _orientation: string;

  get orientation() {
    return this._orientation;
  }

  set orientation(orientation: string) {
    this._orientation = orientation;
  }
}

export class ChartConfiguration extends Document {

  omitToc = false;
  omitAbbreviatedConjugation = false;
  omitDetailedConjugation = false;
  omitTitle = false;
  omitHeader = false;
  omitSarfTermCaption = false;
  sortDirective = 'NONE';
  sortDirection = 'ASCENDING';
  arabicFontFamily = 'KFGQPC Uthman Taha Naskh';
  translationFontFamily = 'Candara';
  arabicFontSize = 14;
  translationFontSize = 12;
  headingFontSize = 30;
  pageOption: PageOption;

  constructor() {
    super();
    const po = new PageOption();
    po.orientation = PageOrientation[PageOrientation.PORTRAIT];
    this.pageOption = po;
  }
}
