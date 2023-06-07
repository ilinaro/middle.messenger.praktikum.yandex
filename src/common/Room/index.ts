import Block from "../../utils/Block";
import Chat from "../Chat";
import { ChatsData } from "../../api/ChatAPI";
import { GuestData } from "../../api/ProfileAPI";
import template from "./room.hbs";
import { withStore } from "../../utils/Store";

interface CharProps {
    type?: string;
    selectUserId?: number;
    chats?: ChatsData[];
    search?: GuestData[];
}

class Room extends Block<CharProps> {
    constructor(props: CharProps) {
        super({ type: "div", ...props });
    }

    init() {
        this.children.Chat = new Chat({});
    }

    render() {
        return this.compile(template, { ...this.props });
    }
}

const withChats = withStore((state) => {
    return {
        selectUserId: state.selectUser?.id,
    };
});

export default withChats(Room as typeof Block);
