import { chan, sleep } from '../src'

describe("Communication Sequential Process: ", async () => {
  /*
  通道的另一个独特且有点令人惊讶的行为是
  通道会阻塞发送，直到另一端开始接收并
  从通道接受数据也会被阻塞，直到另一端开始发送。

  这允许2个进程使用同一通道来协作
  */

  it("Example 1", async () => {
    let c = chan<number>();
    let task1 = async () => {
      let i = 0;
      // 死循环一下
      while (1) {
        await c.put(++i);
      }
    }
    let task2 = async () => {
      let i = 0;
      while (i++ < 3) {
        let x = await c.pop();
        console.log(x);
        await sleep(1000);
      }
    }
    task1();
    task2();
  })
});
