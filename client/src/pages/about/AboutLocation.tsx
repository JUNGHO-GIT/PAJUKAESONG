// AboutLocation.tsx

import { useEffect, useState } from "../../imports/ImportReacts.tsx";
import { Paper, Grid } from "../../imports/ImportMuis.tsx";
import { axios } from "../../imports/ImportLibs.tsx";

declare global {
  interface Window {
    naver: any;
  }
}

const PLACE_NAME = "Your Store Name"; // 가게 이름을 지정
const PLACE_ID = "1771196057"; // 네이버 지도에서 사용되는 가게 ID
const NAVER_MAPS_CLIENT_ID = "piuod7gl89"; // 네이버 지도 API 클라이언트 ID

export const AboutLocation = () => {
  const [locationData, setLocationData] = useState<any>(null);

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const response = await axios.get(`/about/location`, {
          params: { place_id: PLACE_ID },
        });
        setLocationData(response.data.result); // locationData 업데이트
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    };

    fetchLocationData();
  }, []);

  useEffect(() => {
    if (!locationData) return;

    const initMap = () => {
      const location = new window.naver.maps.LatLng(locationData.latitude, locationData.longitude);

      const mapOptions = {
        center: location,
        zoom: 17,
        mapTypeControl: true,
        zoomControl: true,
      };

      const map = new window.naver.maps.Map("map", mapOptions);

      const marker = new window.naver.maps.Marker({
        position: location,
        map: map,
      });

      const infoWindow = new window.naver.maps.InfoWindow({
        content: `<div style="padding:10px;">
                    <h4>${PLACE_NAME}</h4>
                    <p>${locationData.address}</p>
                    <p>${locationData.tel}</p>
                  </div>`,
      });

      window.naver.maps.Event.addListener(marker, "click", () => {
        infoWindow.open(map, marker);
      });
    };

    const script = document.createElement("script");
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${NAVER_MAPS_CLIENT_ID}`;
    script.async = true;
    script.onload = () => initMap();
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [locationData]);

  return (
    <Paper className={"content-wrapper h-min75vh"}>
      <Grid container spacing={1}>
        <Grid size={12}>
          <h2>가게 위치</h2>
        </Grid>
        <Grid size={12}>
          <div id="map" style={{ width: "100%", height: "400px" }} />
        </Grid>
      </Grid>
    </Paper>
  );
};
