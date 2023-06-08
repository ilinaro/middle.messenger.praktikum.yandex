import Block from '../../../utils/Block'
import template from './button-remove.hbs'

interface ButtonProps {
  type?: string
  label: string
  events: {
    click: () => void
  }
}

export default class ButtonRemove extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super({ type: 'button', ...props })
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}
