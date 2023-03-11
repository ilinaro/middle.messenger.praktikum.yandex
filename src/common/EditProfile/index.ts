import { Button, InputProfile } from '../../ui'
import {
  СontrolEmail,
  СontrolLogin,
  СontrolName,
  СontrolPhone,
} from '../../lib'

import Block from '../../utils/Block'
import { renderDOM } from '../../renderDOM'
import template from './edit-profile.hbs'
import user from '../../mock/user.json'

export default class EditProfile extends Block {
  constructor() {
    super({})
  }

  init() {
    this.children.editEmail = new InputProfile({
      type: 'text',
      id: 'email',
      name: 'email',
      className: 'input_profile',
      maxLength: '40',
      placeholder: 'Почта',
      value: user.email,
      onBlur: (e: FocusEvent) => {
        СontrolEmail.check(
          (e.target as HTMLInputElement).value,
          this.children.editEmail as InputProfile,
        )
      },
    })
    this.children.editLogin = new InputProfile({
      type: 'text',
      id: 'login',
      name: 'login',
      placeholder: 'Логин',
      className: 'input_profile',
      maxLength: '40',
      value: user.login,
      onBlur: (e: FocusEvent) => {
        СontrolLogin.check(
          (e.target as HTMLInputElement).value,
          this.children.editLogin as InputProfile,
        )
      },
    })
    this.children.editFirstName = new InputProfile({
      type: 'text',
      id: 'first_name',
      name: 'first_name',
      placeholder: 'Имя',
      className: 'input_profile',
      maxLength: '40',
      value: user.first_name,
      onBlur: (e: FocusEvent) => {
        СontrolName.check(
          (e.target as HTMLInputElement).value,
          this.children.editFirstName as InputProfile,
        )
      },
    })
    this.children.editLastName = new InputProfile({
      type: 'text',
      id: 'second_name',
      name: 'second_name',
      placeholder: 'Фамилия',
      className: 'input_profile',
      maxLength: '40',
      value: user.second_name,
      onBlur: (e: FocusEvent) => {
        СontrolName.check(
          (e.target as HTMLInputElement).value,
          this.children.editLastName as InputProfile,
        )
      },
    })
    this.children.editDisplayName = new InputProfile({
      type: 'text',
      id: 'display_name',
      name: 'display_name',
      placeholder: 'Имя в чате',
      className: 'input_profile',
      maxLength: '40',
      value: user.display_name,
      onBlur: (e: FocusEvent) => {
        СontrolName.check(
          (e.target as HTMLInputElement).value,
          this.children.editDisplayName as InputProfile,
        )
      },
    })
    this.children.editPhone = new InputProfile({
      type: 'text',
      id: 'phone',
      name: 'phone',
      className: 'input_profile',
      maxLength: '40',
      placeholder: '+7(123)123-34-56',
      value: '+7(123)123-34-56',
      onBlur: (e: FocusEvent) => {
        СontrolPhone.check(
          (e.target as HTMLInputElement).value,
          this.children.editPhone as InputProfile,
        )
      },
    })

    this.children.ButtonProfile = new Button({
      label: 'Сохранить',
      className: 'button button_blue f-normal',
      events: {
        click: () => this.onSubmit(),
      },
    })
  }

  onSubmit() {
    const email = this.children.editEmail as InputProfile
    const login = this.children.editLogin as InputProfile
    const firstName = this.children.editFirstName as InputProfile
    const secondName = this.children.editLastName as InputProfile
    const displayName = this.children.editDisplayName as InputProfile
    const phone = this.children.editPhone as InputProfile

    let isError: boolean = false
    
    const data: { [key: string]: string } = {
      email: email.getValue(),
      login: login.getValue(),
      firstName: firstName.getValue(),
      secondName: secondName.getValue(),
      displayName: displayName.getValue(),
      phone: phone.getValue(),
    }

    if (СontrolEmail.check(data.email, email)) {
      isError = true
    }
    if (СontrolLogin.check(data.login, login)) {
      isError = true
    }
    if (СontrolName.check(data.firstName, firstName)) {
      isError = true
    }
    if (СontrolName.check(data.secondName, secondName)) {
      isError = true
    }
    if (СontrolName.check(data.displayName, displayName)) {
      isError = true
    }
    if (СontrolPhone.check(data.phone, phone)) {
      isError = true
    }

    console.log(isError)
    if (isError) {
      return
    }
    
    renderDOM('profile')
  }

  render() {
    return this.compile(template, {...this.props})
  }
}
