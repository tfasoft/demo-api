import tfa from "tfa-node-sdk";

import { tfaConfig } from "$app/config/index.js";

const auth = new tfa(tfaConfig.accessToken);

export default auth;
