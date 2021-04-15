import axios from "axios";
import { time } from "node:console";
import { GoogleLoginResponse} from "react-google-login";
import api from "./api/api";

export const refreshTokenSetup = (res: GoogleLoginResponse) => {
    let timing = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;
    api.defaults.headers.Authorization = "Bearer " + res.tokenId;

    const refreshToken = async () => {
        const {expires_in, id_token} = await (await res.reloadAuthResponse())
        api.defaults.headers.Authorization = "Bearer " + id_token;
        timing = (expires_in || 3600 - 5 * 60) * 1000;

        setTimeout(refreshToken, timing)
    }
    setTimeout(refreshToken, timing)
}