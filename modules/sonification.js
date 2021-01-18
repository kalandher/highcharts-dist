/*
 Highcharts JS v8.2.2 (2021-01-18)

 Sonification module

 (c) 2012-2019 ystein Moseng

 License: www.highcharts.com/license
*/
(function(b){"object"===typeof module&&module.exports?(b["default"]=b,module.exports=b):"function"===typeof define&&define.amd?define("highcharts/modules/sonification",["highcharts"],function(l){b(l);b.Highcharts=l;return b}):b("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(b){function l(c,b,f,p){c.hasOwnProperty(b)||(c[b]=p.apply(null,f))}b=b?b._modules:{};l(b,"Extensions/Sonification/Instrument.js",[b["Core/Globals.js"],b["Core/Utilities.js"]],function(c,b){function f(d){this.init(d)}
var p=b.error,m=b.merge,h=b.pick,B=b.uniqueKey,n={type:"oscillator",playCallbackInterval:20,masterVolume:1,oscillator:{waveformShape:"sine"}};f.prototype.init=function(d){if(this.initAudioContext()){this.options=m(n,d);this.id=this.options.id=d&&d.id||B();this.masterVolume=this.options.masterVolume||0;d=c.audioContext;var a=this.destinationNode||d.destination;this.gainNode=d.createGain();this.setGain(0);(this.panNode=d.createStereoPanner&&d.createStereoPanner())?(this.setPan(0),this.gainNode.connect(this.panNode),
this.panNode.connect(a)):this.gainNode.connect(a);"oscillator"===this.options.type&&this.initOscillator(this.options.oscillator);this.playCallbackTimers=[]}else p(29)};f.prototype.copy=function(d){return new f(m(this.options,{id:null},d))};f.prototype.initAudioContext=function(){var d=c.win.AudioContext||c.win.webkitAudioContext,a=!!c.audioContext;return d?(c.audioContext=c.audioContext||new d,!a&&c.audioContext&&"running"===c.audioContext.state&&c.audioContext.suspend(),!!(c.audioContext&&c.audioContext.createOscillator&&
c.audioContext.createGain)):!1};f.prototype.initOscillator=function(d){this.oscillator=c.audioContext.createOscillator();this.oscillator.type=d.waveformShape;this.oscillator.connect(this.gainNode);this.oscillatorStarted=!1};f.prototype.setPan=function(d){this.panNode&&this.panNode.pan.setValueAtTime(d,c.audioContext.currentTime)};f.prototype.setGain=function(d,a){var e=this.gainNode;d*=this.masterVolume;e&&(1.2<d&&(console.warn("Highcharts sonification warning: Volume of instrument set too high."),
d=1.2),a?(e.gain.setValueAtTime(e.gain.value,c.audioContext.currentTime),e.gain.linearRampToValueAtTime(d,c.audioContext.currentTime+a/1E3)):e.gain.setValueAtTime(d,c.audioContext.currentTime))};f.prototype.cancelGainRamp=function(){this.gainNode&&this.gainNode.gain.cancelScheduledValues(0)};f.prototype.setMasterVolume=function(d){this.masterVolume=d||0};f.prototype.getValidFrequency=function(d,a,e){var g=this.options.allowedFrequencies,b=h(e,Infinity),c=h(a,-Infinity);return g&&g.length?g.reduce(function(a,
e){return Math.abs(e-d)<Math.abs(a-d)&&e<b&&e>c?e:a},Infinity):d};f.prototype.clearPlayCallbackTimers=function(){this.playCallbackTimers.forEach(function(d){clearInterval(d)});this.playCallbackTimers=[]};f.prototype.setFrequency=function(d,a){a=a||{};d=this.getValidFrequency(d,a.min,a.max);"oscillator"===this.options.type&&this.oscillatorPlay(d)};f.prototype.oscillatorPlay=function(d){this.oscillatorStarted||(this.oscillator.start(),this.oscillatorStarted=!0);this.oscillator.frequency.setValueAtTime(d,
c.audioContext.currentTime)};f.prototype.preparePlay=function(){this.setGain(.001);"suspended"===c.audioContext.state&&c.audioContext.resume();this.oscillator&&!this.oscillatorStarted&&(this.oscillator.start(),this.oscillatorStarted=!0)};f.prototype.play=function(d){var a=this,e=d.duration||0,g=function(e,g,b){var c=d.duration,f=0,h=a.options.playCallbackInterval;if("function"===typeof e){var m=setInterval(function(){f++;var d=f*h/c;if(1<=d)a[g](e(1),b),clearInterval(m);else a[g](e(d),b)},h);a.playCallbackTimers.push(m)}else a[g](e,
b)};if(a.id)if("suspended"===c.audioContext.state||this.oscillator&&!this.oscillatorStarted)a.preparePlay(),setTimeout(function(){a.play(d)},10);else{a.playCallbackTimers.length&&a.clearPlayCallbackTimers();a.cancelGainRamp();a.stopOscillatorTimeout&&(clearTimeout(a.stopOscillatorTimeout),delete a.stopOscillatorTimeout);a.stopTimeout&&(clearTimeout(a.stopTimeout),delete a.stopTimeout,a.stopCallback&&(a._play=a.play,a.play=function(){},a.stopCallback("cancelled"),a.play=a._play));var b=e<c.sonification.fadeOutDuration+
20;a.stopCallback=d.onEnd;var f=function(){delete a.stopTimeout;a.stop(b)};e?(a.stopTimeout=setTimeout(f,b?e:e-c.sonification.fadeOutDuration),g(d.frequency,"setFrequency",{minFrequency:d.minFrequency,maxFrequency:d.maxFrequency}),g(h(d.volume,1),"setGain",4),g(h(d.pan,0),"setPan")):f()}};f.prototype.mute=function(){this.setGain(.0001,.8*c.sonification.fadeOutDuration)};f.prototype.stop=function(d,a,e){var g=this,b=function(){g.stopOscillatorTimeout&&delete g.stopOscillatorTimeout;try{g.oscillator.stop()}catch(z){}g.oscillator.disconnect(g.gainNode);
g.initOscillator(g.options.oscillator);a&&a(e);g.stopCallback&&g.stopCallback(e)};g.playCallbackTimers.length&&g.clearPlayCallbackTimers();g.stopTimeout&&clearTimeout(g.stopTimeout);d?(g.setGain(0),b()):(g.mute(),g.stopOscillatorTimeout=setTimeout(b,c.sonification.fadeOutDuration+100))};return f});l(b,"Extensions/Sonification/MusicalFrequencies.js",[],function(){return[16.351597831287414,17.323914436054505,18.354047994837977,19.445436482630058,20.601722307054366,21.826764464562746,23.12465141947715,
24.499714748859326,25.956543598746574,27.5,29.13523509488062,30.86770632850775,32.70319566257483,34.64782887210901,36.70809598967594,38.890872965260115,41.20344461410875,43.653528929125486,46.2493028389543,48.999429497718666,51.91308719749314,55,58.27047018976124,61.7354126570155,65.40639132514966,69.29565774421802,73.41619197935188,77.78174593052023,82.4068892282175,87.30705785825097,92.4986056779086,97.99885899543733,103.82617439498628,110,116.54094037952248,123.47082531403103,130.8127826502993,
138.59131548843604,146.8323839587038,155.56349186104046,164.81377845643496,174.61411571650194,184.9972113558172,195.99771799087463,207.65234878997256,220,233.08188075904496,246.94165062806206,261.6255653005986,277.1826309768721,293.6647679174076,311.1269837220809,329.6275569128699,349.2282314330039,369.9944227116344,391.99543598174927,415.3046975799451,440,466.1637615180899,493.8833012561241,523.2511306011972,554.3652619537442,587.3295358348151,622.2539674441618,659.2551138257398,698.4564628660078,
739.9888454232688,783.9908719634985,830.6093951598903,880,932.3275230361799,987.7666025122483,1046.5022612023945,1108.7305239074883,1174.6590716696303,1244.5079348883237,1318.5102276514797,1396.9129257320155,1479.9776908465376,1567.981743926997,1661.2187903197805,1760,1864.6550460723597,1975.533205024496,2093.004522404789,2217.4610478149766,2349.31814333926,2489.0158697766474,2637.02045530296,2793.825851464031,2959.955381693075,3135.9634878539946,3322.437580639561,3520,3729.3100921447194,3951.066410048992,
4186.009044809578]});l(b,"Extensions/Sonification/Utilities.js",[b["Extensions/Sonification/MusicalFrequencies.js"],b["Core/Utilities.js"]],function(b,k){function c(b){this.init(b||[])}var p=k.clamp;c.prototype.init=function(b){this.supportedSignals=b;this.signals={}};c.prototype.registerSignalCallbacks=function(b){var c=this;c.supportedSignals.forEach(function(f){var h=b[f];h&&(c.signals[f]=c.signals[f]||[]).push(h)})};c.prototype.clearSignalCallbacks=function(b){var c=this;b?b.forEach(function(b){c.signals[b]&&
delete c.signals[b]}):c.signals={}};c.prototype.emitSignal=function(b,c){var f;this.signals[b]&&this.signals[b].forEach(function(b){b=b(c);f="undefined"!==typeof b?b:f});return f};return{musicalFrequencies:b,SignalHandler:c,getMusicalScale:function(c){return b.filter(function(b,f){var h=f%12+1;return c.some(function(b){return b===h})})},calculateDataExtremes:function(b,c){return b.series.reduce(function(b,f){f.points.forEach(function(d){d="undefined"!==typeof d[c]?d[c]:d.options[c];b.min=Math.min(b.min,
d);b.max=Math.max(b.max,d)});return b},{min:Infinity,max:-Infinity})},virtualAxisTranslate:function(b,c,f,n){var d=c.max-c.min;b=f.min+Math.abs(f.max-f.min)*(n?c.max-b:b-c.min)/d;return 0<d?p(b,f.min,f.max):f.min}}});l(b,"Extensions/Sonification/InstrumentDefinitions.js",[b["Extensions/Sonification/Instrument.js"],b["Extensions/Sonification/Utilities.js"]],function(b,k){var c={};["sine","square","triangle","sawtooth"].forEach(function(f){c[f]=new b({oscillator:{waveformShape:f}});c[f+"Musical"]=new b({allowedFrequencies:k.musicalFrequencies,
oscillator:{waveformShape:f}});c[f+"Major"]=new b({allowedFrequencies:k.getMusicalScale([1,3,5,6,8,10,12]),oscillator:{waveformShape:f}})});return c});l(b,"Extensions/Sonification/Earcon.js",[b["Core/Globals.js"],b["Core/Utilities.js"]],function(b,k){function c(b){this.init(b||{})}var p=k.error,m=k.merge,h=k.pick,l=k.uniqueKey;c.prototype.init=function(b){this.options=b;this.options.id||(this.options.id=this.id=l());this.instrumentsPlaying={}};c.prototype.sonify=function(c){var d=m(this.options,c),
a=h(d.volume,1),e=d.pan,g=this,f=c&&c.onEnd,n=g.options.onEnd;d.instruments.forEach(function(c){var d="string"===typeof c.instrument?b.sonification.instruments[c.instrument]:c.instrument,q=m(c.playOptions),x="";if(d&&d.play){if(c.playOptions){q.pan=h(e,q.pan);var A=q.onEnd;q.onEnd=function(){delete g.instrumentsPlaying[x];A&&A.apply(this,arguments);Object.keys(g.instrumentsPlaying).length||(f&&f.apply(this,arguments),n&&n.apply(this,arguments))};c=d.copy();c.setMasterVolume(a);x=c.id;g.instrumentsPlaying[x]=
c;c.play(q)}}else p(30)})};c.prototype.cancelSonify=function(b){var c=this.instrumentsPlaying,a=c&&Object.keys(c);a&&a.length&&(a.forEach(function(a){c[a].stop(!b,null,"cancelled")}),this.instrumentsPlaying={})};return c});l(b,"Extensions/Sonification/PointSonify.js",[b["Core/Globals.js"],b["Core/Utilities.js"],b["Extensions/Sonification/Utilities.js"]],function(b,k,f){var c=k.error,m=k.merge,h=k.pick,l={minDuration:20,maxDuration:2E3,minVolume:.1,maxVolume:1,minPan:-1,maxPan:1,minFrequency:220,maxFrequency:2200};
return{pointSonify:function(n){var d,a=this,e=a.series.chart,g=h(n.masterVolume,null===(d=e.options.sonification)||void 0===d?void 0:d.masterVolume),k=n.dataExtremes||{},p=function(b,c,e){if("function"===typeof b)return c?function(c){return b(a,k,c)}:b(a,k);if("string"===typeof b){var d=(c="-"===b.charAt(0))?b.slice(1):b,g=h(a[d],a.options[d]);k[d]=k[d]||f.calculateDataExtremes(a.series.chart,d);return f.virtualAxisTranslate(g,k[d],e,c)}return b};e.sonification.currentlyPlayingPoint=a;a.sonification=
a.sonification||{};a.sonification.instrumentsPlaying=a.sonification.instrumentsPlaying||{};var v=a.sonification.signalHandler=a.sonification.signalHandler||new f.SignalHandler(["onEnd"]);v.clearSignalCallbacks();v.registerSignalCallbacks({onEnd:n.onEnd});!a.isNull&&a.visible&&a.series.visible?n.instruments.forEach(function(d){var f="string"===typeof d.instrument?b.sonification.instruments[d.instrument]:d.instrument,h=d.instrumentMapping||{},k=m(l,d.instrumentOptions),n=f.id,r=function(b){d.onEnd&&
d.onEnd.apply(this,arguments);e.sonification&&e.sonification.currentlyPlayingPoint&&delete e.sonification.currentlyPlayingPoint;a.sonification&&a.sonification.instrumentsPlaying&&(delete a.sonification.instrumentsPlaying[n],Object.keys(a.sonification.instrumentsPlaying).length||v.emitSignal("onEnd",b))};f&&f.play?("undefined"!==typeof g&&f.setMasterVolume(g),a.sonification.instrumentsPlaying[f.id]=f,f.play({frequency:p(h.frequency,!0,{min:k.minFrequency,max:k.maxFrequency}),duration:p(h.duration,
!1,{min:k.minDuration,max:k.maxDuration}),pan:p(h.pan,!0,{min:k.minPan,max:k.maxPan}),volume:p(h.volume,!0,{min:k.minVolume,max:k.maxVolume}),onEnd:r,minFrequency:k.minFrequency,maxFrequency:k.maxFrequency})):c(30)}):v.emitSignal("onEnd")},pointCancelSonify:function(b){var c=this.sonification&&this.sonification.instrumentsPlaying,a=c&&Object.keys(c);a&&a.length&&(a.forEach(function(a){c[a].stop(!b,null,"cancelled")}),this.sonification.instrumentsPlaying={},this.sonification.signalHandler.emitSignal("onEnd",
"cancelled"))}}});l(b,"Extensions/Sonification/ChartSonify.js",[b["Core/Globals.js"],b["Core/Series/Point.js"],b["Core/Utilities.js"],b["Extensions/Sonification/Utilities.js"]],function(b,k,f,p){function c(a,b){return"function"===typeof b?b(a):y(a[b],a.options[b])}function h(a,b){return a.points.reduce(function(a,e){e=c(e,b);a.min=Math.min(a.min,e);a.max=Math.max(a.max,e);return a},{min:Infinity,max:-Infinity})}function l(a,b,c){var e,d=(b||[]).slice(0);b=null===(e=a.options.sonification)||void 0===
e?void 0:e.defaultInstrumentOptions;var t=function(a){return{instrumentMapping:a.mapping}};b&&d.push(t(b));a.series.forEach(function(a){var b;(a=null===(b=a.options.sonification)||void 0===b?void 0:b.instruments)&&(d=d.concat(a.map(t)))});return d.reduce(function(b,c){Object.keys(c.instrumentMapping||{}).forEach(function(e){e=c.instrumentMapping[e];"string"!==typeof e||b[e]||(b[e]=p.calculateDataExtremes(a,e))});return b},u(c))}function n(a,e){return e.reduce(function(e,c){var d=c.earcon;c.condition?
(c=c.condition(a),c instanceof b.sonification.Earcon?e.push(c):c&&e.push(d)):c.onPoint&&a.id===c.onPoint&&e.push(d);return e},[])}function d(a){return a.map(function(a){var c=a.instrument;c=("string"===typeof c?b.sonification.instruments[c]:c).copy();return u(a,{instrument:c})})}function a(a,b){a.forEach(function(a){a=a.instrument;"string"!==typeof a&&a.setMasterVolume(b)});return a}function e(a,b,c){var e=a.points[a.points.length-1];return b.reduce(function(a,b){b=b.instrumentMapping.duration;b=
"string"===typeof b?0:"function"===typeof b?b(e,c):b;return Math.max(a,b)},0)}function g(f,g){var t=g.timeExtremes||h(f,g.pointPlayTime),F=l(f.chart,g.instruments,g.dataExtremes),J=e(f,g.instruments,F),D=y(g.masterVolume,1),C=d(g.instruments),m=a(C,D);C=f.points.reduce(function(a,e){var d=n(e,g.earcons||[]),f=p.virtualAxisTranslate(c(e,g.pointPlayTime),t,{min:0,max:Math.max(g.duration-J,10)});return a.concat(new b.sonification.TimelineEvent({eventObject:e,time:f,id:e.id,playOptions:{instruments:m,
dataExtremes:F,masterVolume:D}}),d.map(function(a){return new b.sonification.TimelineEvent({eventObject:a,time:f,playOptions:{volume:D}})}))},[]);return new b.sonification.TimelinePath({events:C,onStart:function(){if(g.onStart)g.onStart(f)},onEventStart:function(a){var b=a.options&&a.options.eventObject;if(b instanceof k){if(!b.series.visible&&!b.series.chart.series.some(function(a){return a.visible}))return a.timelinePath.timeline.pause(),a.timelinePath.timeline.resetCursor(),!1;if(g.onPointStart)g.onPointStart(a,
b)}},onEventEnd:function(a){var b=a.event&&a.event.options&&a.event.options.eventObject;if(b instanceof k&&g.onPointEnd)g.onPointEnd(a.event,b)},onEnd:function(){if(g.onEnd)g.onEnd(f)},targetDuration:g.duration})}function r(a,b,c){var e,d,g,f=c.seriesOptions||{},t=(null===(g=null===(d=null===(e=a.chart.options.sonification)||void 0===e?void 0:e.defaultInstrumentOptions)||void 0===d?void 0:d.mapping)||void 0===g?void 0:g.pointPlayTime)||"x";e=E(a);return u(e,{dataExtremes:b,timeExtremes:h(a,t),instruments:c.instruments||
e.instruments,onStart:c.onSeriesStart||e.onStart,onEnd:c.onSeriesEnd||e.onEnd,earcons:c.earcons||e.earcons,masterVolume:y(c.masterVolume,e.masterVolume)},K(f)?L(f,function(b){return b.id===y(a.id,a.options.id)})||{}:f,{pointPlayTime:t})}function z(a,e,c){if("sequential"===a||"simultaneous"===a){var d=e.series.reduce(function(a,b){var e;b.visible&&!1!==(null===(e=b.options.sonification)||void 0===e?void 0:e.enabled)&&a.push({series:b,seriesOptions:c(b)});return a},[]);"simultaneous"===a&&(d=[d])}else d=
a.reduce(function(a,d){d=w(d).reduce(function(a,d){var g;if("string"===typeof d){var f=e.get(d);f.visible&&(g={series:f,seriesOptions:c(f)})}else d instanceof b.sonification.Earcon&&(g=new b.sonification.TimelinePath({events:[new b.sonification.TimelineEvent({eventObject:d})]}));d.silentWait&&(g=new b.sonification.TimelinePath({silentWait:d.silentWait}));g&&a.push(g);return a},[]);d.length&&a.push(d);return a},[]);return d}function v(a,e){return e?a.reduce(function(c,d,g){d=w(d);c.push(d);g<a.length-
1&&d.some(function(a){return a.series})&&c.push(new b.sonification.TimelinePath({silentWait:e}));return c},[]):a}function G(a){return a.reduce(function(a,b){b=w(b);return a+(1===b.length&&b[0].options&&b[0].options.silentWait||0)},0)}function q(a){var e=a.reduce(function(a,b){(b=b.events)&&b.length&&(a.min=Math.min(b[0].time,a.min),a.max=Math.max(b[b.length-1].time,a.max));return a},{min:Infinity,max:-Infinity});a.forEach(function(a){var c=a.events,d=c&&c.length,g=[];d&&c[0].time<=e.min||g.push(new b.sonification.TimelineEvent({time:e.min}));
d&&c[c.length-1].time>=e.max||g.push(new b.sonification.TimelineEvent({time:e.max}));g.length&&a.addTimelineEvents(g)})}function x(a){return a.reduce(function(a,b){return a+w(b).reduce(function(a,b){return(b=b.series&&b.seriesOptions&&b.seriesOptions.timeExtremes)?Math.max(a,b.max-b.min):a},0)},0)}function A(a,e){var c=Math.max(e-G(a),0),d=x(a);return a.reduce(function(a,e){e=w(e).reduce(function(a,e){e instanceof b.sonification.TimelinePath?a.push(e):e.series&&(e.seriesOptions.duration=e.seriesOptions.duration||
p.virtualAxisTranslate(e.seriesOptions.timeExtremes.max-e.seriesOptions.timeExtremes.min,{min:0,max:d},{min:0,max:c}),a.push(g(e.series,e.seriesOptions)));return a},[]);a.push(e);return a},[])}function H(a,b){var e,c;if(null===b||void 0===b?0:b.instruments)return b.instruments;var d=(null===(e=a.chart.options.sonification)||void 0===e?void 0:e.defaultInstrumentOptions)||{},g=function(a){M(a,function(b,e){null===b&&delete a[e]})};return((null===(c=a.options.sonification)||void 0===c?void 0:c.instruments)||
[{}]).map(function(a){g(a.mapping||{});g(a);return{instrument:a.instrument||d.instrument,instrumentOptions:u(d,a,{mapping:void 0,instrument:void 0}),instrumentMapping:u(d.mapping,a.mapping)}})}function E(a){var b,e,c=a.options.sonification||{},d=a.chart.options.sonification||{},g=d.events||{},f=c.events||{};return{onEnd:f.onSeriesEnd||g.onSeriesEnd,onStart:f.onSeriesStart||g.onSeriesStart,onPointEnd:f.onPointEnd||g.onPointEnd,onPointStart:f.onPointStart||g.onPointStart,pointPlayTime:null===(e=null===
(b=d.defaultInstrumentOptions)||void 0===b?void 0:b.mapping)||void 0===e?void 0:e.pointPlayTime,masterVolume:d.masterVolume,instruments:H(a),earcons:c.earcons||d.earcons}}function I(a,b){var e,c,d,g,f;a=a.options.sonification||{};return u({duration:a.duration,afterSeriesWait:a.afterSeriesWait,pointPlayTime:null===(c=null===(e=a.defaultInstrumentOptions)||void 0===e?void 0:e.mapping)||void 0===c?void 0:c.pointPlayTime,order:a.order,onSeriesStart:null===(d=a.events)||void 0===d?void 0:d.onSeriesStart,
onSeriesEnd:null===(g=a.events)||void 0===g?void 0:g.onSeriesEnd,onEnd:null===(f=a.events)||void 0===f?void 0:f.onEnd},b)}"";var L=f.find,K=f.isArray,u=f.merge,y=f.pick,w=f.splat,M=f.objectEach;return{chartSonify:function(a){var e=I(this,a);this.sonification.timeline&&this.sonification.timeline.pause();this.sonification.duration=e.duration;var c=l(this,e.instruments,e.dataExtremes);a=z(e.order,this,function(a){return r(a,c,e)});a=v(a,e.afterSeriesWait||0);a=A(a,e.duration);a.forEach(function(a){q(a)});
this.sonification.timeline=new b.sonification.Timeline({paths:a,onEnd:e.onEnd});this.sonification.timeline.play()},seriesSonify:function(a){var e=this.chart.options.sonification,c=this.options.sonification;a=u({duration:(null===c||void 0===c?void 0:c.duration)||(null===e||void 0===e?void 0:e.duration)},E(this),a);e=g(this,a);c=this.chart.sonification;c.timeline&&c.timeline.pause();c.duration=a.duration;c.timeline=new b.sonification.Timeline({paths:[e]});c.timeline.play()},pause:function(a){this.sonification.timeline?
this.sonification.timeline.pause(y(a,!0)):this.sonification.currentlyPlayingPoint&&this.sonification.currentlyPlayingPoint.cancelSonify(a)},resume:function(a){this.sonification.timeline&&this.sonification.timeline.play(a)},rewind:function(a){this.sonification.timeline&&this.sonification.timeline.rewind(a)},cancel:function(a){this.pauseSonify(a);this.resetSonifyCursor()},getCurrentPoints:function(){if(this.sonification.timeline){var a=this.sonification.timeline.getCursor();return Object.keys(a).map(function(b){return a[b].eventObject}).filter(function(a){return a instanceof
k})}return[]},setCursor:function(a){var b=this.sonification.timeline;b&&w(a).forEach(function(a){b.setCursor(a.id)})},resetCursor:function(){this.sonification.timeline&&this.sonification.timeline.resetCursor()},resetCursorEnd:function(){this.sonification.timeline&&this.sonification.timeline.resetCursorEnd()}}});l(b,"Extensions/Sonification/Timeline.js",[b["Core/Globals.js"],b["Core/Utilities.js"],b["Extensions/Sonification/Utilities.js"]],function(b,k,f){function c(a){this.init(a||{})}function m(a){this.init(a)}
function h(a){this.init(a||{})}var l=k.merge,n=k.splat,d=k.uniqueKey;c.prototype.init=function(a){this.options=a;this.time=a.time||0;this.id=this.options.id=a.id||d()};c.prototype.play=function(a){var b=this.options.eventObject,c=this.options.onEnd,d=a&&a.onEnd,f=this.options.playOptions&&this.options.playOptions.onEnd;a=l(this.options.playOptions,a);b&&b.sonify?(a.onEnd=c||d||f?function(){var a=arguments;[c,d,f].forEach(function(b){b&&b.apply(this,a)})}:void 0,b.sonify(a)):(d&&d(),c&&c())};c.prototype.cancel=
function(a){this.options.eventObject.cancelSonify(a)};m.prototype.init=function(a){this.options=a;this.id=this.options.id=a.id||d();this.cursor=0;this.eventsPlaying={};this.events=a.silentWait?[new c({time:0}),new c({time:a.silentWait})]:this.options.events;this.targetDuration=a.targetDuration||a.silentWait;this.sortEvents();this.updateEventIdMap();this.signalHandler=new f.SignalHandler(["playOnEnd","masterOnEnd","onStart","onEventStart","onEventEnd"]);this.signalHandler.registerSignalCallbacks(l(a,
{masterOnEnd:a.onEnd}))};m.prototype.sortEvents=function(){this.events=this.events.sort(function(a,b){return a.time-b.time})};m.prototype.updateEventIdMap=function(){this.eventIdMap=this.events.reduce(function(a,b,c){a[b.id]=c;return a},{})};m.prototype.addTimelineEvents=function(a){this.events=this.events.concat(a);this.sortEvents();this.updateEventIdMap()};m.prototype.getCursor=function(){return this.events[this.cursor]};m.prototype.setCursor=function(a){a=this.eventIdMap[a];return"undefined"!==
typeof a?(this.cursor=a,!0):!1};m.prototype.play=function(a){this.pause();this.signalHandler.emitSignal("onStart");this.signalHandler.clearSignalCallbacks(["playOnEnd"]);this.signalHandler.registerSignalCallbacks({playOnEnd:a});this.playEvents(1)};m.prototype.rewind=function(a){this.pause();this.signalHandler.emitSignal("onStart");this.signalHandler.clearSignalCallbacks(["playOnEnd"]);this.signalHandler.registerSignalCallbacks({playOnEnd:a});this.playEvents(-1)};m.prototype.resetCursor=function(){this.cursor=
0};m.prototype.resetCursorEnd=function(){this.cursor=this.events.length-1};m.prototype.pause=function(a){var b=this;clearTimeout(b.nextScheduledPlay);Object.keys(b.eventsPlaying).forEach(function(c){b.eventsPlaying[c]&&b.eventsPlaying[c].cancel(a)});b.eventsPlaying={}};m.prototype.playEvents=function(a){var b=this,c=b.events[this.cursor],d=b.events[this.cursor+a],f=function(a){b.signalHandler.emitSignal("masterOnEnd",a);b.signalHandler.emitSignal("playOnEnd",a)};c.timelinePath=b;if(!1===b.signalHandler.emitSignal("onEventStart",
c))f({event:c,cancelled:!0});else if(b.eventsPlaying[c.id]=c,c.play({onEnd:function(a){a={event:c,cancelled:!!a};delete b.eventsPlaying[c.id];b.signalHandler.emitSignal("onEventEnd",a);d||f(a)}}),d){var h=Math.abs(d.time-c.time);1>h?(b.cursor+=a,b.playEvents(a)):this.nextScheduledPlay=setTimeout(function(){b.cursor+=a;b.playEvents(a)},h)}};h.prototype.init=function(a){this.options=a;this.cursor=0;this.paths=a.paths||[];this.pathsPlaying={};this.signalHandler=new f.SignalHandler(["playOnEnd","masterOnEnd",
"onPathStart","onPathEnd"]);this.signalHandler.registerSignalCallbacks(l(a,{masterOnEnd:a.onEnd}))};h.prototype.play=function(a){this.pause();this.signalHandler.clearSignalCallbacks(["playOnEnd"]);this.signalHandler.registerSignalCallbacks({playOnEnd:a});this.playPaths(1)};h.prototype.rewind=function(a){this.pause();this.signalHandler.clearSignalCallbacks(["playOnEnd"]);this.signalHandler.registerSignalCallbacks({playOnEnd:a});this.playPaths(-1)};h.prototype.playPaths=function(a){var c=this,d=c.signalHandler;
if(c.paths.length){var f=n(this.paths[this.cursor]),h=this.paths[this.cursor+a],k=0,m=function(b){d.emitSignal("onPathStart",b);c.pathsPlaying[b.id]=b;b[0<a?"play":"rewind"](function(e){e=e&&e.cancelled;var g={path:b,cancelled:e};delete c.pathsPlaying[b.id];d.emitSignal("onPathEnd",g);k++;k>=f.length&&(h&&!e?(c.cursor+=a,n(h).forEach(function(b){b[0<a?"resetCursor":"resetCursorEnd"]()}),c.playPaths(a)):(d.emitSignal("playOnEnd",g),d.emitSignal("masterOnEnd",g)))})};f.forEach(function(a){a&&(a.timeline=
c,setTimeout(function(){m(a)},b.sonification.fadeOutDuration))})}else{var l={cancelled:!1};d.emitSignal("playOnEnd",l);d.emitSignal("masterOnEnd",l)}};h.prototype.pause=function(a){var b=this;Object.keys(b.pathsPlaying).forEach(function(c){b.pathsPlaying[c]&&b.pathsPlaying[c].pause(a)});b.pathsPlaying={}};h.prototype.resetCursor=function(){this.paths.forEach(function(a){n(a).forEach(function(a){a.resetCursor()})});this.cursor=0};h.prototype.resetCursorEnd=function(){this.paths.forEach(function(a){n(a).forEach(function(a){a.resetCursorEnd()})});
this.cursor=this.paths.length-1};h.prototype.setCursor=function(a){return this.paths.some(function(b){return n(b).some(function(b){return b.setCursor(a)})})};h.prototype.getCursor=function(){return this.getCurrentPlayingPaths().reduce(function(a,b){a[b.id]=b.getCursor();return a},{})};h.prototype.atStart=function(){return this.cursor?!1:!n(this.paths[0]).some(function(a){return a.cursor})};h.prototype.getCurrentPlayingPaths=function(){return this.paths.length?n(this.paths[this.cursor]):[]};return{TimelineEvent:c,
TimelinePath:m,Timeline:h}});l(b,"Extensions/Sonification/Options.js",[],function(){return{sonification:{enabled:!1,duration:2500,afterSeriesWait:700,masterVolume:1,order:"sequential",defaultInstrumentOptions:{instrument:"sineMusical",minFrequency:392,maxFrequency:1046,mapping:{pointPlayTime:"x",duration:200,frequency:"y"}}}}});l(b,"Extensions/Sonification/Sonification.js",[b["Core/Chart/Chart.js"],b["Core/Globals.js"],b["Core/Options.js"],b["Core/Series/Point.js"],b["Core/Series/Series.js"],b["Core/Utilities.js"],
b["Extensions/Sonification/Instrument.js"],b["Extensions/Sonification/InstrumentDefinitions.js"],b["Extensions/Sonification/Earcon.js"],b["Extensions/Sonification/PointSonify.js"],b["Extensions/Sonification/ChartSonify.js"],b["Extensions/Sonification/Utilities.js"],b["Extensions/Sonification/Timeline.js"],b["Extensions/Sonification/Options.js"]],function(b,k,f,l,m,h,B,n,d,a,e,g,r,z){f=f.defaultOptions;var c=h.addEvent,p=h.extend,q=h.merge;k.sonification={fadeOutDuration:20,utilities:g,Instrument:B,
instruments:n,Earcon:d,TimelineEvent:r.TimelineEvent,TimelinePath:r.TimelinePath,Timeline:r.Timeline};q(!0,f,z);l.prototype.sonify=a.pointSonify;l.prototype.cancelSonify=a.pointCancelSonify;m.prototype.sonify=e.seriesSonify;p(b.prototype,{sonify:e.chartSonify,pauseSonify:e.pause,resumeSonify:e.resume,rewindSonify:e.rewind,cancelSonify:e.cancel,getCurrentSonifyPoints:e.getCurrentPoints,setSonifyCursor:e.setCursor,resetSonifyCursor:e.resetCursor,resetSonifyCursorEnd:e.resetCursorEnd});c(b,"init",function(){this.sonification=
{}});c(b,"update",function(a){(a=a.options.sonification)&&q(!0,this.options.sonification,a)})});l(b,"masters/modules/sonification.src.js",[],function(){})});
//# sourceMappingURL=sonification.js.map