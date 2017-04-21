import { ArabicLabel } from './common';

export class SarfTermType extends ArabicLabel {

  static getByName(name: string): SarfTermType {
    let result: SarfTermType;
    switch (name) {
      case 'PAST_TENSE':
        result = new SarfTermType('PAST_TENSE', 'فعل ماضي');
        break;
      case 'PRESENT_TENSE':
        result = new SarfTermType('PRESENT_TENSE', 'فعل مضارع');
        break;
      case 'VERBAL_NOUN':
        result = new SarfTermType('VERBAL_NOUN', 'مصدر');
        break;
      case 'ACTIVE_PARTICIPLE_MASCULINE':
        result = new SarfTermType('ACTIVE_PARTICIPLE_MASCULINE', 'إسم فاعل مذكر');
        break;
      case 'ACTIVE_PARTICIPLE_FEMININE':
        result = new SarfTermType('ACTIVE_PARTICIPLE_FEMININE', 'إسم فاعل مؤنث');
        break;
      case 'PAST_PASSIVE_TENSE':
        result = new SarfTermType('PAST_PASSIVE_TENSE', 'فعل ماضي مبني على المجهول');
        break;
      case 'PRESENT_PASSIVE_TENSE':
        result = new SarfTermType('PRESENT_PASSIVE_TENSE', 'فعل مضارع مبني على المجهول');
        break;
      case 'PASSIVE_PARTICIPLE_MASCULINE':
        result = new SarfTermType('PASSIVE_PARTICIPLE_MASCULINE', 'إسم مفعول مذكر');
        break;
      case 'PASSIVE_PARTICIPLE_FEMININE':
        result = new SarfTermType('PASSIVE_PARTICIPLE_FEMININE', 'إسم مفعول مؤنث');
        break;
      case 'IMPERATIVE':
        result = new SarfTermType('IMPERATIVE', 'أمر');
        break;
      case 'FORBIDDING':
        result = new SarfTermType('FORBIDDING', 'نهي');
        break;
      case 'NOUN_OF_PLACE_AND_TIME':
        result = new SarfTermType('NOUN_OF_PLACE_AND_TIME', 'ظرف');
        break;
    }
    return result;
  }

  constructor(public name: string, public label: string) {
    super(name, label, null);
    this.code = this.name;
  }
}
