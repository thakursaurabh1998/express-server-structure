import User from '../models/user';

export async function create(userName, name) {
    const newuser = User.build({ name, userName });
    return newuser.save();
}

export async function all() {
    return User.findAll();
}
