export class UserModel {
    constructor(
        public id: string,
        public email: string,
        public machine: string,
        public name?: string,
        public lastName?: string,
        public phone?: string,
        public address?: string,
    ){}
}