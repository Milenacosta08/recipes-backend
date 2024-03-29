import ICreateUserDTO from "../dtos/ICreateUserDTO";
import User from "../infra/typeorm/entities/user";

export default interface IUsersRepository {
    create(user: ICreateUserDTO): Promise<User>;
    save(user: User): Promise<User>;
    findById(id: string): Promise<User | undefined>;
    findByEmail(email: string): Promise<User | undefined>;
    findAll(): Promise<User[]>;
    getPermission(id: string): Promise<string>;
    delete(id: string): Promise<void>;
}