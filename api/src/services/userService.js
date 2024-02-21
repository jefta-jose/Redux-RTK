import { poolRequest, closePool, sql } from '../utils/dbConnect.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const addUserServices = async (newUser) => {
    try {
        // Check if the username or email already exists
        const existingUserCheck = await poolRequest()
            .input('Username', sql.VarChar, newUser.Username)
            .input('Email', sql.VarChar, newUser.Email)
            .query("SELECT COUNT(*) as count FROM tbl_user WHERE Username = @Username OR Email = @Email");

        const existingUserCount = existingUserCheck.recordset[0].count;

        if (existingUserCount > 0) {
            // If username or email already exists, return an error
            return { error: 'Username or Email already taken.' };
        }

        // If the username and email are unique, proceed with adding the user
        const result = await poolRequest()
            .input('Username', sql.VarChar, newUser.Username)
            .input('Email', sql.VarChar, newUser.Email)
            .input('password', sql.VarChar, newUser.password)
            .query("INSERT INTO tbl_user (Username, Email, password) VALUES( @Username, @Email, @password)");

        return result;
    } catch (error) {
        return error;
    }
};

export const loginService = async (username, password) => {
    try {
        const userResult = await poolRequest()
            .input('Username', sql.VarChar, username)
            .query("select * from tbl_user where Username = @Username");
            const user = userResult.recordset[0];
            if (!user) {
            return { "error": 'User not found' };
        } else {
            if (!bcrypt.compare(password, user.password)) {
                return { "error": 'Wrong Credentials' };
            } else {
                let token = `JWT ${jwt.sign({
                    email: user.email,
                    username: user.username,
                    id: user.id
                },
                    `${process.env.JWT_SECRET}`,
                    { expiresIn: "6h" })}`;
                const { UserID, Username, Email } = user;
                return { user: { UserID, Username, Email }, token };
            }
        }
    } catch (error) {
        return { "error": error };
    }
}
export const updateUserService = async (userId, updatedUserData) => {
    try {
        const result = await poolRequest()
            .input('UserID', sql.Int, userId)
            .input('Username', sql.VarChar, updatedUserData.Username)
            .input('Email', sql.VarChar, updatedUserData.Email)
            .query("UPDATE tbl_user SET Username = @Username, Email = @Email WHERE UserID = @UserID");
        return result;
    } catch (error) {
        return error;
    }
}
export const deleteUserService = async (userId) => {
    try {
        const result = await poolRequest()
            .input('UserID', sql.Int, userId)
            .query("DELETE FROM tbl_user WHERE UserID = @UserID");
        return result;
    } catch (error) {
        return error;
    }
}
export const getUserByIdService = async (userId) => {
    try {
        const result = await poolRequest()
            .input('UserID', sql.Int, userId)
            .query("SELECT * FROM tbl_user WHERE UserID = @UserID");
        return result.recordset;
    } catch (error) {
        return error;
    }
}
