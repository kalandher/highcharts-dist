/*
 Highstock JS v8.2.2 (2021-01-18)

 Indicator series type for Highstock

 (c) 2010-2019 Wojciech Chmiel

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/chaikin",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,e,c,g){a.hasOwnProperty(e)||(a[e]=g.apply(null,c))}a=a?a._modules:{};b(a,"Mixins/IndicatorRequired.js",[a["Core/Utilities.js"]],function(a){var e=a.error;return{isParentLoaded:function(a,
g,b,l,h){if(a)return l?l(a):!0;e(h||this.generateMessage(b,g));return!1},generateMessage:function(a,b){return'Error: "'+a+'" indicator type requires "'+b+'" indicator loaded before. Please read docs: https://api.highcharts.com/highstock/plotOptions.'+a}}});b(a,"Stock/Indicators/Chaikin/ChaikinIndicator.js",[a["Mixins/IndicatorRequired.js"],a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,b,c){var g=this&&this.__extends||function(){var a=function(b,d){a=Object.setPrototypeOf||
{__proto__:[]}instanceof Array&&function(a,d){a.__proto__=d}||function(a,d){for(var f in d)d.hasOwnProperty(f)&&(a[f]=d[f])};return a(b,d)};return function(b,d){function f(){this.constructor=b}a(b,d);b.prototype=null===d?Object.create(d):(f.prototype=d.prototype,new f)}}(),e=b.seriesTypes,l=e.ad,h=e.ema,m=c.correctFloat;e=c.extend;var n=c.merge,p=c.error;c=function(b){function c(){var a=null!==b&&b.apply(this,arguments)||this;a.data=void 0;a.options=void 0;a.points=void 0;return a}g(c,b);c.prototype.init=
function(){var b=arguments,f=this;a.isParentLoaded(h,"ema",f.type,function(a){a.prototype.init.apply(f,b)})};c.prototype.getValues=function(a,b){var c=b.periods,d=b.period,e=[],f=[],g=[],k;if(2!==c.length||c[1]<=c[0])p('Error: "Chaikin requires two periods. Notice, first period should be lower than the second one."');else if(b=l.prototype.getValues.call(this,a,{volumeSeriesID:b.volumeSeriesID,period:d}))if(a=h.prototype.getValues.call(this,b,{period:c[0]}),b=h.prototype.getValues.call(this,b,{period:c[1]}),
a&&b){c=c[1]-c[0];for(k=0;k<b.yData.length;k++)d=m(a.yData[k+c]-b.yData[k]),e.push([b.xData[k],d]),f.push(b.xData[k]),g.push(d);return{values:e,xData:f,yData:g}}};c.defaultOptions=n(h.defaultOptions,{params:{volumeSeriesID:"volume",periods:[3,10]}});return c}(h);e(c.prototype,{nameBase:"Chaikin Osc",nameComponents:["periods"]});b.registerSeriesType("chaikin",c);"";return c});b(a,"masters/indicators/chaikin.src.js",[],function(){})});
//# sourceMappingURL=chaikin.js.map