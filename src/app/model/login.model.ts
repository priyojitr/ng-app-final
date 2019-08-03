export class UserLogin {

    constructor(private userId: string, private userPassword: string) { }

    public setUsername(userId: string): void {
        this.userId = userId;
    }

    public setPassword(userPassword: string): void {
        this.userPassword = userPassword;
    }

}
