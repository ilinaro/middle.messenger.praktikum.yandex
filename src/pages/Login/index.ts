import { Button, InputLabel } from '../../ui'

import Block from '../../utils/Block'
import { renderDOM } from '../../renderDOM'
import template from './login.hbs'

export class LoginPage extends Block {
  constructor() {
    super({})
  }

  _componentDidMount(): void {
    console.log('This page Login')
  }

  init() {
    this.children.Login = new InputLabel({
      id: 'login',
      name: 'login',
      type: 'text',
      maxLength: '40',
      placeholder: 'Логин',
      label: 'Логин',
      className: "text-field__input",
      onBlur: (e: FocusEvent) => {
        const element: string = (e.target as HTMLInputElement).value
        console.log(element)
      },
    })
    this.children.Password = new InputLabel({
      id: 'password',
      name: 'password',
      type: 'password',
      maxLength: '40',
      placeholder: 'Пароль',
      label: 'Пароль',
      className: "text-field__input",
      onBlur: (e: FocusEvent) => {
        const element: string = (e.target as HTMLInputElement).value
        console.log(element)
      },
    })
    this.children.ButtonLogin = new Button({
      className: 'button button_blue f-normal',
      label: 'Авторизоваться',
      type: 'submit',
      events: {
        click: () => {
          this.onSubmit()
        },
      },
    })
    this.children.ButtonNextRegistration = new Button({
      label: 'Нет аккаунта?',
      className: 'button button_blue f-normal btn-white',
      events: {
        click: () => this.onRegistration(),
      },
    })
    this.children.NotFound = new Button({
      label: '404',
      className: 'button button_blue f-normal btn-white',
      events: {
        click: () => renderDOM('notFound'),
      },
    })
    this.children.ErrorServer = new Button({
      label: '500',
      className: 'button button_blue f-normal btn-white',
      events: {
        click: () => renderDOM('errorServer'),
      },
    })
  }
  onSubmit() {
    const login = this.children.Login as InputLabel
    const password = this.children.Password as InputLabel
    const data = {
      login: login.getValue(),
      password: password.getValue(),
    }
    if (!!data.login && !!data.password) {
      renderDOM('message')
    }
  }
  onRegistration() {
    renderDOM('registration')
  }
  render() {
    return this.compile(template, { ...this.props })
  }
}
