import { BaseEndpoint } from "./base";
import { PaginationOptions } from "../options/pagination_options";
import {ReducedUser, ReducedUserImpl, User, UserImpl} from "../entities/user";

export const UserPaths = {
    current: '/admin/users/me',
    users: '/admin/users',
    user: '/admin/users/{userId}'
};

export class UserEndpoint extends BaseEndpoint {

    public current(): Promise<User> {
        return this.getResourceWithFields<User>(UserPaths.current, UserImpl);
    }

    public all(paginationOptions: PaginationOptions = {}): Promise<ReducedUser[]> {
        return this.getResourceWithFields<ReducedUser[]>(UserPaths.users, ReducedUserImpl, { params: paginationOptions });
    }

    public byId(userId: string): Promise<User> {
        return this.getResourceWithFields<User>(this.format(UserPaths.user, { userId }), UserImpl);
    }
}
