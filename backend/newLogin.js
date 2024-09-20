import mongoose from 'mongoose';
import start from './Model/app.js';
import loginSchema from './Model/loginSchema.js';

start();
async function newLogin(username, password) {
    const createNewLogin = new loginSchema({
        username: username,
        password: password,
        score: 0
    });

    try {
        await createNewLogin.save();
        return { success: true };
    } catch (error) {
        return { success: false, message: "Username already exists" };
    }
}

async function login(username) {
    const user = await loginSchema.findOne({ username: username });
    return user;
}

async function updateScore(username, pointsToAdd) {
    try {
        const user = await loginSchema.findOne({ username });
        if (user) {
            user.score += pointsToAdd;
            await user.save();
        }
    } catch (error) {
        console.error(error);
    }
}

async function getScore(username) {
    try {
        const user = await loginSchema.findOne({ username });
        if (user) {
            return user.score;
        }
    } catch (error) {
        console.log(error);
    }
}

async function getTopUsers() {
    try {
        const topUsers = await loginSchema.find({}, 'username score')
            .sort({ score: -1 })
            .limit(10);
        
        return topUsers;
    } catch (error) {
        console.error(error);
    }
}

export { newLogin, login, updateScore, getScore, getTopUsers };