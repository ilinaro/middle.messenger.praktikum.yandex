import Block from '../../utils/Block'
import template from './contact.hbs'

interface ContactProps {
  type?: string
  avatar?: string
  display_name?: string
  fromMe?: boolean
  message?: string
  date?: string
  count?: number
  events: {
    click: () => void
  }
}

export default class Contact extends Block<ContactProps> {
  constructor(props: ContactProps) {
    super({ type: 'div', ...props })
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}
