import { Control, DomUtil, Map, control, marker } from 'leaflet';
import { startMapTemplate } from '../assets/template/content';
import { tileLayerSelect } from '../config/functions';
import { fullScreenMap } from './fullscreen';
import { watermark } from './watermark';
import { markersManageControl } from './marker-control';

startMapTemplate(document, 'Plantilla - Mapa con Typescript');

const map = new Map('map').setView([43.3082977, -1.9837398], 10);

tileLayerSelect().addTo(map);

fullScreenMap().addTo(map);

markersManageControl().addTo(map);

watermark().addTo(map)