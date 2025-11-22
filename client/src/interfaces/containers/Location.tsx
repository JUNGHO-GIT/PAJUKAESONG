// Location.tsx

import { useEffect, memo } from "@exportReacts";
import { Div } from "@exportComponents";

// -------------------------------------------------------------------------------------------------
export const Location = memo((props: any) => {

  // 1. common -------------------------------------------------------------------------------------
  const NAVER_MAPS_CLIENT_ID = import.meta.env.VITE_APP_NAVER_MAPS_CLIENT_ID;
  const srcPre = "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=";
  const scriptSrc = `${srcPre}${NAVER_MAPS_CLIENT_ID}`;

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    const initMap = () => {
      if (window.naver && window.naver.maps) {
        const naverMaps = window.naver.maps;
        const location = new naverMaps.LatLng(37.864200, 126.780585);
        const newMap = new naverMaps.Map("map", {
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
        });
        const marker = new naverMaps.Marker({
          position: location,
          map: newMap,
        });
        const infoWindow = new naverMaps.InfoWindow({
          pixelOffset: new naverMaps.Point(0, 0),
          anchorSize: new naverMaps.Size(0, 0),
          backgroundColor: "#ffffff",
          borderColor: "#333333",
          borderWidth: 0.5,
          anchorSkew: false,
          disableAnchor: false,
          anchorColor: "#ffffff",
          content: `
          <div style="display: block; padding: 10px;">
            <p style="display: flex; justify-content: center; font-size: 1.2rem; font-weight: 700;">파주개성면옥</p>
            <p style="display: flex; justify-content: center; font-size: 0.8rem;" font-weight: 500;>⊙ 경기 파주시 문산읍 방촌로 1675-34</p>
            <p style="display: flex; justify-content: center; font-size: 0.8rem;" font-weight: 500;>☎ 031-952-8083</p>
          </div>
          `,
        });

        // InfoWindow가 열릴 때 지도 중심 조정
        const adjustMapCenter = () => {
          const projection = newMap.getProjection();
          const markerPosition = marker.getPosition();
          const pixelPosition = projection.fromCoordToOffset(markerPosition);
          const adjustedPixelPosition = new naverMaps.Point(pixelPosition.x, pixelPosition.y - 80);
          const adjustedCenter = projection.fromOffsetToCoord(adjustedPixelPosition);
          newMap.setCenter(adjustedCenter);
        };

        // 마커 클릭 시 InfoWindow 열고 지도 중심 조정
        naverMaps.Event.addListener(marker, "click", function () {
          if (infoWindow.getMap()) {
            infoWindow.close();
          }
          else {
            infoWindow.open(newMap, marker);
            adjustMapCenter();
          }
        });

        // 초기 InfoWindow 열기 및 지도 중심 조정
        infoWindow.open(newMap, marker);
        adjustMapCenter();
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

  // 7. locationNode -------------------------------------------------------------------------------
  const locationNode = () => (
    <Div
      {...props}
      key={"location"}
      id={"map"}
      style={{
        width: props?.width || "100%",
        height: props?.height || "400px",
      }}
    />
  );

  // 10. return ------------------------------------------------------------------------------------
  return (
    <>
      {locationNode()}
    </>
  );
});