import { ArabicLabel } from './common';

export class NamedTemplate extends ArabicLabel {
  static FORM_I_CATEGORY_A_GROUP_U_TEMPLATE = new NamedTemplate('FORM_I_CATEGORY_A_GROUP_U_TEMPLATE', 'فَعَلَ يَفْعُلُ', 'Family I');
  static FORM_I_CATEGORY_A_GROUP_I_TEMPLATE = new NamedTemplate('FORM_I_CATEGORY_A_GROUP_I_TEMPLATE', 'فَعَلَ يَفْعِلُ', 'Family I');
  static FORM_I_CATEGORY_A_GROUP_A_TEMPLATE = new NamedTemplate('FORM_I_CATEGORY_A_GROUP_A_TEMPLATE', 'فَعَلَ يَفْعَلُ', 'Family I');
  static FORM_I_CATEGORY_U_TEMPLATE = new NamedTemplate('FORM_I_CATEGORY_U_TEMPLATE', 'فَعُلَ يَفْعُلُ', 'Family I');
  static FORM_I_CATEGORY_I_GROUP_A_TEMPLATE = new NamedTemplate('FORM_I_CATEGORY_I_GROUP_A_TEMPLATE', 'فَعِلَ يَفْعَلُ', 'Family I');
  static FORM_I_CATEGORY_I_GROUP_I_TEMPLATE = new NamedTemplate('FORM_I_CATEGORY_I_GROUP_I_TEMPLATE', 'فَعِلَ يَفْعِلُ', 'Family I');
  static FORM_II_TEMPLATE = new NamedTemplate('FORM_II_TEMPLATE', 'فَعَّلَ يُفَعِّلُ', 'Family II');
  static FORM_III_TEMPLATE = new NamedTemplate('FORM_III_TEMPLATE', 'فَاعَلَ يُفَاعِلُ', 'Family III');
  static FORM_IV_TEMPLATE = new NamedTemplate('FORM_IV_TEMPLATE', 'أَفْعَلَ يُفْعِلُ', 'Family IV');
  static FORM_V_TEMPLATE = new NamedTemplate('FORM_V_TEMPLATE', 'تَفَعَّلَ يَتَفَعَّلُ', 'Family V');
  static FORM_VI_TEMPLATE = new NamedTemplate('FORM_VI_TEMPLATE', 'تَفَاعَلَ يَتَفَاعَلُ', 'Family VI');
  static FORM_VII_TEMPLATE = new NamedTemplate('FORM_VII_TEMPLATE', 'إِنْفَعَلَ يَنْفَعِلُ', 'Family VII');
  static FORM_VIII_TEMPLATE = new NamedTemplate('FORM_VIII_TEMPLATE', 'إِفْتَعَلَ يَفْتَعِلُ', 'Family VIII');
  static FORM_IX_TEMPLATE = new NamedTemplate('FORM_IX_TEMPLATE', 'إِفْعَلَّ يَفْعَلَّ', 'Family IX');
  static FORM_X_TEMPLATE = new NamedTemplate('FORM_X_TEMPLATE', 'إِسْتَفْعَلَ يَسْتَفْعِلُ', 'Family X');


  static namedTemplates: NamedTemplate[] = [
    NamedTemplate.FORM_I_CATEGORY_A_GROUP_U_TEMPLATE,
    NamedTemplate.FORM_I_CATEGORY_A_GROUP_I_TEMPLATE,
    NamedTemplate.FORM_I_CATEGORY_A_GROUP_A_TEMPLATE,
    NamedTemplate.FORM_I_CATEGORY_U_TEMPLATE,
    NamedTemplate.FORM_I_CATEGORY_I_GROUP_A_TEMPLATE,
    NamedTemplate.FORM_I_CATEGORY_I_GROUP_I_TEMPLATE,
    NamedTemplate.FORM_II_TEMPLATE,
    NamedTemplate.FORM_III_TEMPLATE,
    NamedTemplate.FORM_IV_TEMPLATE,
    NamedTemplate.FORM_V_TEMPLATE,
    NamedTemplate.FORM_VI_TEMPLATE,
    NamedTemplate.FORM_VII_TEMPLATE,
    NamedTemplate.FORM_VIII_TEMPLATE,
    NamedTemplate.FORM_IX_TEMPLATE,
    NamedTemplate.FORM_X_TEMPLATE
  ];

  static getByName(name: string): NamedTemplate {
    const results = NamedTemplate.namedTemplates.filter(al => (al.name === name));
    return (results && results.length > 0) ? results[0] : null;
  }

  constructor(public name: string, public label: string, public code: string) {
    super(name, label, code);
  }
}
