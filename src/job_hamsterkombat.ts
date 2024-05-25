
import { ofetch } from "ofetch";
import { Job } from "./job";

/// 两个数之间的随机小数
const randomFloat = (min: number, max: number) => Math.random() * (max - min) + min;

class Hamsterkomba extends Job {
    auth: string;
    totalCount: number = 0;

    constructor(auth: string) {
        super();
        this.auth = auth;
    }

    interval(): number {
        return 1000 * 1; 
    }

    async do(): Promise<void> {
        const availableTaps = await this.getAvailableTap();
        const res = await this.tap(availableTaps)
        this.totalCount += 1;
        const availableTaps_new = this.getAvailableTapWith(res)
        if (availableTaps_new <= 10) {
            //如果可点击次数不足，则休息 15 分钟
            console.log('可点击次数不足，休息 15 分钟');
            this.doNext(60 * 15, availableTaps_new)
            return;
        }
        const randomNum = randomFloat(0.8, 2.1)
        this.doNext(randomNum, availableTaps_new)
    }

    async doNext(seconds: number,availableTaps: number): Promise<void> {
        setTimeout(() => {
            this.do();
          }, seconds * 1000); 
    }

    // 取范围内整数
    getRandomInt(min:number, max: number ): number {
        min = Math.ceil(min);  // 向上取整
        max = Math.floor(max); // 向下取整
        return Math.floor(Math.random() * (max - min + 1)) + min; // 含最小值和最大值
    }

    async tap(availableTaps: number): Promise<any> {
        const timestampInSeconds = Math.floor(Date.now() / 1000);
        const randomInt = this.getRandomInt(1, 10);

        const data = {
            count : randomInt,
            availableTaps: availableTaps,
            timestamp: timestampInSeconds
        }
        const now = new Date();
        console.log(now.toString(),JSON.stringify(data));

        const res = await ofetch("https://api.hamsterkombat.io/clicker/tap",
            {
                method: "POST",
                headers: this.headers(),
                body: JSON.stringify(data) 
            }
        ).catch((err) => console.log(err)
        );
        // console.log(res['clickerUser']['totalCoins']);
        this.printResult(res)
        return res
    }

    async sync(): Promise<any> {
        const res = await ofetch("https://api.hamsterkombat.io/clicker/sync",
            {
                method: "POST",
                headers: this.headers(),
            }
        ).catch((err) => console.log(err)
        );
        // console.log(res['clickerUser']['availableTaps']);
        this.printResult(res)
        return res;
    }

    headers(): Record<string, string> {
        return {
            'Authorization': this.auth,
            "Host": 'api.hamsterkombat.io',
            "Sec-Fetch-Site": "same-site",
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-US,en;q=0.9',
            'Sec-Fetch-Mode': 'cors',
            'Accept': '*/*',
            'Origin': 'https://hamsterkombat.io',
            // 'Content-Length': '0',
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
            'Referer': 'https://hamsterkombat.io/',
            'Sec-Fetch-Dest': 'empty',
            'Connection': 'keep-alive',
        };
    }

    printResult(res: any) : void {
        const id =  res['clickerUser']['id']
        const balanceCoins = res['clickerUser']['balanceCoins']
        const availableTaps = res['clickerUser']['availableTaps']
        const level = res['clickerUser']['level']
        const now = new Date();
        console.log(now.toString(), 'ID:',id, 'level:',level, '余额', balanceCoins, '可点击次数:', availableTaps);
    }

    async getAvailableTap():Promise<number> {
        const res = await this.sync()
        const availableTaps = res['clickerUser']['availableTaps']
        return availableTaps
    }


    getAvailableTapWith(res: any): number {
        const availableTaps = res['clickerUser']['availableTaps']
        return availableTaps
    }

    start(): void {
        this.do();
    }
}

export { Hamsterkomba }