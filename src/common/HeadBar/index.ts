import { ButtonAdd, ButtonMenu, ButtonRemove } from "../../ui";

import Block from "../../utils/Block";
import ChatController from "../../controllers/ChatController";
import ImageDefaultSVG from "../../assets/icons/ImageDefaultSVG.svg";
import ProfileController from "../../controllers/ProfileController";
import template from "./head-bar.hbs";

interface HeadBarProps {
    userId?: number;
    self?: boolean;
    noself?: boolean;
    selectUserId?: number;
    type?: string;
    avatar?: string;
    login?: string;
    first_name?: string;
    display_name?: string;
    stateOpen?: boolean;
    stateModalAddUser?: boolean;
    stateModalRemoveUser?: boolean;
    defaultAvatar?: SVGElement;
}
export default class HeadBar extends Block<HeadBarProps> {
    constructor(props: HeadBarProps) {
        super({
            type: "div",
            ...props,
            stateOpen: false,
            stateModalAddUser: false,
            stateModalRemoveUser: false,
            defaultAvatar: ImageDefaultSVG,
        });
    }

    init() {
        this.children.ButtonMenu = new ButtonMenu({
            events: {
                click: () => this.openMenu(),
            },
        });
        this.children.ButtonAdd = new ButtonAdd({
            label: "Добавить в чат",
            events: {
                click: () => {
                    this.openMenu();
                    if (this.props?.login && this.props?.selectUserId) {
                        ChatController.addUser(
                            this.props.login,
                            this.props.selectUserId
                        );
                        ProfileController.resetSearch();
                        ProfileController.resetSelect();
                    }
                },
            },
        });
        this.children.ButtonRemove = new ButtonRemove({
            label: "Удалить чат",
            events: {
                click: () => {
                    this.openMenu();
                    if (this.props?.selectUserId) {
                        ChatController.deleteChat(this.props.selectUserId);
                        ProfileController.resetSearch();
                        ProfileController.resetSelect();
                    }
                },
            },
        });
        this.children.ButtonRemoveUser = new ButtonRemove({
            label: "Удалить пользователя",
            events: {
                click: () => {
                    this.openMenu();
                    if (this.props?.selectUserId && this.props?.userId) {
                        ChatController.deleteUserFromChat(
                            this.props.userId,
                            this.props.selectUserId
                        );
                        ProfileController.resetSearch();
                        ProfileController.resetSelect();
                    }
                },
            },
        });
    }

    openMenu() {
        this.props.stateOpen = !this.props.stateOpen;
    }

    render() {
        return this.compile(template, { ...this.props });
    }
}
