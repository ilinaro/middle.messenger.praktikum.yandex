import Block from '../utils/Block'
import OnСontrolEmail from './OnСontrol/OnСontrolEmail'
import Сontrol from './Сontrol'

export default class СontrolEmail extends Сontrol {
  static check(value: string, component: Block): boolean {
    return Сontrol.validate(new OnСontrolEmail(value), value, component)
  }
}
