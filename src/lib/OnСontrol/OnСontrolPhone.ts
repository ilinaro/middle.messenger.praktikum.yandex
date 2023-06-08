import AbsctractValidator from './Interface/AbstractValidator'

export default class OnСontrolPhone extends AbsctractValidator {
  REGEX: RegExp = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/
  Message = {
    NotCorrect: 'Поле имеет недопустимые символы',
    NotBlank: 'Поле должно быть заполнено',
  }
}
