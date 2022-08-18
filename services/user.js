import User from '../models/user';

export async function create(userId, name) {
    const newuser = User.build({ name, userId });
    return newuser.save();
}

export async function all() {
    return User.findAll();
}
