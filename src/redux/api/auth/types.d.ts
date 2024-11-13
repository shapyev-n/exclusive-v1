/* eslint-disable @typescript-eslint/no-unused-vars */

namespace AUTH {
    type GetMeResponse = IUser
    type GetMeRequest = void

    type LoginResponse = IUser
    type LoginRequest = {
        email: string;
        password: string;
    }

    type SignupResponse = IUser
    type SignupRequest = {
        image: string;
        name:string;
        email: string;
        password: string;
    }
}