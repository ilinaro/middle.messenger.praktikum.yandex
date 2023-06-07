import Block from "../../../utils/Block";
import template from "./input.hbs";

interface InputProps {
    id?: string;
    name: string;
    className?: string;
    type?: string;
    maxLength?: string;
    placeholder?: string;
    value?: string;
    accept?: string;
    events?: {
        blur?: (e: FocusEvent) => void;
    };
}

export default class Input extends Block<InputProps> {
    constructor(props: InputProps) {
        super({ type: "input", ...props });
    }

    setValue(value: string) {
        return ((this.element as HTMLInputElement).value = value);
    }

    getName() {
        return (this.element as HTMLInputElement).name;
    }

    getValue() {
        return (this.element as HTMLInputElement).value;
    }

    render() {
        return this.compile(template, { ...this.props });
    }
}
