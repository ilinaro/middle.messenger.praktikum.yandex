import Block from '../utils/Block'
import OnСontrolName from './OnСontrol/OnСontrolName'
import Сontrol from './Сontrol'

export default class СontrolName extends Сontrol {
  static check(name: string, component: Block): boolean {
    return Сontrol.validate(new OnСontrolName(name), name, component)
  }
}
