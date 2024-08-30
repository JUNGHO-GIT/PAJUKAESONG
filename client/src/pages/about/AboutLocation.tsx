// AboutLocation.tsx

import { useEffect } from "react";
import { Paper, Grid } from "@imports/ImportMuis";
import { Div } from "@imports/ImportComponents";

// -------------------------------------------------------------------------------------------------
declare global {
  interface Window {
    naver: any;
  }
}

// -------------------------------------------------------------------------------------------------
export const AboutLocation = () => {

  const NAVER_MAPS_CLIENT_ID = process.env.REACT_APP_NAVER_MAPS_CLIENT_ID;
  const srcPre = "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=";
  const scriptSrc = `${srcPre}${NAVER_MAPS_CLIENT_ID}`;

  useEffect(() => {
    const initMap = () => {
      if (window.naver && window.naver.maps) {
        const naverMaps = window.naver.maps;
        const location = new naverMaps.LatLng(37.5666805, 126.9784147);
        const mapOptions = {
          center: location,
          zoom: 17,
          zoomControl: true,
          zoomControlOptions: {
            position: naverMaps.Position.RIGHT_CENTER,
          },
          mapTypeControl: true,
          mapTypeControlOptions: {
            style: naverMaps.MapTypeControlStyle.BUTTON,
            position: naverMaps.Position.TOP_RIGHT,
          },
        };
        const newMap = new naverMaps.Map("map", mapOptions);
        const marker = new naverMaps.Marker({
          position: location,
          map: newMap,
        });
        const infoWindow = new naverMaps.InfoWindow({
          content: `
            <div style="padding: 20px;">
              <h4>서울특별시청</h4>
              <p>서울특별시 중구 서소문동 37-9</p>
            </div>
          `,
          backgroundColor: "#fff",
          borderColor: "#000",
          borderWidth: 1,
          anchorSize: new naverMaps.Size(0, 0),
          anchorSkew: true,
          anchorColor: "#fff",
        });

        naverMaps.Event.addListener(marker, "click", function () {
          if (infoWindow.getMap()) {
            infoWindow.close();
          }
          else {
            infoWindow.open(newMap, marker);
          }
        });

        infoWindow.open(newMap, marker);
      }
    };

    const script = document.createElement("script");
    script.src = scriptSrc;
    script.async = true;
    script.onload = initMap;
    document.head.appendChild(script);

    return () => {
      const script = document.querySelector(`script[src="${scriptSrc}"]`);
      if (script) {
        script.remove();
      }
    };
  }, []);

  return (
    <Paper className={"content-wrapper radius border h-min75vh"}>
      <Grid container spacing={2}>
        <Grid size={12} className={"d-center"}>
          <Div className={"fs-1-4rem fw-700"}>
            가게 위치
          </Div>
        </Grid>
        <Grid size={12}>
          <Div id={"map"} style={{ width: "100%", height: "400px" }} />
        </Grid>
      </Grid>
    </Paper>
  );
};
