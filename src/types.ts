/**
 * Base
 * @desc: 两种基本方法，所有类型 Channel 必须实现
 */
interface Base {
  /**
   * 关闭当前 channel 方法，此方法不会阻塞，并立即返回。
   */
  close(): void;
  /**
   * 检测 channel 是否关闭
   */
  closed(): boolean;
}

/**
 * PopChannel
 * @desc: 接收数据唯一方法
 */
export interface PopChannel<T> extends Base {
  /**
   * 从该 channel 接收数据
   */
  pop(): Promise<T | undefined>;
}

/**
 * PutChannel
 * @desc: 发送数据唯一方式
 */
export interface PutChannel<T> extends Base {
  /**
   * 从该 channel 发送数据
   * @param ele
   */
  put(ele: T): Promise<void>;
}

/**
 * SelectableChannel
 * @desc: 一个实现了 ready() 方法的 channel，供 select() 方法使用。
 */
export interface SelectableChannel<T> extends PopChannel<T> {
  ready(): Promise<SelectableChannel<T>>;
}

/**
 * BaseChannel
 * @desc: 任何 channel 都有接收/发送数据的能力
 */
export interface BaseChannel<T> extends PopChannel<T>, PutChannel<T> { }

/**
 * Channel
 * @desc: Channel 实现类型要求，要是一个异步迭代器
 */
export interface Channel<T> extends SelectableChannel<T>, PutChannel<T>, AsyncIterableIterator<T> { }

export type ResolveValue<T> = { value: undefined; done: true } | { value: T; done: false };
/**
 * PopperOnResolver
 * @desc: 消费者数据类型
 */
export interface PopperOnResolver<T> {
  (ele: ResolveValue<T>): void;
}

/**
 * UnreachableError
 * @desc: 无法到达的错误
 */
export class UnreachableError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = UnreachableError.name;
  }
}