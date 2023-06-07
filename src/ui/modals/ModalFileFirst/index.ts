import { Button, ModalWindowBack } from "../..";

import Block from "../../../utils/Block";
import InputImage from "../../fields/InputImage";
import ProfileController from "../../../controllers/ProfileController";
import template from "./modal-file-first.hbs";

interface ModalFileFirstProps {
    type?: string;
    state: boolean;
    callbackUpload?: () => void;
    errorFile?: boolean;
    errorNeedFile?: boolean;
    isFile?: string;
}

export default class ModalFileFirst extends Block<ModalFileFirstProps> {
    constructor(props: ModalFileFirstProps) {
        super({ type: "div", ...props });
    }

    init() {
        this.children.ModalWindowBack = new ModalWindowBack({
            events: {
                click: () => {
                    this.onCancel();
                },
            },
        });
        this.children.InputImage = new InputImage({
            name: "avatar",
            label: "Выбрать файл на компьютере",
            type: "file",
            accept: "image/*",
        });
        this.children.ButtonClose = new Button({
            label: "Продолжить",
            className: "button button_blue f-normal",
            type: "submit",
            events: {
                click: () => {
                    this.onClose();
                },
            },
        });
        this.children.ButtonSubmit = new Button({
            label: "Поменять",
            className: "button button_blue f-normal",
            type: "submit",
            events: {
                click: () => {
                    const imageFile = (
                        this.children.InputImage as InputImage
                    ).getValue();
                    if (imageFile) {
                        try {
                            let resource = <
                                {
                                    lastModifiedDate?: Date;
                                    name?: string;
                                    size?: number;
                                    type?: "image/*";
                                    webkitRelativePath?: string;
                                }
                            >imageFile.get("avatar");
                            if (resource) {
                                this.props.isFile = resource.name;
                                ProfileController.newAvatar(imageFile);
                            }
                        } catch (error) {
                            console.error(
                                "Ошибка при отправке запроса смены аватара:",
                                error
                            );
                        }
                    }
                },
            },
        });
    }

    onCancel() {
        if (this.props.callbackUpload) {
            this.props.isFile = "";
            this.props.callbackUpload();
        }
    }

    onClose() {
        if (this.props.callbackUpload) {
            this.props.isFile = "";
            this.props.callbackUpload();
        }
    }

    render() {
        return this.compile(template, this.props);
    }
}
