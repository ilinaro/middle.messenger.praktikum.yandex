import Block from '../../../utils/Block'
import template from './button-menu.hbs'

interface ButtonProps {
  type?: string
  events: {
    click: () => void
  }
}

export default class ButtonMenu extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super({ type: 'button', ...props })
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}
