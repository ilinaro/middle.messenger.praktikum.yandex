import Block from '../../utils/Block'
import template from './contact-message.hbs'

interface ContactMessageProps {
  type?: string
  time?: string
  contact_msg?: string
}

export default class ContactMessage extends Block<ContactMessageProps> {
  constructor(props: ContactMessageProps) {
    super({ type: 'div', ...props })
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}
