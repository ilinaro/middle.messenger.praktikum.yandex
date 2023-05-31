import Block from '../../../utils/Block'
import ImageDefaultSVG from '../../../assets/icons/ImageDefaultSVG.svg'
import template from './button-avatar.hbs'
import { withStore } from '../../../utils/Store'

interface ButtonAvatarProps {
  avatar?: string
  defaultAvatar?: SVGElement
  type?: string
  events?: {
    click: () => void
  }
}

 class ButtonAvatar extends Block<ButtonAvatarProps> {
  constructor(props: ButtonAvatarProps) {
    super({
      ...props,
      type: 'button',
      defaultAvatar: ImageDefaultSVG,
    })
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}

const withAvatar = withStore((state) => {
  const userData = state?.user?.data || {}

  return userData
})

export default withAvatar(ButtonAvatar as typeof Block);
