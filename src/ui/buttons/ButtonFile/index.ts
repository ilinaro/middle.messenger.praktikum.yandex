import Block from '../../../utils/Block'
import template from './button-file.hbs'

interface ButtonProps {
  type?: string
  label: string
  events: {
    click: () => void
  }
}

export default class ButtonFile extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super({ type: 'button', ...props })
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}
