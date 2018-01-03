var bairrosLayer;
var vazamentosLayer;
var layerBairros;
var popupBairros;

var map = L.map('map').setView([-3.794, -38.54], 12);

	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
			'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="http://mapbox.com">Mapbox</a>',
		id: 'mapbox.streets'
	}).addTo(map);


	/** BAIRROS */
	function zoomBairro(e){
				map.fitBounds(e.target.getBounds());
			}

	function onEachFeature_bai(feature, layerBairros){
				popupBairros = "<b>Nome do bairro: </b>" +feature.properties.bai_nome;
				layerBairros.bindPopup(popupBairros);
				layerBairros.on({
					click: zoomBairro
				});
			}

	bairrosLayer = L.geoJSON(bairros, {
		style: function(feature){
			return {
				color: "#091",
				fillColor: "#aa9"
			};
		},
		onEachFeature: onEachFeature_bai
	}).addTo(map);


//vazamentosLayer = L.geoJSON(vazamentos).addTo(map);

geoJson2heat = function(geojson) {
	return geojson.features.map(function(feature) {
		return [parseFloat(feature.geometry.coordinates[1]), parseFloat(feature.geometry.coordinates[0])];
		});
}
vazamentosLayer = vazamentos.map(function (p) { return [p[0], p[1]]; });

var heat = L.heatLayer(vazamentosLayer).addTo(map);
