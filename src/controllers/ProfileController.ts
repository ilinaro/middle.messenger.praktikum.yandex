import API, { ProfileAPI, ProfileData } from "../api/ProfileAPI";

import Router from "../utils/Router";
import store from "../utils/Store";

export class ProfileController {
    private readonly api: ProfileAPI;

    constructor() {
        this.api = API;
    }

    async editPassword(data: { oldPassword: string; newPassword: string }) {
        try {
            await this.api.editPassword(data);
        } catch (e) {
            store.set("user.editPassword.error", e);
        }
    }

    async editProfile(data: ProfileData) {
        try {
            const user = await this.api.editProfile(data);
            store.set("user.data", user);
            Router.go("/profile");
        } catch (e) {
            store.set("user.editProfile.error", e);
        }
    }

    async searchUsers(login?: string) {
        if (!login) {
            return this.resetSearch();
        }
        try {
            store.set("search.isLoading", true);
            const search = await this.api.searchUsers(login);
            store.set("search.data", search);
            store.set("search.isLoading", false);
        } catch (e) {
            store.set("search.error", e);
        }
    }

    async newAvatar(data: FormData) {
        try {
            const user = await this.api.newAvatar(data);
            store.set("user.data", user);
        } catch (e) {
            store.set("user.newAvatar.error", e);
        }
    }

    resetSearch() {
        store.set("search.data", undefined);
    }
    resetSelect() {
        store.set("selectUser", undefined);
    }
}

export default new ProfileController();
