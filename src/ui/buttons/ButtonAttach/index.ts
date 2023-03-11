import Block from '../../../utils/Block'
import template from './button-attach.hbs'

interface ButtonAttachProps {
  type?: string
  events: {
    click: () => void
  }
}

export default class ButtonAttach extends Block<ButtonAttachProps> {
  constructor(props: ButtonAttachProps) {
    super({ type: 'svg', ...props })
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}
