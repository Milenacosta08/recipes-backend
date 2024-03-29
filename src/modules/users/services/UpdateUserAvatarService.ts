import { inject, injectable } from "tsyringe";
import IUsersRepository from "../repositories/IUsersRepository";
import { deleteFile } from "@shared/utils/file";

interface IRequest {
    user_id: string;
    avatar_file: string;
}

@injectable()
class UpdateUserAvatarService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) { }

    public async execute({ user_id, avatar_file }: IRequest): Promise<void> {
        const user = await this.usersRepository.findById(user_id);

        if (user.avatar) {
            await deleteFile(`./tmp/${user.avatar}`);
        }

        Object.assign(user, { avatar: avatar_file });

        await this.usersRepository.create(user);
    }
}

export default UpdateUserAvatarService;