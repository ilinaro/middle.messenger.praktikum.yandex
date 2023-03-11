import Block from '../../../utils/Block'
import template from './button-profile.hbs'

interface ButtonProps {
  type?: string
  events: {
    click: () => void
  }
}

export default class ButtonProfile extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super({ type: 'div', ...props })
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}
