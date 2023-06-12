import AbsctractValidator from './Interface/AbstractValidator'

export default class OnСontrolTwoPassword extends AbsctractValidator {
  REGEX = /^/i

  Message = {
    NotBlank: `Поле должно быть заполнено`,
    NotCorrect: 'Пароли не совпадают',
  }
}
