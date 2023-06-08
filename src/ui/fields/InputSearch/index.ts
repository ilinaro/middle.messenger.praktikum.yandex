import Block from '../../../utils/Block'
import template from './input-search.hbs'

interface InputProps {
  id: string
  type?: string
  onBlur?: (e: FocusEvent) => void
  events?: {
    input?: (e: Event) => void
    blur?: (e: FocusEvent) => void
    keyup?: (e: KeyboardEvent) => void
  }
}

export default class InputSearch extends Block<InputProps> {
  constructor(props: InputProps) {
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
