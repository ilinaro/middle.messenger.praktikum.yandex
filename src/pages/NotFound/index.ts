import Block from '../../utils/Block'
import { Button } from '../../ui'
import template from './404.hbs'

export class NotFoundPage extends Block {
  constructor() {
    super({})
  }

  init() {
    this.children.buttonBack = new Button({
      label: 'Назад к чатам',
      className: 'button button_blue f-normal btn-white',
      events: {
        click: () =>  console.log('login'),
      },
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}
