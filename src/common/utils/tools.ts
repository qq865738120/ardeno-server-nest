class Tools {
  /**
   * 查找数组中的指定对象
   * @param arr -源数组
   * @param key -属性key
   * @param value -属性value
   * @param defaultValue -默认值
   * @returns 查找结果
   */
  findObjFromArr(arr: any[], key: string, value: any, defaultValue: any) {
    return arr.find((item) => item[key] === value) || defaultValue;
  }

  /**
   * 休眠
   * @param time -休眠时间，毫秒
   * @returns
   */
  sleep(time = 2000) {
    return new Promise((res) => setTimeout(res, time));
  }

  /**
   * 获取unix时间戳
   * @param date -日期对象
   * @returns 时间戳
   */
  unixTime(date: Date = new Date()) {
    const time = date.getTime();
    return Math.floor(time / 1000);
  }
}

export default new Tools();
