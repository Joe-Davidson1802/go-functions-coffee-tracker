import axios from "axios";
import { time } from "node:console";
import { GoogleLoginResponse} from "react-google-login";

export const refreshTokenSetup = (res: GoogleLoginResponse) => {
    let timing = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;
    axios.defaults.headers.Authorization = res.tokenId;

    const refreshToken = async () => {
        const {expires_in, id_token} = await (await res.reloadAuthResponse())
        axios.defaults.headers.Authorization = res.tokenId;
        timing = (expires_in || 3600 - 5 * 60) * 1000;

        setTimeout(refreshToken, timing)
    }
    setTimeout(refreshToken, timing)
}