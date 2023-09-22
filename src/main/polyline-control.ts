import { DomUtil, Util, Map, Control, marker, ControlPosition, LatLng, polyline } from 'leaflet';


const PolylinesManagerControl = Control.extend({
  options: {
    position: 'topleft',
    active: false,
    startToAdd: false,
    line: [{lat: 9999999999, lng: 9999999999}]
  },
  initialize: function (options: {
    position: ControlPosition;
    active: boolean;
    line: Array<typeof marker>
  }) {
    Util.setOptions(this, options);
  },

  onAdd: function (map: Map) {
    const container = DomUtil.create('input');
    container.type = 'button';
    container.title = 'Añadir marcador en la mitad del mapa';
    container.style.backgroundColor = 'whitesmoke';
    container.style.color = 'black';
    container.value = 'P';
    container.style.backgroundSize = '30px 30px';
    container.style.backgroundRepeat = 'no-repeat';
    container.style.width = '30px';
    container.style.height = '30px';
    container.style.padding = '10px';

    const optionsActive = this.options.active;

    container.onclick = () => {
      console.log(this.options.active);

      this.options.active = !this.options.active;

      this.options.startToAdd = this.options.startToAdd && this.options.active;

      console.log('Start to add', this.options.startToAdd);

      container.style.backgroundColor = this.options.active ? 'green': 'whitesmoke';
      /*const markerItem = marker([map.getCenter().lat, map.getCenter().lng]);
          markerItem.bindPopup(markerItem.getLatLng().toString());
          markerItem.addTo(map);
          markerItem.on('contextmenu', () => map.removeLayer(markerItem));*/
    };

    map.on('click', (position) => {
      console.log(this.options.line)
      
      const markerItem = marker(position.latlng);
      if (this.options.startToAdd && this.options.active) {
        if (this.options.line.length) {
          const {lat, lng } = position.latlng;
          if (this.options.line[0].lat === 9999999999) {
            console.log('Añadir inicio')
            
            this.options.line[0] = {lat, lng};
            console.log(this.options.line);
            markerItem.bindPopup('START: ' + markerItem.getLatLng().toString());
            markerItem.addTo(map);
            return;
          }
          this.options.line[1] = {lat, lng};
          markerItem.bindPopup('FINISH: ' + markerItem.getLatLng().toString());
          markerItem.addTo(map);

          const start = this.options.line[0];
          const finish = this.options.line[1]
          // create a red polyline from an array of LatLng points
          const latlngs: [number, number][] = [
            [start.lat, start.lng], // Portland
            [finish.lat, finish.lng],   // Oakland
          ];

          polyline(latlngs, {color: 'blue', weight: 4}).addTo(map);

          this.options.line = [{lat: 9999999999, lng: 9999999999}]
          
        }
        console.log(position);

        
      }

      markerItem.on('contextmenu', () => map.removeLayer(markerItem));
    });

    /*mouse sobre el botón
      mouse fuera del botón
      click en botón*/
    // container.onmouseover = () => (container.style.backgroundColor = 'green');

    // container.onmouseout = () =>      (container.style.backgroundColor = 'whitesmoke');

    map.on('mousemove', () => {
      if (this.options.active) {
        // console.log('Encima del mapa');
        // console.log('Puedes añadir marcadores :)');
        this.options.startToAdd = true;
      }
    });

    return container;
  },
});

export const polylinesManagerControl = (options?: {
  position?: ControlPosition;
  active?: boolean;
  line?: Array<any>
}) => new PolylinesManagerControl(options);
