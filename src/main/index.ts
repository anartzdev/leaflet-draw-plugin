import { Map } from 'leaflet';
import { startMapTemplate } from '../assets/template/content';
import { tileLayerSelect } from '../config/functions';
import { fullScreenMap } from './fullscreen';

startMapTemplate(document, 'Plantilla - Mapa con Typescript');

const mymap = new Map('map').setView([43.3082977, -1.9837398], 10);

tileLayerSelect().addTo(mymap);

fullScreenMap().addTo(mymap);