import Block from '../../../utils/Block'
import template from './button-back.hbs'

interface ButtonProps {
  type?: string
  events: {
    click: () => void
  }
}

export default class ButtonBack extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super({ type: 'button', ...props })
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}
