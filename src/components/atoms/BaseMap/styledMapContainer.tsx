import glamorous, {GlamorousComponent} from 'glamorous';

export const MapContainer: GlamorousComponent<{}, any> = glamorous.div({
  '& .mapboxgl-map': {
    fontFamily: 'geomanist, sans-serif',
  },
  '& .mapboxgl-ctrl-top-righ': {
    right: '0.5em'
  },
  '& .mapboxgl-popup-content': {
    backgroundColor: 'rgba(0,0,0,0.9) !important',
    boxShadow: 'none !important',
    color: 'white !important',
    fontFamily: 'geomanist, sans-serif',
    WebkitTtapHighlightColor: 'black',
  },
  '& .mapboxgl-canvas-container': {
    cursor: 'pointer',
  },
  '& .mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip': {
    borderTopColor: 'rgba(0, 0, 0, 0.9)',
  },
  '& .mapboxgl-popup-anchor-top .mapboxgl-popup-tip': {
    borderBottomColor: 'rgba(0, 0, 0, 0.9)',
  },
  '&.mapboxgl-map .mapboxgl-popup-content .mapBox-popup p': {
    marginBottom: 0,
  },
});
