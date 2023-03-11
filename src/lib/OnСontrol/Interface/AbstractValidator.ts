import ValidatorInterface, { MessageType } from './ValidatorInterface'

export default abstract class AbsctractValidator implements ValidatorInterface {
  abstract readonly REGEX: RegExp
  abstract readonly Message: MessageType

  protected fieldName?: string = ''
  public value: string = ''

  constructor(value: string, fieldName?: string) {
    this.value = value
    this.fieldName = fieldName
  }

  empty(): boolean {
    if (this.value.length === 0) {
      return true
    }
    return false
  }

  validate(): boolean {
    if (new RegExp(this.REGEX).test(this.value)) {
      return true
    }
    return false
  }
}
