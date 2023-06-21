import Block from '../utils/Block'
import OnСontrolPassword from './OnСontrol/OnСontrolPassword'
import ValidatorInterface from './OnСontrol/Interface/ValidatorInterface'
import Сontrol from './Сontrol'

export default class СontrolPassword extends Сontrol {
  private static validatorName = 'OnСontrolPassword'
  private static minLength = 8
  private static maxLength = 40

  static check(password: string, component: Block): boolean {
    const passwordValidator: ValidatorInterface = new OnСontrolPassword(
      password,
    )

    if (this.isDisableRender(password, component)) {
      return this.isValid(this.validatorName) ? false : true
    }

    if (this.isEmplty(passwordValidator, component)) {
      this.validates[this.validatorName] = false
      return true
    }

    if (password.length <= this.minLength) {
      this.validates[this.validatorName] = false
      component.setProps({
        error: passwordValidator.Message.MinLength,
      })

      return true
    }

    if (password.length > this.maxLength) {
      this.validates[this.validatorName] = false
      component.setProps({
        error: passwordValidator.Message.MaxLength,
      })

      return true
    }

    if (this.isValidate(passwordValidator, component)) {
      this.validates[this.validatorName] = false
      return true
    }

    this.validates[this.validatorName] = true

    return this.isNullProps(component)
  }
}
