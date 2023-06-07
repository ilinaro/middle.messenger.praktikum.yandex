import Block from "../../utils/Block";
import template from "./read-message.hbs";

export default class ReadMessage extends Block {
    constructor(props: {}) {
        super(props);
    }

    render() {
        return this.compile(template, this.props);
    }
}
