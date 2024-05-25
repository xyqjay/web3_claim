
import { ofetch } from "ofetch";
import { Job } from "./job";

class Pocketfi extends Job {
    auth: string;

    constructor(auth: string) {
        super();
        this.auth = auth;
    }

    interval(): number {
        // 3小时执行一次
        const time = 1000 * 60 * 60 * 3
        return time;
    }

    async do(): Promise<void> {
        const res = await ofetch("https://bot.pocketfi.org/mining/claimMining",
            {
                method: "POST",
                headers: this.headers(),
            }
        ).catch((err) => console.log(err)
        );
        const now = new Date();
        console.log(now.toString());
        console.log(res);
    }

    headers(): Record<string, string> {
        return {
            'telegramRawData': this.auth,
            "Sec-Fetch-Site": "cross-site",
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'zh-CN,zh-Hans;q=0.9',
            'Sec-Fetch-Mode': 'cors',
            'Accept': '*/*',
            'Origin': 'https://pocketfi.app',
            'Content-Length': '0',
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
            'Referer': 'https://pocketfi.app/',
            'Sec-Fetch-Dest': 'empty',
            'Connection': 'keep-alive',
        };
    }
}

export { Pocketfi }