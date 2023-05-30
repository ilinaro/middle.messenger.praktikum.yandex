import ArrowSVG from './../../assets/icons/ArrowSVG.svg'
import Block from '../../utils/Block'
import { BodyProfile } from '../../common'
import { Link } from '../../common/Link'
import ProfileController from '../../controllers/ProfileController'
import template from './profile.hbs'
import { withStore } from '../../utils/Store'

class ProfilePageBase extends Block {
  init() {
    this.children.LinkBack = new Link({
      icon: ArrowSVG,
      className: 'link_back',
      to: '/messenger',
    })
    this.children.BodyProfile = new BodyProfile(this.props)
  }

  render() {
    return this.compile(template, this.props)
  }
}

export const ProfilePage = withStore((state) => {
  const userData = state?.user?.data || {}

  // @ts-ignore
  userData.isLoading = state?.user?.isLoading

  return userData
})(ProfilePageBase)
