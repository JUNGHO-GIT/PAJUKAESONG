// AboutLocation.tsx

import { useEffect } from "@imports/ImportReacts";
import { Div, Img, Br, Hr } from "@imports/ImportComponents";
import { Paper, Grid, Card } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const AboutLocation = () => {

  // 1. common -------------------------------------------------------------------------------------
  const NAVER_MAPS_CLIENT_ID = process.env.REACT_APP_NAVER_MAPS_CLIENT_ID;
  const srcPre = "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=";
  const scriptSrc = `${srcPre}${NAVER_MAPS_CLIENT_ID}`;

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    const initMap = () => {
      if (window.naver && window.naver.maps) {
        const naverMaps = window.naver.maps;
        const location = new naverMaps.LatLng(37.864200, 126.780585);
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
            pixelOffset: new naverMaps.Point(0, -10),
            anchorSize: new naverMaps.Size(0, -5),
            backgroundColor: "#ffffff",
            borderColor: "#333333",
            borderWidth: 0.5,
            anchorSkew: false,
            disableAnchor: false,
            anchorColor: "#ffffff",
            content: `
              <div style="padding: 10px;">
                <h3>파주개성면옥</h3>
                <p>경기 파주시 문산읍 방촌로 1675-34</p>
              </div>
            `,
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

  // 7. locationNode -------------------------------------------------------------------------------
  const locationNode = () => {
    // 1. title
    const titleSection = () => (
      <Div
        key={"title"}
        className={"fs-2-0rem fw-700"}
      >
        오시는길
      </Div>
    );
    // 2. location
    const locationSection = () => (
      <Card className={"border radius shadow"}>
        <Div
          key={"location"}
          id={"map"}
          style={{
            width: "100%",
            height: "65vh",
          }}
        />
      </Card>
    );
    // 10. return
    return (
      <Paper className={"content-wrapper h-min75vh"}>
        <Grid container spacing={2} columns={12}>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }} className={"d-center"}>
            {titleSection()}
          </Grid>
          <Grid size={{ xs: 12, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center"}>
            {locationSection()}
          </Grid>
        </Grid>
      </Paper>
    );
  };

  // 10. return ------------------------------------------------------------------------------------
  return (
    <>
      {locationNode()}
    </>
  );
};
