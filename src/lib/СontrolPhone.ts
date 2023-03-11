import Block from '../utils/Block'
import PhoneValidator from './OnСontrol/OnСontrolPhone'
import Сontrol from './Сontrol'

export default class СontrolPhone extends Сontrol {
  static check(phone: string, component: Block): boolean {
    return Сontrol.validate(new PhoneValidator(phone), phone, component)
  }
}
