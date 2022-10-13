import { MAX_INT_32 } from "./constants";

/**
 * sleep
 * @desc promise 化 setTimeout
 * @param delay
 * @returns
 */
export function sleep(delay: number) {
  if (0 > delay || delay > MAX_INT_32) {
    throw new Error(`${delay} is out of int32 bound or is negative number.`);
  }

  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  })
}
