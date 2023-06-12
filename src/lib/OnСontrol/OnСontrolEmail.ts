import AbsctractValidator from './Interface/AbstractValidator';

export default class OnСontrolEmail extends AbsctractValidator {
  REGEX = /^[\w-.]+@[\w-]+\.[a-z]{2,4}$/i;
  Message = {
    NotCorrect: 'Email имеет некорректный формат',
    NotBlank: 'Поле должно быть заполнено',
  };
}
