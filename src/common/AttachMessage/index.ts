import {
  ButtonAttach,
  ButtonFile,
  ButtonImages,
  ButtonLocations,
} from '../../ui'

import Block from '../../utils/Block'
import template from './attach-message.hbs'

interface AttachMessageProps {
  type?: string
  stateOpen?: boolean
}

export default class AttachMessage extends Block<AttachMessageProps> {
  constructor(props: AttachMessageProps) {
    super({
      type: 'div',
      ...props,
      stateOpen: false,
    })
  }

  init() {
    this.children.ButtonAttach = new ButtonAttach({
      events: {
        click: () => this.openMenu(),
      },
    })
    this.children.ButtonImages = new ButtonImages({
      label: 'Фото или Видео',
      events: {
        click: () => {
          console.log('Фото или Видео')
          this.openMenu()
        },
      },
    })
    this.children.ButtonFile = new ButtonFile({
      label: 'Файл',
      events: {
        click: () => {
          console.log('Файл')
          this.openMenu()
        },
      },
    })
    this.children.ButtonLocations = new ButtonLocations({
      label: 'Локация',
      events: {
        click: () => {
          console.log('Локация')
          this.openMenu()
        },
      },
    })
  }

  openMenu() {
    this.props.stateOpen = !this.props.stateOpen
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}
