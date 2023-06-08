import { Button, InputLabel, ModalWindowBack } from '../..'

import Block from '../../../utils/Block'
import template from './modal-user-remove.hbs'

interface ModalUserRemoveProps {
  type?: string
  state: boolean
  callbackRemove?: () => void
}

export default class ModalUserRemove extends Block<ModalUserRemoveProps> {
  constructor(props: ModalUserRemoveProps) {
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
      label: 'Удалить',
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
    if (this.props.callbackRemove) {
      this.props.callbackRemove()
      this.onClearInput()
    }
  }

  onClose() {
    if (this.props.callbackRemove) {
      this.props.callbackRemove()
      this.onClearInput()
    }
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}
