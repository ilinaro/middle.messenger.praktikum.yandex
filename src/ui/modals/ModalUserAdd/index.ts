import { Button, InputLabel, ModalWindowBack } from '../..';

import Block from '../../../utils/Block';
import template from './modal-user-add.hbs';
import { СontrolLogin } from '../../../lib';

interface ModalUserAddProps {
  type?: string;
  state: boolean;
  callbackAdd?: () => void;
}

export default class ModalUserAdd extends Block<ModalUserAddProps> {
  constructor(props: ModalUserAddProps) {
    super({ type: 'div', ...props });
  }

  init() {
    this.children.ModalWindowBack = new ModalWindowBack({
      events: {
        click: () => {
          this.onCancel();
        },
      },
    });
    this.children.Login = new InputLabel({
      id: 'login',
      name: 'login',
      type: 'text',
      maxLength: '40',
      placeholder: 'Логин',
      label: 'Логин',
      className: 'text-field__input',
      onBlur: (e: FocusEvent) => {
        СontrolLogin.check(
          (e.target as HTMLInputElement).value,
          this.children.Login as InputLabel
        );
      },
    });

    this.children.Button = new Button({
      label: 'Добавить',
      className: 'button button_blue f-normal',
      type: 'submit',
      events: {
        click: () => {
          this.onSubmit();
        },
      },
    });
  }

  async onSubmit() {
    const newUser = this.children.Login as InputLabel;
    const getNewUser = newUser.getValue();

    let isError = false;

    if (СontrolLogin.check(getNewUser, newUser)) {
      isError = true;
    }

    if (isError) {
      return;
    }
  }

  onClearInput() {
    return (this.children.Login as InputLabel).setValue('');
  }

  onCancel() {
    if (this.props.callbackAdd) {
      this.onClearInput();
      this.props.callbackAdd();
    }
  }

  onClose() {
    if (this.props.callbackAdd) {
      this.onClearInput();
      this.props.callbackAdd();
    }
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
