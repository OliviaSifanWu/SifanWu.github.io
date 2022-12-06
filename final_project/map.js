var map = d3.choropleth()
    .geofile('d3-geomap/topojson/countries/USA.json')
    .projection(d3.geoAlbersUsa)
    .column('Climbs')
    .unitId('fips')
    .scale(1000)
    .legend(false);

d3.csv('../data/aggregate.csv').then(data => {
    map.draw(d3.select('#map').datum(data));
});