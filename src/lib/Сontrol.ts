import Block from '../utils/Block'
import ValidatorInterface from './OnСontrol/Interface/ValidatorInterface'

export default abstract class ValidatorService {
  protected static validates: { [key: string]: boolean } = {}
  private static oldValues: { [key: string]: string } = {}

  static validate(
    validator: ValidatorInterface,
    value: string,
    component: Block,
  ): boolean {
    const validatorName: string = validator.constructor.name

    if (this.isDisableRender(value, component)) {
      return this.isValid(validatorName) ? false : true
    }

    if (
      this.isEmplty(validator, component) ||
      this.isValidate(validator, component)
    ) {
      this.validates[validatorName] = false
      return true
    }

    this.validates[validatorName] = true

    return this.isNullProps(component)
  }

  protected static isEmplty(
    validator: ValidatorInterface,
    component: Block,
  ): boolean {
    if (validator.empty()) {
      component.setProps({
        error: validator.Message.NotBlank,
      })
      return true
    }

    return false
  }

  protected static isValidate(
    validator: ValidatorInterface,
    component: Block,
  ): boolean {
    if (!validator.validate()) {
      component.setProps({
        error: validator.Message.NotCorrect,
      })
      return true
    }

    return false
  }

  protected static isDisableRender(value: string, component: Block): boolean {
    let componentId: string = component.id

    if (this.oldValues[componentId] === value) {
      return true
    }

    this.oldValues[componentId] = value

    return false
  }

  protected static isNullProps(component: Block): boolean {
    const componentProps: any = component.getProps()

    if (componentProps.error === null) {
      return false
    }

    component.setProps({
      error: null,
    })

    return false
  }

  public static isValid(validatorName: string): boolean {
    return this.validates[validatorName] ?? false
  }
}
