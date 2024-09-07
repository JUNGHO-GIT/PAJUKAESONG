// 1-1. number -------------------------------------------------------------------------------------
export const randomNumber = (data: number) => {
  return Math.floor(Math.random() * data);
};

// 1-2. time ---------------------------------------------------------------------------------------
export const randomTime = () => {
  const hour = Math.floor(Math.random() * 23).toString().padStart(2, '0');
  const minute = Math.floor(Math.random() * 60).toString().padStart(2, '0');
  return `${hour}:${minute}`;
};

// 1-3. date ---------------------------------------------------------------------------------------
export const calcDate = (startTime: string, endTime: string) => {
  const start = new Date(`1970/01/01 ${startTime}`);
  const end = new Date(`1970/01/01 ${endTime}`);
  const duration = new Date(Number(end) - Number(start) + 24 * 60 * 60 * 1000);
  return `${duration.getHours().toString().padStart(2, '0')}:${duration.getMinutes().toString().padStart(2, '0')}`;
};

// 1-4. decimal ------------------------------------------------------------------------------------
export const strToDecimal = (time: string) => {
  if (!time) {
    return 0;
  }
  const [hours, minutes] = time.split(":").map(Number);
  const adjustedHours = hours + Math.floor(minutes / 60);
  const adjustedMinutes = minutes % 60;

  return adjustedHours + adjustedMinutes / 60;
};

// 1-5. decimal ------------------------------------------------------------------------------------
export const decimalToStr = (time: number) => {
  if (time === null || time === undefined) {
    return "00:00";
  }
  const hours = Math.floor(time);
  const minutes = Math.round((time - hours) * 60);
  const adjustedHours = hours + Math.floor(minutes / 60);
  const adjustedMinutes = minutes % 60;

  return `${String(adjustedHours).padStart(2, "0")}:${String(adjustedMinutes).padStart(2, "0")}`;
};

// 2-1. log ----------------------------------------------------------------------------------------
export const log = (name: string, data: any) => {
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

// 3. makeFormData ---------------------------------------------------------------------------------
export const makeFormData = (
  object: Record<string, any>,
  extra: Record<string, any>
) => {
  
  // formdata 생성
  const formData = new FormData();

  // object에 있는 데이터 추가
  for (const key in object) {
    if (Array.isArray(object[key])) {
      object[key].forEach((element: any, index: number) => {
        // 파일인 경우
        if (element instanceof File) {
          formData.append(key, element, element.name);
        }
        // 파일이 아닌 경우
        else {
          formData.append(key, element);
        }
      });
    }
  }

  // extra에 있는 추가
  for (const key in extra) {
    if (Array.isArray(extra[key])) {
      extra[key].forEach((element: any, index: number) => {
        // 파일인 경우
        if (element instanceof File) {
          formData.append("files", element, element.name);
        }
        // 파일이 아닌 경우
        else {
          formData.append("files", element);
        }
      });
    }
  }

  return formData;
};