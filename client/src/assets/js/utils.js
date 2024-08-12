// 1-1. number -------------------------------------------------------------------------------------
export const randomNumber = (data) => {
  return Math.floor(Math.random() * data);
}


// 1-2. time ---------------------------------------------------------------------------------------
export const randomTime = () => {
  const hour = Math.floor(Math.random() * 23).toString().padStart(2, '0');
  const minute = Math.floor(Math.random() * 60).toString().padStart(2, '0');
  return `${hour}:${minute}`;
}


// 1-3. date ---------------------------------------------------------------------------------------
export const calcDate = (startTime, endTime) => {
  const start = new Date(`1970/01/01 ${startTime}`);
  const end = new Date(`1970/01/01 ${endTime}`);
  const duration = new Date(Number(end) - Number(start) + 24 * 60 * 60 * 1000);
  return `${duration.getHours().toString().padStart(2, '0')}:${duration.getMinutes().toString().padStart(2, '0')}`;
}


// 2-1. log ----------------------------------------------------------------------------------------
export const log = (name, data) => {
  const cache = new Set();

  // 순환 참조 발견
  const jsonString = JSON.stringify(data, (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (cache.has(value)) {
        return "[Circular]";
      }
      cache.add(value);
    }
    return value;
  }, 2);

  // 로그 출력
  console.log(`${name} : ${jsonString}`);

  // 캐시 클리어
  cache.clear();
};