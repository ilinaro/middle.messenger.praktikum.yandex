import { Button, InputLabel } from '../../ui'
import {
  СontrolEmail,
  СontrolLogin,
  СontrolName,
  СontrolPassword,
  СontrolPhone,
  СontrolTwoPassword,
} from '../../lib'

import Block from '../../utils/Block'
import { renderDOM } from '../../renderDOM'
import template from './registration.hbs'

export class RegistrationPage extends Block {
  constructor() {
    super({})
  }

  init() {
    this.children.InputEmail = new InputLabel({
      id: 'email',
      name: 'email',
      type: 'text',
      maxLength: '40',
      placeholder: 'Почта',
      label: 'Почта',
      className: "text-field__input",
      onBlur: (e: FocusEvent) => {
        СontrolEmail.check(
          (e.target as HTMLInputElement).value,
          this.children.InputEmail as InputLabel,
        )
      },
    })
    this.children.InputLogin = new InputLabel({
      id: 'login',
      name: 'login',
      type: 'text',
      maxLength: '40',
      placeholder: 'Логин',
      label: 'Логин',
      className: "text-field__input",
      onBlur: (e: FocusEvent) => {
        СontrolLogin.check(
          (e.target as HTMLInputElement).value,
          this.children.InputLogin as InputLabel,
        )
      },
    })
    this.children.InputFirstName = new InputLabel({
      id: 'first_name',
      name: 'first_name',
      type: 'text',
      maxLength: '40',
      placeholder: 'Имя',
      label: 'Имя',
      className: "text-field__input",
      onBlur: (e: FocusEvent) => {
        СontrolName.check(
          (e.target as HTMLInputElement).value,
          this.children.InputFirstName as InputLabel,
        )
      },
    })
    this.children.InputSecondName = new InputLabel({
      id: 'second_name',
      name: 'second_name',
      type: 'text',
      maxLength: '40',
      placeholder: 'Фамилия',
      label: 'Фамилия',
      className: "text-field__input",
      onBlur: (e: FocusEvent) => {
        СontrolName.check(
          (e.target as HTMLInputElement).value,
          this.children.InputSecondName as InputLabel,
        )
      },
    })
    this.children.InputPhone = new InputLabel({
      id: 'phone',
      name: 'phone',
      type: 'text',
      maxLength: '40',
      placeholder: 'Телефон',
      label: 'Телефон',
      className: "text-field__input",
      onBlur: (e: FocusEvent) => {
        СontrolPhone.check(
          (e.target as HTMLInputElement).value,
          this.children.InputPhone as InputLabel,
        )
      },
    })
    this.children.NewPassword = new InputLabel({
      id: 'password',
      name: 'password',
      type: 'password',
      maxLength: '40',
      placeholder: 'Пароль',
      label: 'Пароль',
      className: "text-field__input",
      onBlur: (e: FocusEvent) => {
        СontrolPassword.check(
          (e.target as HTMLInputElement).value,
          this.children.NewPassword as InputLabel,
        )
      },
    })
    this.children.NewPasswordTwo = new InputLabel({
      id: 'passwordTwo',
      name: 'passwordTwo',
      type: 'password',
      maxLength: '40',
      placeholder: 'Пароль (еще раз)',
      label: 'Пароль (еще раз)',
      className: "text-field__input",
      onBlur: (e: FocusEvent) => {
        СontrolTwoPassword.check(
          (e.target as HTMLInputElement).value,
          (this.children.NewPassword as InputLabel).getValue(),
          this.children.NewPasswordTwo as InputLabel,
        )
      },
    })
    this.children.ButtonRegistration = new Button({
      label: 'Зарегистрироваться',
      type: 'onsubmit',
      className: 'button button_blue f-normal',
      events: {
        click: () => this.onSubmit(),
      },
    })
    this.children.ButtonNextLogin = new Button({
      label: 'Войти',
      className: 'button button_blue f-normal btn-white',
      events: {
        click: () => this.onLogin(),
      },
    })
  }

  onSubmit() {
    const email = this.children.InputEmail as InputLabel
    const login = this.children.InputLogin as InputLabel
    const firstName = this.children.InputFirstName as InputLabel
    const secondName = this.children.InputSecondName as InputLabel
    const phone = this.children.InputPhone as InputLabel
    const password = this.children.NewPassword as InputLabel
    const passwordTwo = this.children.NewPasswordTwo as InputLabel

    let isError: boolean = false

    const data: { [key: string]: string } = {
      email: email.getValue(),
      login: login.getValue(),
      firstName: firstName.getValue(),
      secondName: secondName.getValue(),
      phone: phone.getValue(),
      password: password.getValue(),
      passwordTwo: passwordTwo.getValue(),
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
    if (СontrolPhone.check(data.phone, phone)) {
      isError = true
    }
    if (СontrolPassword.check(data.password, password)) {
      isError = true
    }
    if (
      СontrolTwoPassword.check(data.password, data.passwordTwo, passwordTwo)
    ) {
      isError = true
    }

    console.log(isError)
    if (isError) {
      return
    }

    renderDOM('message')
  }

  onLogin() {
    renderDOM('login')
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}
