import { ListContacts, ListSearch } from '../../common'

import ArrowRightSVG from './../../assets/icons/ArrowRightSVG.svg'
import Block from '../../utils/Block'
import ChatController from '../../controllers/ChatController'
import { InputSearch } from '../../ui'
import { Link } from '../../common/Link'
import ProfileController from '../../controllers/ProfileController'
import Room from '../../common/Room'
import template from './message.hbs'

export class MessagePage extends Block {
  private inputTimeout: any
  constructor() {
    super({})
  }

  init() {
    ProfileController.resetSearch()
    ChatController.getChats()
    ProfileController.resetSelect()
    this.children.ListSearch = new ListSearch({})
    this.children.ListContacts = new ListContacts({})
    this.children.CreatChat = new Link({
      to: '/profile',
      label: 'Профиль',
      icon: ArrowRightSVG,
      className: 'button_default',
    })
    this.children.Room = new Room({})
    this.children.InputSearch = new InputSearch({
      id: 'search',
      events: {
        input: (e: Event) => this.onSearch(e),
        keyup: (e: KeyboardEvent) => {
          if (e.key === 'Enter') {
            this.onSearch(e)
          }
        }
      },
    })
  }

  onSearch(e:Event){
    const query = (e.target as HTMLInputElement).value
    clearTimeout(this.inputTimeout)
    this.inputTimeout = setTimeout(() => {
      ProfileController.searchUsers(query)
      ProfileController.resetSelect()
    }, 500);
  }

  render() {
    return this.compile(template, this.props)
  }
}
