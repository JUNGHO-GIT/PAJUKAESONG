// aboutService.js

import axios from 'axios';

// 0.location -------------------------------------------------------------------------------------
export const location = async (place_id_param: string) => {
  try {
    const NAVER_MAPS_CLIENT_ID = 'piuod7gl89';

    // 네이버 API에 요청을 보냄
    const response = await axios.get(`https://map.naver.com/v5/api/sites/summary/${place_id_param}?lang=ko`, {
      headers: {
        'X-NCP-APIGW-API-KEY-ID': NAVER_MAPS_CLIENT_ID
      }
    });

    // 네이버 API로부터 받은 데이터를 반환
    return response.data;
  }
  catch (error: any) {
    console.error("Error fetching location data from Naver API:", error);
    throw error;
  }
};
