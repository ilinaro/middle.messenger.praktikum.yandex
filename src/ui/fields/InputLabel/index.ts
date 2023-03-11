import Block from '../../../utils/Block'
import Input from '../Input'
import template from './input-label.hbs'

interface InputLabelProps {
  name: string
  type?: string
  placeholder: string
  id: string
  className: string
  maxLength: string
  label: string
  error?: string
  onBlur?: (e: FocusEvent) => void
  events?: {
    blur?: (e: FocusEvent) => void
  }
}

export default class InputLabel extends Block<InputLabelProps> {
  constructor(props: InputLabelProps) {
    super({ type: 'input', ...props })
  }

  init() {
    let props = this.props

    if (this.props.onBlur) {
      props = {
        ...props,
        events: {
          blur: (e: FocusEvent) => this.props.onBlur!(e),
        },
      }
    }

    this.children.Input = new Input(props)
  }

  setValue(value: string) {
    return ((this.element as HTMLInputElement).value = value)
  }

  getValue(): string {
    const input = (this.children.Input as Input).element as HTMLInputElement
    return input.value
  }

  getName(): string {
    const input = (this.children.Input as Input).element as HTMLInputElement
    return input.value
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}
