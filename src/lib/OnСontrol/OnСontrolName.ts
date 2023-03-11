import AbsctractValidator from './Interface/AbstractValidator'

export default class OnСontrolName extends AbsctractValidator {
  REGEX: RegExp = /^[a-zA-Zа-яА-Я-]+$/

  Message = {
    NotBlank: `Поле должно быть заполнено`,
    NotCorrect: `Поле имеет недопустимые символы`,
  }
}
