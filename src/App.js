import React, { useState } from "react";
import DeckGL from "@deck.gl/react";
import { OrthographicView, OrbitView, COORDINATE_SYSTEM } from "@deck.gl/core";
import { BitmapLayer } from "@deck.gl/layers";
import "./styles.css";

import boundingBoxLayer from "./boundingBoxLayer";
import center_zoom from "./utils";

export default props => {
  //setup control panel
  //v2d flag to show 2d or 3d view

  //console.log(`scale=${scale} zoom=${zoomLevel} target:${target} `);
  const [min, max] = [[-122.519, 37.7045], [-122.355, 37.829]];
  const [width, height] = [800, 600];
  const { scale, zoom, target } = center_zoom({ min, max, width, height });
  console.log(`zoom: ${zoom} target: ${target}`);
  //const [longitude, latitude] = [-122.431297, 37.773972];
  const [viewport] = useState({
    target, //: [longitude, latitude, 0], //world coords of view center, should be bbox center
    //position: [longitude, latitude, 0],
    /* latitude: 37.773972,
    longitude: -122.431297,
    pitch: 50,
    bearing: 0, */
    zoom,
    width,
    height,
    rotationX: 0
  });

  //create different views 2d, or 3d
  let v2d = true;
  const views2d = new OrthographicView({ id: "2d-scene" });
  const views3d = new OrbitView({
    id: "3d-scene",
    orbitAxis: "X",
    rotationX: 0
  });

  const layers = [
    boundingBoxLayer({ min, max }),
    new BitmapLayer({
      bounds: [...min, ...max],
      image:
        "https://raw.githubusercontent.com/uber-common/deck.gl-data/master/website/sf-districts.png",
      coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
      desaturate: 0,
      transparentColor: [0, 0, 0, 0],
      tintColor: [255, 255, 255]
    })
  ];
  return (
    <>
      <div>Test deck.gl bitmap layer, coordinateSystem and views</div>
      <div id="maps">
        <DeckGL
          views={views3d}
          //views={v2d ? views2d : views3d}
          initialViewState={viewport}
          controller={true}
          layers={layers}
        />
      </div>
    </>
  );
};
