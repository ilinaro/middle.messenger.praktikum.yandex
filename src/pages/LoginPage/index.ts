import { Button, InputLabel } from "../../ui";

import AuthController from "../../controllers/AuthController";
import Block from "../../utils/Block";
import { Link } from "../../common/Link";
import template from "./LoginPage.hbs";

export class LoginPage extends Block {
    constructor() {
        super({});
    }

    componentDidMount(): void {
        console.log("This page Login");
    }

    init() {
        this.children.Login = new InputLabel({
            id: "login",
            name: "login",
            type: "text",
            maxLength: "40",
            placeholder: "Логин",
            label: "Логин",
            className: "text-field__input",
            onBlur: (e: FocusEvent) => {
                const element: string = (e.target as HTMLInputElement).value;
                console.log(element);
            },
        });
        this.children.Password = new InputLabel({
            id: "password",
            name: "password",
            type: "password",
            maxLength: "40",
            placeholder: "Пароль",
            label: "Пароль",
            className: "text-field__input",
            onBlur: (e: FocusEvent) => {
                const element: string = (e.target as HTMLInputElement).value;
                console.log(element);
            },
        });
        this.children.ButtonLogin = new Button({
            className: "button button_blue f-normal",
            label: "Авторизоваться",
            type: "submit",
            events: {
                click: () => {
                    this.onSubmit();
                },
            },
        });
        this.children.LinkRegistration = new Link({
            label: "Нет аккаунта?",
            className: "f-normal link_white",
            to: "/sign-up",
        });
        this.children.NotFound = new Button({
            label: "404",
            className: "button button_blue f-normal btn-white",
            events: {
                click: () => console.log("notFound"),
            },
        });
        this.children.ErrorServer = new Button({
            label: "500",
            className: "button button_blue f-normal btn-white",
            events: {
                click: () => console.log("errorServer"),
            },
        });
    }
    onSubmit() {
        const login = this.children.Login as InputLabel;
        const password = this.children.Password as InputLabel;
        const data = {
            login: login.getValue(),
            password: password.getValue(),
        };
        if (!!data.login && !!data.password) {
            AuthController.signin(data);
        }
    }

    render() {
        return this.compile(template, { ...this.props });
    }
}
