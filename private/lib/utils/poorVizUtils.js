/* eslint-disable */
import * as d3 from "d3";
import rawdata from '../../components/molecules/whereAreThePoorViz/data';

export const colMap = {
  'SSA': '#1b365d',
  'SA': '#ba0c2f',
  'ECA': '#93328e',
  'LAC': '#0095cb',
  'MENA': 'darkgreen',
  'EAP': '#ea7600',
  'world': '#333',
};

export var entities = [{"id":"world","name":"Global","x":200,"y":450,"parent":"world","level":"global"},
  {"id":"EAP","name":"East Asia & Pacific","x":750,"y":370,"parent":"world","level":"region"},
  {"id":"LAC","name":"Latin America and Caribbean","x":50,"y":300,"parent":"world","level":"region"},
  {"id":"ECA","name":"Europe & Central Asia","x":325,"y":70,"parent":"world","level":"region"},
  {"id":"MENA","name":"Middle East & North Africa","x":315,"y":195,"parent":"world","level":"region"},
  {"id":"SA","name":"South Asia","x":550,"y":370,"parent":"world","level":"region"},
  {"id":"SSA","name":"Sub-Saharan Africa","x":315,"y":450,"parent":"world","level":"region"}];

var bisector = d3.bisector(function(d) { return d.year; }).left;
var dataByID = d3.nest()
  .key(function(d){
    return d.id;
  })
  .map(rawdata);
var dataByIDLookup = d3.nest()
  .key(function(d){
    return d.id;
  })
  .map(entities);

export function getX(id){
  return dataByIDLookup.get(id)[0].x;

}

export function getY(id){
  return dataByIDLookup.get(id)[0].y;

}


export function getParent(id){
  var parent = dataByIDLookup.get(id)[0].parent;
  return [ dataByIDLookup.get(parent)[0].x, dataByIDLookup[parent][0].y];
}

export function getCols(id){

  var cols = 15;

  if(id == "global"){
    cols = 30;
  }

  return cols;
}

export function getScale(id){

  var scale = 0.5;

  if(id == "global"){
    scale = 0.5;
  }

  return scale;
}

export function formatNumber(n, decimals) {
  let s, remainder, num, negativePrefix, negativeSuffix, prefix, suffix;
  suffix = ""
  negativePrefix = ""
  negativeSuffix = ""
  if (n < 0) {
    negativePrefix = "";
    negativeSuffix = " in income"
    n = -n
  };

  if (n >= 1000000000000) {
    suffix = " trillion"
    n = n / 1000000000000
    decimals = 2
  } else if (n >= 1000000000) {
    suffix = " billion"
    n = n / 1000000000
    decimals = 1
  } else if (n >= 1000000) {
    suffix = " million"
    n = n / 1000000
    decimals = 0
  } else{

    return "fewer than 1 million";
  }


  prefix = ""
  if (decimals > 0) {
    if (n<1) {prefix = "0"};
    s = String(Math.round(n * (Math.pow(10,decimals))));
    if (s < 10) {
      remainder = "0" + s.substr(s.length-(decimals),decimals);
      num = "";
    } else{
      remainder = s.substr(s.length-(decimals),decimals);
      num = s.substr(0,s.length - decimals);
    }


    return  negativePrefix + prefix + num.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + "." + remainder + suffix + negativeSuffix;
  } else {
    s = String(Math.round(n));
    s = s.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    return  negativePrefix + s + suffix + negativeSuffix;
  }
};

export function getValue(id, year, indicator){

  //dataByID["Uganda"][5].Baseline
  const dataMap = dataByID.get(id);
  var indicator = indicator;
  /* Interpolate */

  var position = bisector(dataMap, year, 0, dataMap.length - 1),
    a = dataMap[position][indicator];

  if (position > 0) {

    var b = dataMap[position-1][indicator],
      t = (year - dataMap[position].year) / (dataMap[position-1].year - dataMap[position].year);

    return a * (1 - t) + b * t;
  }

  return a;

}
