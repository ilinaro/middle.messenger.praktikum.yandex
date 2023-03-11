import { Button, InputLabel, ModalWindowBack } from '../..'

import Block from '../../../utils/Block'
import template from './modal-user-add.hbs'

interface ModalUserAddProps {
  type?: string
  state: boolean
  callbackAdd?: () => void
}

export default class ModalUserAdd extends Block<ModalUserAddProps> {
  constructor(props: ModalUserAddProps) {
    super({ type: 'div', ...props })
  }

  init() {
    this.children.ModalWindowBack = new ModalWindowBack({
      events: {
        click: () => {
          this.onCancel()
        },
      },
    })
    this.children.Login = new InputLabel({
      id: 'login',
      name: 'login',
      type: 'text',
      maxLength: '40',
      placeholder: 'Логин',
      label: 'Логин',
      className: "text-field__input",
    })
    this.children.Button = new Button({
      label: 'Добавить',
      className: 'button button_blue f-normal',
      type: 'submit',
      events: {
        click: () => {
          this.onClose()
        },
      },
    })
  }

  onClearInput() {
    let valueClear = (this.children.Login as InputLabel).setValue('')
    return valueClear
  }

  onCancel() {
    if (this.props.callbackAdd) {
      this.onClearInput()
      this.props.callbackAdd()
    }
  }

  onClose() {
    if (this.props.callbackAdd) {
      this.onClearInput()
      this.props.callbackAdd()
    }
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}
