import ArrowSVG from './../../assets/icons/ArrowSVG.svg'
import Block from '../../utils/Block'
import { EditPassword } from '../../common'
import { Link } from '../../common/Link'
import template from './edit-password.hbs'
import { withStore } from '../../utils/Store'

class EditPasswordBase extends Block {
  init() {
    this.children.LinkBack = new Link({
      icon: ArrowSVG,
      className: 'link_back',
      to: '/profile',
    })

    this.children.EditPassword = new EditPassword(this.props)
  }

  render() {
    return this.compile(template, this.props)
  }
}

export const EditPasswordPage = withStore((state) => state?.user?.data || {})(
  EditPasswordBase,
)
