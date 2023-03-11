import Block from '../../utils/Block'
import template from './my-message.hbs'

interface MyMessageProps {
  type?: string
  time?: string
  my_msg?: string
}

export default class MyMessage extends Block<MyMessageProps> {
  constructor(props: MyMessageProps) {
    super({ type: 'div', ...props })
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}
