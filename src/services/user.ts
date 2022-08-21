import User from '../models/user.model';

export async function create(userName: string, name: string) {
    const newuser = User.build({ name, userName });

    return newuser.save();
}

export async function all() {
    return User.findAll();
}
