import { Button, InputProfile } from '../../ui'
import { СontrolPassword, СontrolTwoPassword } from '../../lib'

import Block from '../../utils/Block'
import ImageEdit from '../ImageEdit'
import ProfileController from '../../controllers/ProfileController'
import Router from '../../utils/Router'
import { User } from '../../api/AuthAPI'
import template from './edit-password.hbs'

interface EditPasswordProps extends User {
  type: string
}

export default class EditPassword extends Block<EditPasswordProps> {
  constructor(props: EditPasswordProps) {
    super({
      ...props,
      type: 'div',
    })
  }

  init() {
    this.children.ImageEdit = new ImageEdit({
      avatar: this.props.avatar,
    })
    this.children.oldPassword = new InputProfile({
      type: 'password',
      id: 'oldPassword',
      name: 'phone',
      placeholder: '•••••••••••',
      maxLength: '40',
      className: 'input_profile',
    })
    this.children.newPassword = new InputProfile({
      type: 'password',
      id: 'newPassword',
      name: 'password',
      maxLength: '40',
      className: 'input_profile',
      placeholder: '•••••••••••',
    })
    this.children.newPasswordTwo = new InputProfile({
      type: 'password',
      id: 'newPasswordTwo',
      name: 'newPasswordTwo',
      className: 'input_profile',
      maxLength: '40',
      placeholder: '•••••••••••',
    })
    this.children.buttonSave = new Button({
      label: 'Сохранить',
      className: 'button button_blue f-normal',
      events: {
        click: () => this.onSubmit(),
      },
    })
  }

  onSubmit() {
    const oldPassword = this.children.oldPassword as InputProfile
    const newPassword = this.children.newPassword as InputProfile
    const newPasswordTwo = this.children.newPasswordTwo as InputProfile

    const data = {
      oldPassword: oldPassword.getValue(),
      newPassword: newPassword.getValue(),
    }

    let isError = false

    if (!newPasswordTwo || !data.newPassword || !data.oldPassword) {
      return
    }

    if (СontrolPassword.check(data.newPassword, newPassword)) {
      isError = true
    }

    if (СontrolPassword.check(data.newPassword, newPassword)) {
      isError = true
    }

    if (
      СontrolTwoPassword.check(
        data.newPassword,
        newPasswordTwo.getValue(),
        newPasswordTwo,
      )
    ) {
      isError = true
    }

    if (isError) {
      return
    }
    ProfileController.editPassword(data)
    Router.go('/profile')
  }
  render() {
    return this.compile(template, this.props)
  }
}
