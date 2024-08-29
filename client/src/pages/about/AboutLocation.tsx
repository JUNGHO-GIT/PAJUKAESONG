// AboutLocation.tsx

import { useEffect } from "react";
import { Paper } from "../../imports/ImportMuis";
import { Div } from "../../imports/ImportComponents.tsx";

declare global {
  interface Window {
    naver: any;
  }
}

const NAVER_MAPS_CLIENT_ID = "piuod7gl89";

export const AboutLocation = () => {
  useEffect(() => {
    const initMap = () => {

      // 가게의 위도와 경도를 입력하세요.
      const location = new window.naver.maps.LatLng(37.5665, 126.9780);

      const mapOptions = {
        center: location,
        zoom: 17,
      };

      const map = new window.naver.maps.Map("map", mapOptions);

      new window.naver.maps.Marker({
        position: location,
        map: map,
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
  }, []);

  return (
    <Paper className={"content-wrapper h-min75vh"}>
      <Div>
        <h2>가게 위치</h2>
        <div id="map" style={{ width: "100%", height: "400px" }} />
      </Div>
    </Paper>
  );
};
