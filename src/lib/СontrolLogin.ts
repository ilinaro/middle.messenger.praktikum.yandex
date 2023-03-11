import Block from '../utils/Block'
import OnСontrolLogin from './OnСontrol/OnСontrolLogin'
import ValidatorInterface from './OnСontrol/Interface/ValidatorInterface'
import Сontrol from './Сontrol'

export default class СontrolLogin extends Сontrol {
  private static validatorName: string = 'OnСontrolLogin'

  private static minLength: number = 3
  private static maxLength: number = 20

  static check(login: string, component: Block): boolean {
    const loginValidator: ValidatorInterface = new OnСontrolLogin(login)

    if (this.isDisableRender(login, component)) {
      return this.isValid(this.validatorName) ? false : true
    }

    if (this.isEmplty(loginValidator, component)) {
      this.validates[this.validatorName] = false
      return true
    }

    if (login.length <= this.minLength) {
      this.validates[this.validatorName] = false
      component.setProps({
        error: loginValidator.Message.MinLength,
      })
      return true
    }

    if (login.length > this.maxLength) {
      this.validates[this.validatorName] = false
      component.setProps({
        error: loginValidator.Message.MaxLength,
      })
      return true
    }

    if (this.isValidate(loginValidator, component)) {
      this.validates[this.validatorName] = false
      return true
    }

    this.validates[this.validatorName] = true
    return this.isNullProps(component)
  }
}
