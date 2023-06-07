import { Button, InputProfile } from "../../ui";
import {
    СontrolEmail,
    СontrolLogin,
    СontrolName,
    СontrolPhone,
} from "../../lib";

import Block from "../../utils/Block";
import ImageEdit from "../ImageEdit";
import ProfileController from "../../controllers/ProfileController";
import { ProfileData } from "../../api/ProfileAPI";
import { User } from "../../api/AuthAPI";
import template from "./edit-profile.hbs";

interface EditProfileProps extends User {
    type: string;
}

export default class EditProfile extends Block<EditProfileProps> {
    constructor(props: EditProfileProps) {
        super({
            ...props,
            type: "div",
        });
    }

    init() {
        this.children.ImageEdit = new ImageEdit({
            avatar: this.props.avatar,
        });
        this.children.InputEmail = new InputProfile({
            type: "text",
            id: "email",
            name: "email",
            className: "input_profile",
            maxLength: "40",
            placeholder: "Почта",
            value: this.props?.email ?? "",
            onBlur: (e: FocusEvent) => {
                СontrolEmail.check(
                    (e.target as HTMLInputElement).value,
                    this.children.InputEmail as InputProfile
                );
            },
        });
        this.children.InputLogin = new InputProfile({
            type: "text",
            id: "login",
            name: "login",
            placeholder: "Логин",
            className: "input_profile",
            maxLength: "40",
            value: this.props?.login ?? "",
            onBlur: (e: FocusEvent) => {
                СontrolLogin.check(
                    (e.target as HTMLInputElement).value,
                    this.children.InputLogin as InputProfile
                );
            },
        });
        this.children.InputFirstName = new InputProfile({
            type: "text",
            id: "first_name",
            name: "first_name",
            placeholder: "Имя",
            className: "input_profile",
            maxLength: "40",
            value: this.props?.first_name ?? "",
            onBlur: (e: FocusEvent) => {
                СontrolName.check(
                    (e.target as HTMLInputElement).value,
                    this.children.InputFirstName as InputProfile
                );
            },
        });

        this.children.InputLastName = new InputProfile({
            type: "text",
            id: "second_name",
            name: "second_name",
            placeholder: "Фамилия",
            className: "input_profile",
            maxLength: "40",
            value: this.props?.second_name,
            onBlur: (e: FocusEvent) => {
                СontrolName.check(
                    (e.target as HTMLInputElement).value,
                    this.children.InputLastName as InputProfile
                );
            },
        });
        this.children.InputDisplayName = new InputProfile({
            type: "text",
            id: "display_name",
            name: "display_name",
            placeholder: "Имя в чате",
            className: "input_profile",
            maxLength: "40",
            value: this.props?.display_name ?? this.props?.first_name,
            onBlur: (e: FocusEvent) => {
                СontrolName.check(
                    (e.target as HTMLInputElement).value,
                    this.children.InputDisplayName as InputProfile
                );
            },
        });
        this.children.InputPhone = new InputProfile({
            type: "text",
            id: "phone",
            name: "phone",
            className: "input_profile",
            maxLength: "16",
            placeholder: "+7(123)123-34-22",
            value: this.props.phone ?? "",
            onBlur: (e: FocusEvent) => {
                СontrolPhone.check(
                    (e.target as HTMLInputElement).value,
                    this.children.InputPhone as InputProfile
                );
            },
        });

        this.children.ButtonProfile = new Button({
            label: "Сохранить",
            className: "button button_blue f-normal",
            events: {
                click: () => this.onSubmit(),
            },
        });
    }

    onSubmit() {
        const email = this.children.InputEmail as InputProfile;
        const login = this.children.InputLogin as InputProfile;
        const firstName = this.children.InputFirstName as InputProfile;
        const secondName = this.children.InputLastName as InputProfile;
        const displayName = this.children.InputDisplayName as InputProfile;
        const phone = this.children.InputPhone as InputProfile;

        let isError: boolean = false;

        const data: ProfileData = {
            email: email.getValue(),
            login: login.getValue(),
            first_name: firstName.getValue(),
            second_name: secondName.getValue(),
            display_name: displayName.getValue(),
            phone: phone.getValue(),
        };

        if (СontrolEmail.check(data.email, email)) {
            isError = true;
        }
        if (СontrolLogin.check(data.login, login)) {
            isError = true;
        }
        if (СontrolName.check(data.first_name, firstName)) {
            isError = true;
        }
        if (СontrolName.check(data.second_name, secondName)) {
            isError = true;
        }
        if (СontrolName.check(data.display_name, displayName)) {
            isError = true;
        }
        if (СontrolPhone.check(data.phone, phone)) {
            isError = true;
        }
        if (isError) {
            return;
        }

        ProfileController.editProfile(data);
    }

    render() {
        return this.compile(template, { ...this.props });
    }
}
