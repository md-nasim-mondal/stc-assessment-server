import { config } from "../../../config";
import { prisma } from "../../../shared/prisma";
import {
    createToken,
    verifyToken,
} from "../../../helpers/jwtHelpers";

const loginUser = async (payload: any) => {
    const { email, password } = payload;
    const isUserExist = await prisma.users.findUnique({
        where: {
            email
        }
    });

    if (!isUserExist) {
        throw new Error("User does not exist");
    }

    if (password !== isUserExist.password) {
        throw new Error("Password does not match");
    }

    // create access token & refresh token
    const { id: userId, role } = isUserExist;
    const accessToken = createToken(
        { userId, role },
        config.jwt.JWT_SECRET as string,
        config.jwt.ACCESS_TOKEN_EXPIRES_IN as string
    );

    const refreshToken = createToken(
        { userId, role },
        config.jwt.REFRESH_TOKEN_SECRET as string,
        config.jwt.REFRESH_TOKEN_EXPIRES_IN as string
    );

    return {
        accessToken,
        refreshToken,
    };
};

const refreshToken = async (token: string) => {
    let verifiedToken = null;
    try {
        verifiedToken = verifyToken(
            token,
            config.jwt.REFRESH_TOKEN_SECRET as string
        );
    } catch (err) {
        throw new Error("Invalid Refresh Token");
    }

    const { userId } = verifiedToken;

    const isUserExist = await prisma.users.findUnique({
        where: {
            id: userId,
        },
    });

    if (!isUserExist) {
        throw new Error("User does not exist");
    }

    // generate new token
    const newAccessToken = createToken(
        { userId: isUserExist.id, role: isUserExist.role },
        config.jwt.JWT_SECRET as string,
        config.jwt.ACCESS_TOKEN_EXPIRES_IN as string
    );

    return {
        accessToken: newAccessToken,
        refreshToken: token,
    };
};

export const AuthService = {
    loginUser,
    refreshToken
}
