interface ICreateUserDTO {
    id?: string;
    name: string;
    email: string;
    isAdmin: boolean;
    password: string;
    created_at?: Date
    updated_at?: Date
}
export { ICreateUserDTO };