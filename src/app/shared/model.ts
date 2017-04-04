import { IdGenerator } from '../utils/IdGenerator';

export class ArabicLabel {
  constructor(public name: string, public label: string, public code: string) { }

  equals(other: ArabicLabel): boolean {
    return (other !== null) && (other.name === this.name);
  }
}

export class ArabicLetter extends ArabicLabel {
  static HAMZA = new ArabicLetter('HAMZA', 'ء', '\'');
  static BA = new ArabicLetter('BA', 'ب', 'b');
  static TA = new ArabicLetter('TA', 'ت', 't');
  static THA = new ArabicLetter('THA', 'ث', 'v');
  static JEEM = new ArabicLetter('JEEM', 'ج', 'j');
  static HHA = new ArabicLetter('HHA', 'ح', 'H');
  static KHA = new ArabicLetter('KHA', 'خ', 'x');
  static DAL = new ArabicLetter('DAL', 'د', 'd');
  static THAL = new ArabicLetter('THAL', 'ذ', '*');
  static RA = new ArabicLetter('RA', 'ر', 'r');
  static ZAIN = new ArabicLetter('ZAIN', 'ز', 'z');
  static SEEN = new ArabicLetter('SEEN', 'س', 's');
  static SHEEN = new ArabicLetter('SHEEN', 'ش', '$');
  static SAD = new ArabicLetter('SAD', 'ص', 'S');
  static DDAD = new ArabicLetter('DDAD', 'ض', 'D');
  static TTA = new ArabicLetter('TTA', 'ط', 'T');
  static DTHA = new ArabicLetter('DTHA', 'ظ', 'Z');
  static AIN = new ArabicLetter('AIN', 'ع', 'E');
  static GHAIN = new ArabicLetter('GHAIN', 'غ', 'g');
  static FA = new ArabicLetter('FA', 'ف', 'f');
  static QAF = new ArabicLetter('QAF', 'ق', 'q');
  static KAF = new ArabicLetter('KAF', 'ك', 'k');
  static LAM = new ArabicLetter('LAM', 'ل', 'l');
  static MEEM = new ArabicLetter('MEEM', 'م', 'm');
  static NOON = new ArabicLetter('NOON', 'ن', 'n');
  static HA = new ArabicLetter('HA', 'ه', 'h');
  static WAW = new ArabicLetter('WAW', 'و', 'w');
  static YA = new ArabicLetter('YA', 'ي', 'y');
  static TATWEEL = new ArabicLetter('TATWEEL', 'ـ', '_');

  constructor(public name: string, public label: string, public code: string) {
    super(name, label, code);
  }
}

export class NamedTemplate extends ArabicLabel {
  constructor(public name: string, public label: string, public code: string) {
    super(name, label, code);
  }
}

export class VerbalNoun extends ArabicLabel {
  constructor(public name: string, public label: string, public code: string) {
    super(name, label, code);
  }
}

export class NounOfPlaceAndTime extends ArabicLabel {
  constructor(public name: string, public label: string, public code: string) {
    super(name, label, code);
  }
}

export class RootLetters {
  constructor(public firstRadical: ArabicLetter, public secondRadical: ArabicLetter, public thirdRadical: ArabicLetter,
    public fourthRadical: ArabicLetter) { }

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

export class ConjugationConfiguration {
  constructor(public removePassiveLine: boolean, public skipRuleProcessing: boolean) { }
}

export class NounStatus extends ArabicLabel {

  static NOMINATIVE: NounStatus = new NounStatus('NOMINATIVE', 'مرفوع', 'Nominative');
  static ACCUSATIVE: NounStatus = new NounStatus('ACCUSATIVE', 'منصوب', 'Accusative');
  static GENITIVE: NounStatus = new NounStatus('GENITIVE', 'مجرور', 'Genitive');

  static VALUES: NumberType[] = [NounStatus.NOMINATIVE, NounStatus.ACCUSATIVE, NounStatus.GENITIVE];

  constructor(public name: string, public label: string, public code: string) {
    super(name, label, code);
  }
}

export class NumberType extends ArabicLabel {

  static SINGULAR: NumberType = new NumberType('SINGULAR', 'مفرد', 'Singular');
  static DUAL: NumberType = new NumberType('PAIR', 'مثنّى', 'Pair');
  static PLURAL: NumberType = new NumberType('PLURAL', 'جمع', 'Plural');

  static VALUES: NumberType[] = [NumberType.SINGULAR, NumberType.DUAL, NumberType.PLURAL];

  constructor(public name: string, public label: string, public code: string) {
    super(name, label, code);
  }
}

export class ConversationType extends ArabicLabel {

  static THIRD_PERSON_MSCULINE: ConversationType = new ConversationType('THIRD_PERSON_MSCULINE', 'مذكر غائب', 'Third Person Masculine');
  static THIRD_PERSON_FEMININE: ConversationType = new ConversationType('THIRD_PERSON_FEMININE', 'مؤنّث غائب', 'Third Person Feminine');
  static SECOND_PERSON_MSCULINE: ConversationType = new ArabicLabel('SECOND_PERSON_MSCULINE', 'مذكر مخاطب', 'Second Person Masculine')
  static SECOND_PERSON_FEMININE: ConversationType = new ArabicLabel('SECOND_PERSON_FEMININE', 'مؤنّث مخاطب', 'Second Person Feminine');
  static FIRST_PERSON: ConversationType = new ArabicLabel('FIRST_PERSON', 'متكلّم', 'First Person')

  constructor(public name: string, public label: string, public code: string) {
    super(name, label, code);
  }
}

export enum DisplayType {
  LABEL_ONLY, CODE_ONLY, LABEL_AND_CODE
}

export const arabicLetters: ArabicLetter[] = [
  ArabicLetter.HAMZA, // 0
  ArabicLetter.BA, // 1
  ArabicLetter.TA, // 2
  ArabicLetter.THA, // 3
  ArabicLetter.JEEM, // 4
  ArabicLetter.HHA, // 5
  ArabicLetter.KHA, // 6
  ArabicLetter.DAL, // 7
  ArabicLetter.THAL, // 8
  ArabicLetter.RA, // 9
  ArabicLetter.ZAIN, // 10
  ArabicLetter.SEEN, // 11
  ArabicLetter.SHEEN, // 12
  ArabicLetter.SAD, // 13
  ArabicLetter.DDAD, // 14
  ArabicLetter.TTA, // 15
  ArabicLetter.DTHA, // 16
  ArabicLetter.AIN, // 17
  ArabicLetter.GHAIN, // 18
  ArabicLetter.FA, // 19
  ArabicLetter.QAF, // 20
  ArabicLetter.KAF, // 21
  ArabicLetter.LAM, // 22
  ArabicLetter.MEEM, // 23
  ArabicLetter.NOON, // 24
  ArabicLetter.HA, // 25
  ArabicLetter.WAW, // 26
  ArabicLetter.YA, // 27
  ArabicLetter.TATWEEL, // 28
];

export const namedTemplates: NamedTemplate[] = [
  new NamedTemplate('FORM_I_CATEGORY_A_GROUP_U_TEMPLATE', 'فَعَلَ يَفْعُلُ', 'Family I'),
  new NamedTemplate('FORM_I_CATEGORY_A_GROUP_I_TEMPLATE', 'فَعَلَ يَفْعِلُ', 'Family I'),
  new NamedTemplate('FORM_I_CATEGORY_A_GROUP_A_TEMPLATE', 'فَعَلَ يَفْعَلُ', 'Family I'),
  new NamedTemplate('FORM_I_CATEGORY_U_TEMPLATE', 'فَعُلَ يَفْعُلُ', 'Family I'),
  new NamedTemplate('FORM_I_CATEGORY_I_GROUP_A_TEMPLATE', 'فَعِلَ يَفْعَلُ', 'Family I'),
  new NamedTemplate('FORM_I_CATEGORY_I_GROUP_I_TEMPLATE', 'فَعِلَ يَفْعِلُ', 'Family I'),
  new NamedTemplate('FORM_II_TEMPLATE', 'فَعَّلَ يُفَعِّلُ', 'Family II'),
  new NamedTemplate('FORM_III_TEMPLATE', 'فَاعَلَ يُفَاعِلُ', 'Family III'),
  new NamedTemplate('FORM_IV_TEMPLATE', 'أَفْعَلَ يُفْعِلُ', 'Family IV'),
  new NamedTemplate('FORM_V_TEMPLATE', 'تَفَعَّلَ يَتَفَعَّلُ', 'Family V'),
  new NamedTemplate('FORM_VI_TEMPLATE', 'تَفَاعَلَ يَتَفَاعَلُ', 'Family VI'),
  new NamedTemplate('FORM_VII_TEMPLATE', 'إِنْفَعَلَ يَنْفَعِلُ', 'Family VII'),
  new NamedTemplate('FORM_VIII_TEMPLATE', 'إِفْتَعَلَ يَفْتَعِلُ', 'Family VIII'),
  new NamedTemplate('FORM_IX_TEMPLATE', 'إِفْعَلَّ يَفْعَلَّ', 'Family IX'),
  new NamedTemplate('FORM_X_TEMPLATE', 'إِسْتَفْعَلَ يَسْتَفْعِلُ', 'Family X')
];

export const verbalNounPatterns: VerbalNoun[] = [
  new VerbalNoun('VERBAL_NOUN_V1', 'فَعْلٌ', 'VERBAL_NOUN_V1'), // 0
  new VerbalNoun('VERBAL_NOUN_V2', 'فُعُلٌ', 'VERBAL_NOUN_V2'), // 1
  new VerbalNoun('VERBAL_NOUN_V3', 'فُعْلٌ', 'VERBAL_NOUN_V3'), // 2
  new VerbalNoun('VERBAL_NOUN_V4', 'فَعَلٌ', 'VERBAL_NOUN_V4'), // 3
  new VerbalNoun('VERBAL_NOUN_V5', 'فَعِلٌ', 'VERBAL_NOUN_V5'), // 4
  new VerbalNoun('VERBAL_NOUN_V6', 'فُعَلٌ', 'VERBAL_NOUN_V6'), // 5
  new VerbalNoun('VERBAL_NOUN_V7', 'فِعْلٌ', 'VERBAL_NOUN_V7'), // 6
  new VerbalNoun('VERBAL_NOUN_V8', 'فِعَلٌ', 'VERBAL_NOUN_V8'), // 7
  new VerbalNoun('VERBAL_NOUN_V9', 'فَعْلَةٌ', 'VERBAL_NOUN_V9'), // 8
  new VerbalNoun('VERBAL_NOUN_V10', 'فِعْلَةٌ', 'VERBAL_NOUN_V10'), // 9
  new VerbalNoun('VERBAL_NOUN_V11', 'فُعْلَةٌ', 'VERBAL_NOUN_V11'), // 10
  new VerbalNoun('VERBAL_NOUN_V12', 'فَعَلَةٌ', 'VERBAL_NOUN_V12'), // 11
  new VerbalNoun('VERBAL_NOUN_V13', 'فَعِلَةٌ', 'VERBAL_NOUN_V13'), // 12
  new VerbalNoun('VERBAL_NOUN_V14', 'فَعَالَةٌ', 'VERBAL_NOUN_V14'), // 13
  new VerbalNoun('VERBAL_NOUN_V15', 'فِعَالَةٌ', 'VERBAL_NOUN_V15'), // 14
  new VerbalNoun('VERBAL_NOUN_V16', 'فُعُوْلٌ', 'VERBAL_NOUN_V16'), // 15
  new VerbalNoun('VERBAL_NOUN_V17', 'فَعُوْلٌ', 'VERBAL_NOUN_V17'), // 16
  new VerbalNoun('VERBAL_NOUN_V18', 'فَعُوْلَةٌ', 'VERBAL_NOUN_V18'), // 17
  new VerbalNoun('VERBAL_NOUN_V19', 'فَعَالٌ', 'VERBAL_NOUN_V19'), // 18
  new VerbalNoun('VERBAL_NOUN_V20', 'فِعَالٌ', 'VERBAL_NOUN_V20'), // 19
  new VerbalNoun('VERBAL_NOUN_V21', 'فُعَالٌ', 'VERBAL_NOUN_V21'), // 20
  new VerbalNoun('VERBAL_NOUN_V22', 'فِعْلَى', 'VERBAL_NOUN_V22'), // 21
  new VerbalNoun('VERBAL_NOUN_V23', 'فَعْلَى', 'VERBAL_NOUN_V23'), // 22
  new VerbalNoun('VERBAL_NOUN_V24', 'فُعْلَى', 'VERBAL_NOUN_V24'), // 23
  new VerbalNoun('VERBAL_NOUN_V25', 'فَعِيْلٌ', 'VERBAL_NOUN_V25'), // 24
  new VerbalNoun('VERBAL_NOUN_V26', 'فُعْلَانٌ', 'VERBAL_NOUN_V26'), // 25
  new VerbalNoun('VERBAL_NOUN_V27', 'مَفْعَلَةٌ', 'VERBAL_NOUN_V27'), // 26
  new VerbalNoun('VERBAL_NOUN_V28', 'مَفْعِلَةٌ', 'VERBAL_NOUN_V28'), // 27
  new VerbalNoun('VERBAL_NOUN_FORM_II', 'تَفْعِيْلٌ', 'VERBAL_NOUN_FORM_II'), // 28
  new VerbalNoun('VERBAL_NOUN_FORM_II_DEFECTIVE_VERB', 'تَفْعِلَةٌ', 'VERBAL_NOUN_FORM_II_DEFECTIVE_VERB'), // 29
  new VerbalNoun('VERBAL_NOUN_FORM_III_V1', 'فِعَالٌ', 'VERBAL_NOUN_FORM_III_V1'), // 30
  new VerbalNoun('VERBAL_NOUN_FORM_III_V2', 'مُفَاعِلَةٌ', 'VERBAL_NOUN_FORM_III_V2'), // 31
  new VerbalNoun('VERBAL_NOUN_FORM_III_DEFECTIVE_VERB', 'مُفَاعَلَةٌ', 'VERBAL_NOUN_FORM_III_DEFECTIVE_VERB'), // 32
  new VerbalNoun('VERBAL_NOUN_FORM_IV', 'إِفْعَالٌ', 'VERBAL_NOUN_FORM_IV'), // 33
  new VerbalNoun('VERBAL_NOUN_FORM_V', 'تَفَعُّلٌ', 'VERBAL_NOUN_FORM_V'), // 34
  new VerbalNoun('VERBAL_NOUN_FORM_VI', 'تَفَاعُلٌ', 'VERBAL_NOUN_FORM_VI'), // 35
  new VerbalNoun('VERBAL_NOUN_FORM_VII', 'إِنْفِعَالٌ', 'VERBAL_NOUN_FORM_VII'), // 36
  new VerbalNoun('VERBAL_NOUN_FORM_VIII', 'إِفْتِعَالٌ', 'VERBAL_NOUN_FORM_VIII'), // 37
  new VerbalNoun('VERBAL_NOUN_FORM_IX', 'إِفْعِلَالٌ', 'VERBAL_NOUN_FORM_IX'), // 38
  new VerbalNoun('VERBAL_NOUN_FORM_X', 'إِسْتَفْعَالٌ', 'VERBAL_NOUN_FORM_X') // 39
];

export const formITemplates: VerbalNoun[][] = [
  [verbalNounPatterns[0], verbalNounPatterns[1], verbalNounPatterns[3], verbalNounPatterns[4]],
  [verbalNounPatterns[5], verbalNounPatterns[6], verbalNounPatterns[7], verbalNounPatterns[8]],
  [verbalNounPatterns[9], verbalNounPatterns[10], verbalNounPatterns[11], verbalNounPatterns[12]],
  [verbalNounPatterns[13], verbalNounPatterns[14], verbalNounPatterns[26], verbalNounPatterns[27]]
];

export const formIITemplates: VerbalNoun[][] = [
  [verbalNounPatterns[28]]
];

export const formIIITemplates: VerbalNoun[][] = [
  [verbalNounPatterns[30], verbalNounPatterns[31]]
];

export const formIVTemplates: VerbalNoun[][] = [
  [verbalNounPatterns[33]]
];

export const formVTemplates: VerbalNoun[][] = [
  [verbalNounPatterns[34]]
];

export const formVITemplates: VerbalNoun[][] = [
  [verbalNounPatterns[35]]
];

export const formVIITemplates: VerbalNoun[][] = [
  [verbalNounPatterns[36]]
];

export const formVIIITemplates: VerbalNoun[][] = [
  [verbalNounPatterns[37]]
];

export const formIXTemplates: VerbalNoun[][] = [
  [verbalNounPatterns[38]]
];

export const formXTemplates: VerbalNoun[][] = [
  [verbalNounPatterns[39]]
];

export const defaultRootLetters: RootLetters = new RootLetters(arabicLetters[19], arabicLetters[17], arabicLetters[22], arabicLetters[28]);

export const defaultNamedTemplate: NamedTemplate = namedTemplates[0];

export const defaultConjugationConfiguration: ConjugationConfiguration = new ConjugationConfiguration(false, false);

export class MorphologicalInput {

  private _id: string;

  static copy(src: MorphologicalInput, copyId: boolean): MorphologicalInput {
    if (!src) {
      return null;
    }
    const srcRootLetters = src.rootLetters;
    const rootLetters: RootLetters = new RootLetters(srcRootLetters.firstRadical, srcRootLetters.secondRadical,
      srcRootLetters.thirdRadical, srcRootLetters.fourthRadical);
    const srcConjugationConfiguration = src.configuration;
    const conjugationConfiguration: ConjugationConfiguration = new ConjugationConfiguration(srcConjugationConfiguration.removePassiveLine,
      srcConjugationConfiguration.skipRuleProcessing);
    const result: MorphologicalInput = new MorphologicalInput(rootLetters, src.template, src.translation, conjugationConfiguration,
      src.verbalNouns, null);
    if (copyId) {
      result.id = src.id;
    }
    return result;
  }

  constructor(public rootLetters: RootLetters = defaultRootLetters, public template: NamedTemplate = defaultNamedTemplate,
    public translation: string, public configuration: ConjugationConfiguration = defaultConjugationConfiguration,
    public verbalNouns: VerbalNoun[] = [], public nounOfPlaceAndTimes: NounOfPlaceAndTime[] = []) {
    this._id = IdGenerator.nextId();
  }

  get id(): string {
    return this._id;
  }

  set id(id: string) {
    this._id = id;
  }

  get verbalNounsText(): string {
    let result = '';
    if (this.verbalNouns && this.verbalNouns.length > 0) {
      let verbalNoun = this.verbalNouns[0];
      result += verbalNoun.label;
      for (let i = 1; i < this.verbalNouns.length; i++) {
        verbalNoun = this.verbalNouns[i];
        result += ' و ' + verbalNoun.label;
      }
    }
    return result;
  }
}

export const defaultMorphologicalInput: MorphologicalInput = new MorphologicalInput(defaultRootLetters, defaultNamedTemplate, null,
  defaultConjugationConfiguration, [], []);

export class ArabicConstants {
  static PARTICIPLE_PREFIX = new ArabicLabel('PARTICIPLE_PREFIX', 'فهو', 'Participle prefix');
  static IMPERATIVE_PREFIX = new ArabicLabel('IMPERATIVE_PREFIX', 'الأمر منه', 'Imperative prefix');
  static FORBIDDING_PREFIX = new ArabicLabel('FORBIDDING_PREFIX', 'ونهي عنه', 'Forbidding prefix');
  static ADVERBS_PREFIX = new ArabicLabel('ADVERBS_PREFIX', 'والظرف منه', 'Adverbs prefix');
}

export class ConjugationData {
  id = IdGenerator.nextId();
  template: string;
  rootLetters: any;
  configuration: ConjugationConfiguration;
  translation: string;
  verbalNouns: string[];

  private static createRootLetters(src: RootLetters): any {
    const fr: ArabicLetter = src.fourthRadical;
    let fourthRadical = null;
    if (fr !== null && !ArabicLetter.TATWEEL.equals(fr)) {
      fourthRadical = fr.name;
    }
    return {
      firstRadical: src.firstRadical.name, secondRadical: src.secondRadical.name, thirdRadical: src.thirdRadical.name,
      fourthRadical: fourthRadical
    };
  }

  private static createVerbalNouns(verbalNouns: VerbalNoun[]): string[] {
    if (!verbalNouns && verbalNouns.length <= 0) {
      return null;
    }
    const result = [];
    verbalNouns.forEach(vn => result.push(vn.name));
    return result;
  }

  constructor(input: MorphologicalInput) {
    this.template = input.template.name;
    this.translation = input.translation;
    this.configuration = input.configuration;
    this.rootLetters = ConjugationData.createRootLetters(input.rootLetters);
    this.verbalNouns = ConjugationData.createVerbalNouns(input.verbalNouns);
  }
}
