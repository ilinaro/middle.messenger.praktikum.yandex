import AuthController from '../../controllers/AuthController'
import Block from '../../utils/Block'
import { Button } from '../../ui'
import ImageEdit from '../ImageEdit'
import { Link } from '../Link'
import { User } from '../../api/AuthAPI'
import template from './body-profile.hbs'
import { withStore } from '../../utils/Store';

interface BodyProfileProps {
  type?: string
  stateOpen?: boolean
  user?: User
  avatar?: string
  callbackOpenModal?: () => void
}

class BodyProfileBase extends Block<BodyProfileProps> {
  constructor(props: BodyProfileProps) {
    super({
      type: 'div',
      ...props,
      stateOpen: false,
    })
  }
  
  init() {
    this.children.ImageEdit = new ImageEdit({
      avatar: this.props.avatar
    })
    this.children.LinkEditProfile = new Link({
      label: 'Изменить данные',
      className: 'btn-edit',
      to: '/settings/edit-profile',
    })
    this.children.LinkEditPassword = new Link({
      label: 'Изменить пароль',
      className: 'btn-edit',
      to: '/settings/edit-password',
    })
    this.children.ButtonExit = new Button({
      label: 'Выйти',
      className: 'btn-exit',
      events: {
        click: () => {
          AuthController.logout()
        },
      },
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}


const withProfile = withStore((state) => {
  const userData = state?.user?.data || {}

  return userData
})

export default withProfile(BodyProfileBase as typeof Block);
