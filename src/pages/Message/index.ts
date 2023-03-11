import { AttachMessage, HeadBar, ListContacts, ReadMessage } from '../../common'
import {
  ButtonProfile,
  EnterMessage,
  InputMessage,
  InputSearch,
} from '../../ui'

import Block from '../../utils/Block'
import { renderDOM } from '../../renderDOM'
import template from './message.hbs'

export class MessagePage extends Block {
  constructor() {
    super({})
  }

  init() {
    this.children.AttachMessage = new AttachMessage({})
    this.children.ListContacts = new ListContacts({})
    this.children.buttonProfile = new ButtonProfile({
      events: {
        click: () => renderDOM('profile'),
      },
    })
    this.children.HeadBar = new HeadBar({
      avatar: 'https://rg.ru/uploads/images/177/18/63/1000s.jpg',
      display_name: 'Ананас',
    })
    this.children.InputSearch = new InputSearch({
      id: 'search',
    })

    this.children.InputMessage = new InputMessage({
      id: 'message',
    })

    this.children.ReadMessage = new ReadMessage({})

    this.children.EnterMessage = new EnterMessage({
      events: {
        click: () => {
          const input = this.children.InputMessage as InputMessage
          const message = input.getValue()
          input.setValue('')
        },
      },
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}
