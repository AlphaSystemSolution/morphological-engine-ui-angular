export class ArabicLabel {
  constructor(public name: string, public label: string, public code: string) { }
}

export class ArabicLetter implements ArabicLabel {
  constructor(public name: string, public label: string, public code: string) { }
}

export class NamedTemplate implements ArabicLabel {
  constructor(public name: string, public label: string, public code: string) { }
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
  new ArabicLetter('SPACE', ' ', 'C') // 28
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
