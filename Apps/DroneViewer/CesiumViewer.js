define([
        'Cesium/Core/Cartesian3',
        'Cesium/Core/createWorldTerrain',
        'Cesium/Core/defined',
        'Cesium/Core/formatError',
        'Cesium/Core/Math',
        'Cesium/Core/objectToQuery',
        'Cesium/Core/queryToObject',
        'Cesium/DataSources/CzmlDataSource',
        'Cesium/DataSources/GeoJsonDataSource',
        'Cesium/DataSources/KmlDataSource',
        'Cesium/Scene/createTileMapServiceImageryProvider',
        'Cesium/Widgets/Viewer/Viewer',
        'Cesium/Widgets/Viewer/viewerCesiumInspectorMixin',
        'Cesium/Widgets/Viewer/viewerDragDropMixin',
        'domReady!'
    ], function(
        Cartesian3,
        createWorldTerrain,
        defined,
        formatError,
        CesiumMath,
        objectToQuery,
        queryToObject,
        CzmlDataSource,
        GeoJsonDataSource,
        KmlDataSource,
        createTileMapServiceImageryProvider,
        Viewer,
        viewerCesiumInspectorMixin,
        viewerDragDropMixin) {
    'use strict';

    var viewer = new Viewer('cesiumContainer');

    var receiveSocket = new WebSocket('ws://localhost:8080/');
    receiveSocket.onopen = function (event) {
        console.log('ws-socket opened');
    };

    receiveSocket.onmessage = function (event) {
        var update = JSON.parse(event.data);
        viewer.camera.setView({
            destination : Cartesian3.fromDegrees(
                update.lon,
                update.lat,
                update.alt),
            orientation: {
                heading: update.heading,
                pitch: update.pitch,
                roll: update.roll
            }
        });
    };

});
