import Block from '../../../utils/Block'
import template from './input-image.hbs'

interface InputImageProps {
  name: string
  value?: string
  accept?: string
  type?: string

  label?: string
  error?: string
  className?: string

  onBlur?: (e: FocusEvent) => void
  onKeyup?: (e: KeyboardEvent) => void
  events?: {
    blur?: (e: FocusEvent) => void
    keyup?: (e: KeyboardEvent) => void
  }
}

export default class InputImage extends Block<InputImageProps> {
  constructor(props: InputImageProps) {
    super(props)
  }

  getName() {
    const input = this.element as HTMLInputElement
    return input.name
  }

  setValue(value: string) {
    const input = this.element as HTMLInputElement
    return (input.value = value)
  }
  
  getValue() {
    const input = this.element!.querySelector(
      'input',
    ) as HTMLInputElement

    if (input.files && input.files[0]) {
      const formData: FormData = new FormData();
      formData.append('avatar', input.files[0]);
      return formData
    } else return undefined
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

  render() {
    return this.compile(template, { ...this.props })
  }
}
