import { Button, ModalWindowBack } from '../..'

import Block from '../../../utils/Block'
import template from './modal-file-error.hbs'

interface ModalFileErrorProps {
  type?: string
  state: boolean
  callbackFileErr?: () => void
}

export default class ModalFileError extends Block<ModalFileErrorProps> {
  constructor(props: ModalFileErrorProps) {
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
    this.children.Button = new Button({
      label: 'Поменять',
      className: 'button button_blue f-normal',
      type: 'submit',
      events: {
        click: () => {
          this.onClose()
        },
      },
    })
  }

  onCancel() {
    if (this.props.callbackFileErr) this.props.callbackFileErr()
  }

  onClose() {
    if (this.props.callbackFileErr) this.props.callbackFileErr()
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}
