import { DomUtil, Util, Map, Control, marker, ControlPosition } from 'leaflet';


const MarkersManagerControl = Control.extend({
  options: {
    position: 'topleft',
    active: false,
    startToAdd: false,
  },
  initialize: function (options: {
    position: ControlPosition;
    active: boolean;
  }) {
    Util.setOptions(this, options);
  },

  onAdd: function (map: Map) {
    const container = DomUtil.create('input');
    container.type = 'button';
    container.title = 'Añadir marcador en la mitad del mapa';
    container.style.backgroundColor = 'whitesmoke';
    container.style.color = 'black';
    container.value = 'C';
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

      container.style.backgroundColor = this.options.active ? 'red': 'whitesmoke';
      /*const markerItem = marker([map.getCenter().lat, map.getCenter().lng]);
          markerItem.bindPopup(markerItem.getLatLng().toString());
          markerItem.addTo(map);
          markerItem.on('contextmenu', () => map.removeLayer(markerItem));*/
    };

    map.on('click', (position) => {
      const markerItem = marker(position.latlng);
      if (this.options.startToAdd && this.options.active) {
        console.log(position);

        markerItem.bindPopup(markerItem.getLatLng().toString());
        markerItem.addTo(map);
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
        console.log('Encima del mapa');
        console.log('Puedes añadir marcadores :)');
        this.options.startToAdd = true;
      }
    });

    return container;
  },
});

export const markersManageControl = (options?: {
  position?: ControlPosition;
  active?: boolean;
}) => new MarkersManagerControl(options);
