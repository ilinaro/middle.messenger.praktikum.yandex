import Block from '../../utils/Block'
import { ChatsData } from '../../api/ChatAPI'
import ImageDefaultSVG from '../../assets/icons/ImageDefaultSVG.svg'
import template from './contact.hbs'
import { withStore } from '../../utils/Store'

interface ContactProps {
  type?: string
  avatar?: string
  defaultAvatar?: SVGElement
  display_name?: string
  message?: string
  date?: string
  count?: number
  events: {
    click: () => void
  }
}

class Contact extends Block<ContactProps & ChatsData> {
  constructor(props: ContactProps & ChatsData) {
    super({
      ...props,
      type: 'div',
      defaultAvatar: ImageDefaultSVG,
    })
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}

const withContact = withStore((state) => ({
  selectUser: state.selectUser,
}))

export default withContact(Contact as typeof Block)
