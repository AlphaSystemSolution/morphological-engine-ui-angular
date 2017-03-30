export class ArabicLabel {
  constructor(public name: string, public label: string, public code: string) { }
}

export class ArabicLetter implements ArabicLabel {
  constructor(public name: string, public label: string, public code: string) { }
}

export class NamedTemplate implements ArabicLabel {
  constructor(public name: string, public label: string, public code: string) { }
}

export class VerbalNoun implements ArabicLabel {
  constructor(public name: string, public label: string, public code: string) { }
}

export class NounOfPlaceAndTime implements ArabicLabel {
  constructor(public name: string, public label: string, public code: string) { }
}

export class RootLetters {
  constructor(public firstRadical: ArabicLetter, public secondRadical: ArabicLetter, public thirdRadical: ArabicLetter,
    public fourthRadical: ArabicLetter) { }
}

export class ConjugationConfiguration {
  constructor(public removePassiveLine: boolean, public skipRuleProcessing: boolean) { }
}

export enum DisplayType {
  LABEL_ONLY, CODE_ONLY, LABEL_AND_CODE
}

export const arabicLetters: ArabicLetter[] = [
  new ArabicLetter('HAMZA', 'ء', '\''), // 0
  new ArabicLetter('BA', 'ب', 'b'), // 1
  new ArabicLetter('TA', 'ت', 't'), // 2
  new ArabicLetter('THA', 'ث', 'v'), // 3
  new ArabicLetter('JEEM', 'ج', 'j'), // 4
  new ArabicLetter('HHA', 'ح', 'H'), // 5
  new ArabicLetter('KHA', 'خ', 'x'), // 6
  new ArabicLetter('DAL', 'د', 'd'), // 7
  new ArabicLetter('THAL', 'ذ', '*'), // 8
  new ArabicLetter('RA', 'ر', 'r'), // 9
  new ArabicLetter('ZAIN', 'ز', 'z'), // 10
  new ArabicLetter('SEEN', 'س', 's'), // 11
  new ArabicLetter('SHEEN', 'ش', '$'), // 12
  new ArabicLetter('SAD', 'ص', 'S'), // 13
  new ArabicLetter('DDAD', 'ض', 'D'), // 14
  new ArabicLetter('TTA', 'ط', 'T'), // 15
  new ArabicLetter('DTHA', 'ظ', 'Z'), // 16
  new ArabicLetter('AIN', 'ع', 'E'), // 17
  new ArabicLetter('GHAIN', 'غ', 'g'), // 18
  new ArabicLetter('FA', 'ف', 'f'), // 19
  new ArabicLetter('QAF', 'ق', 'q'), // 20
  new ArabicLetter('KAF', 'ك', 'k'), // 21
  new ArabicLetter('LAM', 'ل', 'l'), // 22
  new ArabicLetter('MEEM', 'م', 'm'), // 23
  new ArabicLetter('NOON', 'ن', 'n'), // 24
  new ArabicLetter('HA', 'ه', 'h'), // 25
  new ArabicLetter('WAW', 'و', 'w'), // 26
  new ArabicLetter('YA', 'ي', 'y'), // 27
  new ArabicLetter('TATWEEL', 'ـ', '_') // 28
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

export const verbalNouns: VerbalNoun[] = [
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
  [verbalNouns[0], verbalNouns[1], verbalNouns[3], verbalNouns[4]],
  [verbalNouns[5], verbalNouns[6], verbalNouns[7], verbalNouns[8]],
  [verbalNouns[9], verbalNouns[10], verbalNouns[11], verbalNouns[12]],
  [verbalNouns[13], verbalNouns[14], verbalNouns[26], verbalNouns[27]]
];

export const formIITemplates: VerbalNoun[][] = [
  [verbalNouns[28]]
];

export const formIIITemplates: VerbalNoun[][] = [
  [verbalNouns[30], verbalNouns[31]]
];

export const formIVTemplates: VerbalNoun[][] = [
  [verbalNouns[33]]
];

export const formVTemplates: VerbalNoun[][] = [
  [verbalNouns[34]]
];

export const formVITemplates: VerbalNoun[][] = [
  [verbalNouns[35]]
];

export const formVIITemplates: VerbalNoun[][] = [
  [verbalNouns[36]]
];

export const formVIIITemplates: VerbalNoun[][] = [
  [verbalNouns[37]]
];

export const formIXTemplates: VerbalNoun[][] = [
  [verbalNouns[38]]
];

export const formXTemplates: VerbalNoun[][] = [
  [verbalNouns[39]]
];

export const defaultRootLetters: RootLetters = new RootLetters(arabicLetters[19], arabicLetters[17], arabicLetters[22], arabicLetters[28]);

export const defaultNamedTemplate: NamedTemplate = namedTemplates[0];

export const defaultConjugationConfiguration: ConjugationConfiguration = new ConjugationConfiguration(false, false);

export class MorphologicalInput {
  constructor(public rootLetters: RootLetters = defaultRootLetters, public template: NamedTemplate = defaultNamedTemplate,
    public translation: string, public conjugationConfiguration: ConjugationConfiguration = defaultConjugationConfiguration,
    public verbalNouns: VerbalNoun[] = [], public nounOfPlaceAndTimes: NounOfPlaceAndTime[] = []) { }
}

export const defaultMorphologicalInput: MorphologicalInput = new MorphologicalInput(defaultRootLetters, defaultNamedTemplate, null,
  defaultConjugationConfiguration, [], []);
