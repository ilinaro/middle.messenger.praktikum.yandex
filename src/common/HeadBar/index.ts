import {
  ButtonAdd,
  ButtonMenu,
  ButtonRemove,
  ModalUserAdd,
  ModalUserRemove,
} from '../../ui'

import Block from '../../utils/Block'
import template from './head-bar.hbs'

interface HeadBarProps {
  type?: string
  avatar?: string
  display_name?: string
  stateOpen?: boolean
  stateModalAddUser?: boolean
  stateModalRemoveUser?: boolean
}

export default class HeadBar extends Block<HeadBarProps> {
  constructor(props: HeadBarProps) {
    super({
      type: 'div',
      ...props,
      stateOpen: false,
      stateModalAddUser: false,
      stateModalRemoveUser: false,
    })
  }

  init() {
    this.children.ModalUserAdd = new ModalUserAdd({
      state: false,
    })
    this.children.ModalUserRemove = new ModalUserRemove({
      state: false,
    })
    this.children.ButtonMenu = new ButtonMenu({
      events: {
        click: () => this.openMenu(),
      },
    })
    this.children.ButtonAdd = new ButtonAdd({
      label: 'Добавить пользователя',
      events: {
        click: () => {
          this.openModalAddUser(true)
          console.log('Добавить пользователя')
        },
      },
    })
    this.children.ButtonRemove = new ButtonRemove({
      label: 'Удалить пользователя',
      events: {
        click: () => {
          this.openModalDeleteUser(true)
          console.log('Удалить пользователя')
        },
      },
    })
  }

  openMenu() {
    this.props.stateOpen = !this.props.stateOpen
  }

  openModalAddUser(state: boolean) {
    if (state) {
      this.props.stateModalAddUser = state
      ;(this.children.ModalUserAdd as ModalUserAdd).setProps({
        state,
        callbackAdd: this.closeModalUserAdd,
      })
      this.openMenu()
    }
  }

  closeModalUserAdd = () => {
    this.props.stateModalAddUser = false
    return (this.children.ModalUserAdd as ModalUserAdd).setProps({
      state: false,
    })
  }

  openModalDeleteUser(state: boolean) {
    if (state) {
      this.props.stateModalRemoveUser = state
      ;(this.children.ModalUserRemove as ModalUserRemove).setProps({
        state,
        callbackRemove: this.closeModalUserRemove,
      })
      this.openMenu()
    }
  }

  closeModalUserRemove = () => {
    this.props.stateModalRemoveUser = false
    return (this.children.ModalUserRemove as ModalUserRemove).setProps({
      state: false,
    })
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}
