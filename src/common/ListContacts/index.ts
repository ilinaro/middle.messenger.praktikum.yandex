import store, { withStore } from '../../utils/Store'

import Block from '../../utils/Block'
import { ChatsData } from '../../api/ChatAPI'
import { Contact } from '../'
import { GuestData } from '../../api/ProfileAPI'
import template from './list-contacts.hbs'

interface ListContactsProps {
  search?: GuestData[]
  selectUserId?: number
}
class ListContacts extends Block<ListContactsProps> {
  constructor(props: ListContactsProps) {
    super({ ...props })
  }

  componentDidUpdate(_oldProps: any, newProps: any): boolean {
    if (newProps.chats) {
      this.children.chats = this.myChats(newProps)
      return true
    }
    return false
  }

  private myChats(props: any) {
    return (
      props.chats &&
      props.chats.map((item: ChatsData) => {
        return new Contact({
          ...item,
          events: {
            click: () => {
              if (props?.selectUserId !== item.id) {
                store.set('selectUser.id', item.id)
              }
            },
          },
        })
      })
    )
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}

const withListContacts = withStore((state) => ({
  chats: [...(state.chats?.data || [])],
  isLoading: state.chats?.isLoading,
  selectUserId: state.selectUser?.id,
}))

export default withListContacts(ListContacts as typeof Block)
