import BaseAPI from "./BaseAPI";

export interface ChatsData {
    avatar: string;
    created_by: number;
    id: number;
    title: string;
    last_message: {
        content: string;
        id: number;
        time: string;
        user?: {
            avatar: string;
            display_name: string;
            email: string;
            first_name: string;
            login: string;
            phone: string;
            second_name: string;
            title: string;
            unread_count: number;
        };
    };
}
export class ChatAPI extends BaseAPI {
    constructor() {
        super("/chats");
    }

    createChat(data: { title: string }): Promise<{ id: number }> {
        return this.http.post("/", data);
    }

    getChats(): Promise<ChatsData[]> {
        return this.http.get("/");
    }

    deleteChat(chatId: number) {
        return this.http.delete("/", { chatId });
    }

    deleteUserFromChat(userId: number, chatId: number) {
        return this.http.delete("/users", {
            users: [userId],
            chatId,
        });
    }

    async getToken(id: number): Promise<string> {
        const response = await this.http.post<{ token: string }>(
            `/token/${id}`
        );
        return response.token;
    }

    addUser(userId: number, chatId: number) {
        return this.http.put("/users", {
            users: [userId],
            chatId,
        });
    }

    deleteUser(userId: number, chatId: number) {
        return this.http.delete("/users", {
            users: [userId],
            chatId,
        });
    }

    read = undefined;
    create = undefined;
    update = undefined;
    delete = undefined;
}

export default new ChatAPI();
