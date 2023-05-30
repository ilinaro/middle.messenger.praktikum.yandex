import Block from '../utils/Block'
import OnСontrolTwoPassword from './OnСontrol/OnСontrolTwoPassword'
import ValidatorInterface from './OnСontrol/Interface/ValidatorInterface'
import Сontrol from './Сontrol'

export default class СontrolTwoPassword extends Сontrol {
  private static validatorName: string = 'OnСontrolTwoPassword'

  static check(
    password: string,
    rePassword: string,
    component: Block,
  ): boolean {
    const passwordValidator: ValidatorInterface = new OnСontrolTwoPassword(
      password,
    )

    if (this.isDisableRender(password, component)) {
      return this.isValid(this.validatorName) ? false : true
    }

    if (this.isEmplty(passwordValidator, component)) {
      this.validates[this.validatorName] = false
      return true
    }

    if (password !== rePassword) {
      this.validates[this.validatorName] = false

      component.setProps({
        error: passwordValidator.Message.NotCorrect,
      })

      return true
    }

    this.validates[this.validatorName] = true

    return this.isNullProps(component)
  }
}
