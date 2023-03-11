import Block from '../../../utils/Block'
import template from './modal-window-back.hbs'

interface ModalWindowBackProps {
  type?: string
  events: {
    click: () => void
  }
}

export default class ModalWindowBack extends Block<ModalWindowBackProps> {
  constructor(props: ModalWindowBackProps) {
    super({ type: 'div', ...props })
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}
