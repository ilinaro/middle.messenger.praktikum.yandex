import Block from "../../utils/Block";
import ButtonAvatar from "../../ui/buttons/ButtonAvatar";
import ModalFileFirst from "../../ui/modals/ModalFileFirst";
import template from "./image-edit.hbs";

interface ImageEditProps {
    avatar?: string;
    stateOpen?: boolean;
    stateModalAvatar?: boolean;
    type?: string;
    events?: {
        click: () => void;
    };
}

export default class ImageEdit extends Block<ImageEditProps> {
    constructor(props: ImageEditProps) {
        super({
            ...props,
            type: "button",
            stateModalAvatar: false,
        });
    }

    init() {
        this.children.ButtonAvatar = new ButtonAvatar({
            avatar: this.props?.avatar,
            events: {
                click: () => {
                    this.openModalAvatar(true);
                },
            },
        });
        this.children.ModalFileFirst = new ModalFileFirst({
            state: true,
            errorFile: false,
            errorNeedFile: false,
            isFile: "",
        });
    }

    openModalAvatar(state: boolean) {
        if (state) {
            this.props.stateModalAvatar = state;
            (this.children.ModalFileFirst as ModalFileFirst).setProps({
                state,
                callbackUpload: this.closeModalAvatar,
            });
        }
    }

    closeModalAvatar = () => {
        this.props.stateModalAvatar = false;
        return (this.children.ModalFileFirst as ModalFileFirst).setProps({
            state: false,
        });
    };

    render() {
        return this.compile(template, { ...this.props });
    }
}
