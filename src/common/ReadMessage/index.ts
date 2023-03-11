import { ContactMessage, MyMessage } from '../../common'

import Block from '../../utils/Block'
import template from './read-message.hbs'

interface ReadMessageProps {
  type?: string
}

export default class ReadMessage extends Block<ReadMessageProps> {
  constructor(props: ReadMessageProps) {
    super({ type: 'div', ...props })
  }

  init() {
    this.children.MyMessage = new MyMessage({
      my_msg: 'Круто!',
      time: '12:00',
    })
    this.children.ContactMessage = new ContactMessage({
      time: '11:56',
      contact_msg:
        'Привет! Смотри, тут всплыл интересный кусок лунной космической',
    })
  }
  render() {
    return this.compile(template, { ...this.props })
  }
}
