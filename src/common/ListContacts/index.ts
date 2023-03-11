import Block from '../../utils/Block'
import CONTACTS from '../../mock/contacts.json'
import { Contact } from '../'
import template from './list-contacts.hbs'

interface ListContactsProps {
  type?: string
}

export default class ListContacts extends Block<ListContactsProps> {
  constructor(props: ListContactsProps) {
    super({ type: 'div', ...props })
  }

  init() {
    let contacts: Block[] = []
    CONTACTS.map((item: { [key: string]: any }) => {
      const contact = new Contact({
        ...item,
        events: {
          click: () => {
            console.log(item.id)
          },
        },
      })
      contacts.push(contact)
    })
    this.children.Contacts = contacts
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}
