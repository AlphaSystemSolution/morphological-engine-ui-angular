export class ArabicLabel {
  constructor(public name: string, public label: string) { }
}

export class ArabicLetter implements ArabicLabel {
  constructor(public name: string, public label: string, public code: string) { }
}

export class NamedTemplate implements ArabicLabel {
  constructor(public name: string, public label: string, public form: string) { }
}

export const buttonRow1: ArabicLetter[] = [
  new ArabicLetter('DDAD', 'ض', 'D'),
  new ArabicLetter('SAD', 'ص', 'S'),
  new ArabicLetter('THA', 'ث', 'v'),
  new ArabicLetter('QAF', 'ق', 'q'),
  new ArabicLetter('FA', 'ف', 'f'),
  new ArabicLetter('GHAIN', 'غ', 'g'),
  new ArabicLetter('AIN', 'ع', 'E'),
  new ArabicLetter('HHA', 'ح', 'H'),
  new ArabicLetter('KHA', 'خ', 'x'),
  new ArabicLetter('HA', 'ه', 'h'),
  new ArabicLetter('JEEM', 'ج', 'j'),
  new ArabicLetter('DAL', 'د', 'd'),
  new ArabicLetter('THAL', 'ذ', '*')
];

export const arabicLetters: ArabicLetter[] = [
  new ArabicLetter('HAMZA', 'ء', '\''),
  new ArabicLetter('ALIF_MADDAH', 'آ', '|'),
  new ArabicLetter('ALIF_HAMZA_ABOVE', 'أ', '>'),
  new ArabicLetter('WAW_HAMZA_ABOVE', 'ؤ', '&'),
  new ArabicLetter('ALIF_HAMZA_BELOW', 'إ', '<'),
  new ArabicLetter('YA_HAMZA_ABOVE', 'ئ', '}'),
  new ArabicLetter('ALIF', 'ا', 'A'),
  new ArabicLetter('BA', 'ب', 'b'),
  new ArabicLetter('TA_MARBUTA', 'ة', 'p'),
  new ArabicLetter('TA', 'ت', 't'),
  // new ArabicLetter('THA', 'ث', 'v'),
  // new ArabicLetter('JEEM', 'ج', 'j'),
  // new ArabicLetter('HHA', 'ح', 'H'),
  // new ArabicLetter('KHA', 'خ', 'x'),
  // new ArabicLetter('DAL', 'د', 'd'),
  // new ArabicLetter('THAL', 'ذ', '*'),
  new ArabicLetter('RA', 'ر', 'r'),
  new ArabicLetter('ZAIN', 'ز', 'z'),
  new ArabicLetter('SEEN', 'س', 's'),
  new ArabicLetter('SHEEN', 'ش', '$'),
  // new ArabicLetter('SAD', 'ص', 'S'),
  // new ArabicLetter('DDAD', 'ض', 'D'),
  new ArabicLetter('TTA', 'ط', 'T'),
  new ArabicLetter('DTHA', 'ظ', 'Z'),
  // new ArabicLetter('AIN', 'ع', 'E'),
  // new ArabicLetter('GHAIN', 'غ', 'g'),
  new ArabicLetter('TATWEEL', 'ـ', '_'),
  // new ArabicLetter('FA', 'ف', 'f'),
  // new ArabicLetter('QAF', 'ق', 'q'),
  new ArabicLetter('KAF', 'ك', 'k'),
  new ArabicLetter('LAM', 'ل', 'l'),
  new ArabicLetter('MEEM', 'م', 'm'),
  new ArabicLetter('NOON', 'ن', 'n'),
  // new ArabicLetter('HA', 'ه', 'h'),
  new ArabicLetter('WAW', 'و', 'w'),
  new ArabicLetter('ALIF_MAKSURA', 'ى', 'Y'),
  new ArabicLetter('YA', 'ي', 'y')
];

export const namedTemplates: NamedTemplate[] = [
  new NamedTemplate('FORM_I_CATEGORY_A_GROUP_U_TEMPLATE', 'فَعَلَ يَفْعُلُ', 'I'),
  new NamedTemplate('FORM_I_CATEGORY_A_GROUP_I_TEMPLATE', 'فَعَلَ يَفْعِلُ', 'I'),
  new NamedTemplate('FORM_I_CATEGORY_A_GROUP_A_TEMPLATE', 'فَعَلَ يَفْعَلُ', 'I'),
  new NamedTemplate('FORM_I_CATEGORY_U_TEMPLATE', 'فَعُلَ يَفْعُلُ', 'I'),
  new NamedTemplate('FORM_I_CATEGORY_I_GROUP_A_TEMPLATE', 'فَعِلَ يَفْعَلُ', 'I'),
  new NamedTemplate('FORM_I_CATEGORY_I_GROUP_I_TEMPLATE', 'فَعِلَ يَفْعِلُ', 'I'),
  new NamedTemplate('FORM_II_TEMPLATE', 'فَعَّلَ يُفَعِّلُ', 'II'),
  new NamedTemplate('FORM_III_TEMPLATE', 'فَاعَلَ يُفَاعِلُ', 'III'),
  new NamedTemplate('FORM_IV_TEMPLATE', 'أَفْعَلَ يُفْعِلُ', 'IV'),
  new NamedTemplate('FORM_V_TEMPLATE', 'تَفَعَّلَ يَتَفَعَّلُ', 'V'),
  new NamedTemplate('FORM_VI_TEMPLATE', 'تَفَاعَلَ يَتَفَاعَلُ', 'VI'),
  new NamedTemplate('FORM_VII_TEMPLATE', 'إِنْفَعَلَ يَنْفَعِلُ', 'VII'),
  new NamedTemplate('FORM_VIII_TEMPLATE', 'إِفْتَعَلَ يَفْتَعِلُ', 'VIII'),
  new NamedTemplate('FORM_IX_TEMPLATE', 'إِفْعَلَّ يَفْعَلَّ', 'IX'),
  new NamedTemplate('FORM_X_TEMPLATE', 'إِسْتَفْعَلَ يَسْتَفْعِلُ', 'X')
];
