export interface Music {
  /** 音乐的唯一 ID，处理同名音乐 */
  id: string;
  /** 音乐名称 */
  name: string;
  /** 标记为本地导入还是 url 导入 */
  isRemote: boolean;
  /** 对应的音乐人，可能有多个 */
  author?: string | string[];
  /** 音乐的本地文件 */
  file?: string;
  /** 音乐的远程地址 */
  url?: string;
}
