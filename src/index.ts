
import {Hamsterkomba} from './job_hamsterkombat'
import { Pocketfi } from "./job_pocketfi";

console.log('start')

/**
 * Pocketfi 每 3 小时 Claim 一次，
 * 抓包 取 telegramRawData 值放在 job_pocketfi_auth 中, 每周过期一次，记得更新
 */
// const job_pocketfi_auth = ''
// const job_pocketfi = new Pocketfi(job_pocketfi_auth);
// job_pocketfi.start();


/**
 * Hamsterkomba 每秒随机点按次数，
 * 抓包, 取 Authorization 值放在 Hamsterkomba_auth 中, 还不知道多久过期，待观察
 */
const Hamsterkomba_auth = '';
const job = new Hamsterkomba(Hamsterkomba_auth);
job.start();

