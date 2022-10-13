/**
 * Select
 * @Author: Junting
 * @Date: 2022-10-13 21:52:33
 * @Last Modified by: Junting
 * @Last Modified time: 2022-10-13 23:26:26
 */

import type { DefaultCase, onSelect, SelectableChannel } from "./types";


/**
 * select
 * @desc 以 Go 语言中 select 为原型实现。
 *   - 实现源码：https://github.com/golang/go/blob/master/src/runtime/select.go
 *   - 实现准则：https://stackoverflow.com/questions/37021194/how-are-golang-select-statements-implemented
 */
export default async function select<Result>(
  channels: [SelectableChannel<any>, onSelect<any, Result>][],
  defaultCase?: DefaultCase<Result>
): Promise<Result> {
  // 准备就绪
  let promises: Promise<number>[] = channels.map(async ([c, func], i) => {
    await c.ready();
    return i;
  });

  if (defaultCase) {
    promises = promises.concat([
      new Promise((resolve) => {
        // 在事件循环的下一次勾选中运行它以防止饥饿。否则，如果在一个无限循环中使用，select 可能总是进入默认的情况。
        setTimeout(() => {
          resolve(promises.length - 1);
        }, 0);
      })
    ]);
  }
  // 获取到最先更新变更状态的索引
  const i = await Promise.race(promises);

  // 最后一个
  if (defaultCase && i === promises.length - 1) {
    return await defaultCase();
  }

  // [SelectableChannel<any>, onSelect<any, Result>]
  const ele = await channels[i][0].pop();
  return await channels[i][1](ele);
}
