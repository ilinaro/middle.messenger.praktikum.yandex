import Block from '../../../utils/Block'
import template from './button.hbs'

interface ButtonProps {
  type?: string
  label: string
  className?: string
  svg?: string
  events: {
    click: () => void
  }
}

export default class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super({ type: 'button', ...props })
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}
