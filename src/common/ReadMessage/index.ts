import Block from '../../utils/Block';
import template from './read-message.hbs';

type Props = {
  content?: string
  time?: string;
  from?: boolean
};

export default class ReadMessage extends Block {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
