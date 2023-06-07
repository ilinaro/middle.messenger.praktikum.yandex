import store, { withStore } from "../../utils/Store";

import Block from "../../utils/Block";
import Contact from "../ContactItem";
import { GuestData } from "../../api/ProfileAPI";
import ListContacts from "../ListContacts";
import template from "./list-search.hbs";

interface ListSearchProps {
    search?: GuestData[];
    selectUserId?: number;
}
class ListSearch extends Block<ListSearchProps> {
    constructor(props: ListSearchProps) {
        super({ ...props });
    }

    init() {
        this.children.ListContacts = new ListContacts({});
    }

    componentDidUpdate(_oldProps: any, newProps: any): boolean {
        if (!!newProps.search) {
            this.children.search = this.searchChats(newProps);
            return true;
        }
        return false;
    }

    searchChats(props: any) {
        return (
            props.search &&
            props.search.map((item: { [key: string]: any }) => {
                return new Contact({
                    ...item,
                    events: {
                        click: () => {
                            if (props?.selectUserId !== item.id) {
                                store.set("selectUser.id", item.id);
                            }
                        },
                    },
                });
            })
        );
    }

    render() {
        return this.compile(template, { ...this.props });
    }
}

const withListSearch = withStore((state) => ({
    search: [...(state.search?.data || [])],
    isLoading: state.search?.isLoading,
    selectUserId: state.selectUser?.id,
}));

export default withListSearch(ListSearch as typeof Block);
