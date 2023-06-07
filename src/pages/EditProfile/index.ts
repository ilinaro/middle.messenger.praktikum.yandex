import ArrowSVG from "./../../assets/icons/ArrowSVG.svg";
import Block from "../../utils/Block";
import { EditProfile } from "../../common";
import { Link } from "../../common/Link";
import template from "./edit-profile.hbs";
import { withStore } from "../../utils/Store";

class EditProfileBase extends Block {
    init() {
        this.children.LinkBack = new Link({
            icon: ArrowSVG,
            className: "link_back",
            to: "/profile",
        });
        this.children.EditProfile = new EditProfile(this.props);
    }

    render() {
        return this.compile(template, this.props);
    }
}

export const EditProfilePage = withStore((state) => state?.user?.data || {})(
    EditProfileBase
);
