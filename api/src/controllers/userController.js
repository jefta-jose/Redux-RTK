import { userValidator, userLoginValidator, updateUserValidator } from '../validators/userValidator.js';
import { addUserServices, loginService, getUserByIdService, deleteUserService, updateUserService } from '../services/userService.js';
import { hashPassword, sendServerError, sendCreated, sendDeleteSuccess,sendNotFound } from '../helper/helperFunctions.js';

const checkUser = async (req) => {
    const userId = Number(req.params.id);
    const user = await getUserByIdService(userId);
        if (user.length == 0 || user.message) {
           return false;
        } else {
            return true;
        }
}

export const registerUser = async (req, res) => {
    const { Username, Email, password } = req.body;
    const { error } = userValidator(req.body);
    
    if (error) {
        return res.status(400).send(error.details[0].message);
    } else {
        try {
            const newUser = { Username, Email, password: await hashPassword(password) };
            const response = await addUserServices(newUser);
    
            if (response.error) {
                // If there's an error, return a response indicating that the username or email is already taken
                return res.status(400).send(response.error);
            } else {
                // If there's no error, send a success message
                sendCreated(res, 'User created successfully');
            }
        } catch (error) {
            // Handle other errors (e.g., database connection issues, etc.)
            sendServerError(res, error.message);
        }
    }
    
}

export const loginUser = async (req, res) => {
    try {
        const { Username, password } = req.body;
        const { error } = userLoginValidator(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        const user = await loginService(Username, password);
        if (user.error) {
            return res.status(400).send(user.error);
        } else {
            return res.status(200).json(user);
        }
    } catch (error) {
        sendServerError(res, response.message);
    }
}

export const getUserById = async (req, res) => {
    try {
        const userId = Number(req.params.id);
        const user = await getUserByIdService(userId);
        if (user.length == 0) {
            return res.status(404).send('User not found');
        }
        const { password, ...rest } = user[0];
        res.status(200).json(rest);
    } catch (error) {
        sendServerError(res, response.message);
    }
}

export const deleteUser = async (req, res) => {
    try {
        const UserID = req.params.id;
        if (await checkUser(req)) {
            const result = await deleteUserService(Number(req.params.id));
            if (result.message) {
                return res.status(500).send({ "error": result.message });
            } else {
                return sendDeleteSuccess(res, 'User deleted successfully');
            }
        } else {
            return sendNotFound(res, 'User not found');
        }

    } catch (error) {
        sendServerError(res, error.message);
    }
}

export const updateUser = async (req, res) => {
    try {
        const userId = Number(req.params.id);
        const { error } = updateUserValidator(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        } else {
            if (await checkUser(req)) {
                const { Username, Email, password } = req.body;
                const updatedUserData = { Username, Email };
                const updateResult = await updateUserService(userId, updatedUserData);
                if (updateResult.message) {
                    return res.status(500).send({ "error": updateResult.message });
                } else {
                    res.status(200).json({ "message": "User updated successfully" });
                }
            } else {
                return sendNotFound(res, 'User not found');
            }
            
        }
       
    } catch (error) {
        sendServerError(res, response.message);
    }
}

