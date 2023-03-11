import Block from '../../../utils/Block'
import template from './input.hbs'

interface InputProps {
  name: string
  type?: string
  placeholder: string
  id: string
  className: string
  maxLength: string
  events?: {
    blur?: (e: FocusEvent) => void
  }
}

export default class Input extends Block<InputProps> {
  constructor(props: InputProps) {
    super({ type: 'input', ...props })
  }

  setValue(value: string) {
    return ((this.element as HTMLInputElement).value = value)
  }

  getName() {
    return (this.element as HTMLInputElement).name
  }

  getValue() {
    return (this.element as HTMLInputElement).value
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}
