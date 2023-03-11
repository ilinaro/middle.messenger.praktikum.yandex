import { Button, ModalWindowBack } from '../..'

import Block from '../../../utils/Block'
import template from './modal-file-upload.hbs'

interface ModalFileUploadProps {
  type?: string
  state: boolean
  callbackUpload?: () => void
}

export default class ModalFileUpload extends Block<ModalFileUploadProps> {
  constructor(props: ModalFileUploadProps) {
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
    if (this.props.callbackUpload) this.props.callbackUpload()
  }

  onClose() {
    if (this.props.callbackUpload) this.props.callbackUpload()
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}
