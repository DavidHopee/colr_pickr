/*!
 * Colr Pickr
 *
 * R-TEK
 *
 * https://github.com/R-TEK/colr_pickr
 *
 * MIT License
 */
let colorPicker={instance:null,boxStatus:!1,boxStatusTouch:!1,sliderStatus:!1,sliderStatusTouch:!1,opacityStatus:!1,opacityStatusTouch:!1,colorTypeStatus:"HEXA",hue:0,saturation:100,lightness:50,alpha:1,contextMenuElem:null,doubleTapTime:0};function ColorPicker(t,e){this.element=t,t.colorPickerObj=this,t.setAttribute("data-color",e),t.style.background=e,t.addEventListener("click",(function(t){colorPicker.instance=t.target.colorPickerObj,document.getElementById("color_picker").style.display="block",document.getElementById("color_picker_bg").style.display="block","undefined"!=t.target.getAttribute("data-color")&&updateColorDisplays(t.target.getAttribute("data-color"))}))}function colorChange(t,e){const o=new CustomEvent("colorChange",{detail:{color:t}}),l=void 0===e?colorPicker.instance.element:e;l.setAttribute("data-color",t),l.style.background=t,l.dispatchEvent(o)}window.LSCustomColors={0:[]},function(){const t=document.createElement("ASIDE");t.id="color_picker",t.innerHTML='\n\t\t<svg id="color_box" width="348" height="185">\n\t\t\t<defs>\n\t\t\t\t<linearGradient id="saturation" x1="0%" y1="0%" x2="100%" y2="0%">\n\t\t\t\t\t<stop offset="0%" stop-color="#fff"></stop>\n\t\t\t\t\t<stop offset="100%" stop-color="hsl(0,100%,50%)"></stop>\n\t\t\t\t</linearGradient>\n\t\t\t\t<linearGradient id="brightness" x1="0%" y1="0%" x2="0%" y2="100%">\n\t\t\t\t\t<stop offset="0%" stop-color="rgba(0,0,0,0)"></stop>\n\t\t\t\t\t<stop offset="100%" stop-color="#000"></stop>\n\t\t\t\t</linearGradient>\n\t\t\t\t<pattern id="pattern_config" width="100%" height="100%">\n\t\t\t\t\t<rect x="0" y="0" width="100%" height="100%" fill="url(#saturation)"></rect> }\n\t\t\t\t\t<rect x="0" y="0" width="100%" height="100%" fill="url(#brightness)"></rect>\n\t\t\t\t</pattern>\n\t\t\t</defs>\n\t\t\t<rect rx="5" ry="5" x="1" y="1" width="348" height="185" stroke="#fff" stroke-width="2" fill="url(#pattern_config)"></rect>\n\t\t\t<svg id="box_dragger" x="336" y="14" style="overflow: visible;">\n\t\t\t\t<circle r="9" fill="none" stroke="#000" stroke-width="2"></circle>\n\t\t\t\t<circle r="7" fill="none" stroke="#fff" stroke-width="2"></circle>\n\t\t\t</svg>\n\t\t</svg>\n\t\t<br>\n\t\t<svg id="color_picked_preview" width="40" height="50">\n\t\t\t<circle cx="20" cy="29" r="18" stroke="#a7a7a7" stroke-width="1"></circle>\n\t\t</svg>\n\t\t<div id="sliders">\n\t\t\t<svg id="color_slider" width="285" height="20">\n\t\t\t\t<defs>\n\t\t\t\t\t<linearGradient id="hue" x1="100%" y1="0%" x2="0%" y2="0%">\n\t\t\t\t\t\t<stop offset="0%" stop-color="#f00"></stop>\n\t\t\t\t\t\t<stop offset="16.666%" stop-color="#ff0"></stop>\n\t\t\t\t\t\t<stop offset="33.333%" stop-color="#0f0"></stop>\n\t\t\t\t\t\t<stop offset="50%" stop-color="#0ff"></stop>\n\t\t\t\t\t\t<stop offset="66.666%" stop-color="#00f"></stop>\n\t\t\t\t\t\t<stop offset="83.333%" stop-color="#f0f"></stop>\n\t\t\t\t\t\t<stop offset="100%" stop-color="#f00"></stop>\n\t\t\t\t\t</linearGradient>\n\t\t\t\t</defs>\n\t\t\t\t<rect rx="5" ry="5" x="1" y="1" width="285" height="20" stroke="#fff" stroke-width="2" fill="url(#hue)"></rect>\n\t\t\t\t<svg id="color_slider_dragger" x="277" y="11" style="overflow: visible;">\n\t\t\t\t\t<circle r="7" fill="none" stroke="#000" stroke-width="2"></circle>\n\t\t\t\t\t<circle r="5" fill="none" stroke="#fff" stroke-width="2"></circle>\n\t\t\t\t</svg>\n\t\t\t</svg>\n\t\t\t<svg id="opacity_slider" width="285" height="20">\n\t\t\t\t<defs>\n\t\t\t\t\t<linearGradient id="opacity" x1="100%" y1="0%" x2="0%" y2="0%">\n\t\t\t\t\t\t<stop offset="0%" stop-color="#000"></stop>\n\t\t\t\t\t\t<stop offset="100%" stop-color="#fff"></stop>\n\t\t\t\t\t</linearGradient>\n\t\t\t\t</defs>\n\t\t\t\t<rect rx="5" ry="5" x="1" y="6" width="285" height="10" stroke="#fff" stroke-width="2" fill="url(#opacity)"></rect>\n\t\t\t\t<svg id="opacity_slider_dragger" x="277" y="11" style="overflow: visible;">\n\t\t\t\t\t<circle r="7" fill="none" stroke="#000" stroke-width="2"></circle>\n\t\t\t\t\t<circle r="5" fill="none" stroke="#fff" stroke-width="2"></circle>\n\t\t\t\t</svg>\n\t\t\t</svg>\n\t\t</div>\n\t\t<div id="color_text_values">\n\t\t\t<button id="switch_color_type" name="switch-color-type">\n\t\t\t\t<svg viewBox="0 0 24 24" width="20" height="20">\n\t\t\t\t\t<path fill="#555" d="M6 11v-4l-6 5 6 5v-4h12v4l6-5-6-5v4z"/>\n\t\t\t\t</svg>\n\t\t\t</button>\n\t\t\t<div id="hexa">\n\t\t\t\t<input id="hex_input" name="hex_input" type="text" maxlength="9" spellcheck="false" />\n\t\t\t\t<br>\n\t\t\t\t<label for="hex_input" class="label_text">HEX</label>\n\t\t\t</div>\n\t\t\t<div id="rgba" style="display: none;">\n\t\t\t\t<div class="rgba_divider">\n\t\t\t\t\t<input class="rgba_input" name="r" type="number" min="0" max="255" />\n\t\t\t\t\t<br>\n\t\t\t\t\t<label for="r" class="label_text">R</label>\n\t\t\t\t</div>\n\t\t\t\t<div class="rgba_divider">\n\t\t\t\t\t<input class="rgba_input" name="g" type="number" min="0" max="255" />\n\t\t\t\t\t<br>\n\t\t\t\t\t<label for="g" class="label_text">G</label>\n\t\t\t\t</div>\n\t\t\t\t<div class="rgba_divider">\n\t\t\t\t\t<input class="rgba_input" name="b" type="number" min="0" max="255" />\n\t\t\t\t\t<br>\n\t\t\t\t\t<label for="b" class="label_text">B</label>\n\t\t\t\t</div>\n\t\t\t\t<div class="rgba_divider">\n\t\t\t\t\t<input class="rgba_input" name="a" type="number" step="0.1" min="0" max="1" />\n\t\t\t\t\t<br>\n\t\t\t\t\t<label for="a" class="label_text">A</label>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div id="hsla" style="display: none;">\n\t\t\t\t<div class="hsla_divider">\n\t\t\t\t\t<input class="hsla_input" name="h" type="number" min="0" max="359" />\n\t\t\t\t\t<br>\n\t\t\t\t\t<label for="h" class="label_text">H</label>\n\t\t\t\t</div>\n\t\t\t\t<div class="hsla_divider">\n\t\t\t\t\t<input class="hsla_input" name="s" type="number" min="0" max="100" />\n\t\t\t\t\t<br>\n\t\t\t\t\t<label for="s" class="label_text">S%</label>\n\t\t\t\t</div>\n\t\t\t\t<div class="hsla_divider">\n\t\t\t\t\t<input class="hsla_input" name="l" type="number" min="0" max="100" />\n\t\t\t\t\t<br>\n\t\t\t\t\t<label for="l" class="label_text">L%</label>\n\t\t\t\t</div>\n\t\t\t\t<div class="rgba_divider">\n\t\t\t\t\t<input class="hsla_input" name="a" type="number" step="0.1" min="0" max="1" />\n\t\t\t\t\t<br>\n\t\t\t\t\t<label for="a" class="label_text">A</label>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div id="custom_colors">\n\t\t\t<h6 id="custom_colors_title">Custom Colors:</h6>\n\t\t\t<div id="custom_colors_box">\n\t\t\t\t<button id="custom_colors_add" name="add-a-custom-color">\n\t\t\t\t<svg viewBox="0 0 24 24" width="12" height="14">\n\t\t\t\t\t<path fill="#555" d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/>\n\t\t\t\t</svg>\n\t\t\t\t</button>\n\t\t\t</div>\n\t\t</div>\n\t\t<div id="color_context_menu" class="color_ctx_menu">\n\t\t\t<button id="color_clear_single" class="color_ctx_menu" name="remove-single-color">Remove Color</button>\n\t\t\t<button id="color_clear_all" class="color_ctx_menu" name="remove-all-colors">Remove All</button>\n\t\t</div>\n\t',document.getElementsByTagName("BODY")[0].appendChild(t);const e=document.createElement("DIV");if(e.id="color_picker_bg",document.getElementsByTagName("BODY")[0].appendChild(e),null===localStorage.getItem("custom_colors"))localStorage.setItem("custom_colors",'{"0": []}');else{window.LSCustomColors=JSON.parse(localStorage.getItem("custom_colors"));for(let t=window.LSCustomColors[0].length-1;t>=0;t--){let e=document.createElement("BUTTON");e.className="custom_colors_preview",e.style.background=window.LSCustomColors[0][t],e.setAttribute("data-custom-color",window.LSCustomColors[0][t]),document.getElementById("custom_colors_box").appendChild(e)}28==window.LSCustomColors[0].length&&(document.getElementById("custom_colors_add").style.display="none")}}(),document.addEventListener("mousedown",(function(){"color_context_menu"!=event.target.id&&(document.getElementById("color_context_menu").style.display="none")})),document.getElementById("color_picker_bg").addEventListener("click",(function(){document.getElementById("color_picker").style.display="none",document.getElementById("color_picker_bg").style.display="none",colorChange(`hsl(${colorPicker.hue}, ${colorPicker.saturation}%, ${colorPicker.lightness}%, ${colorPicker.alpha})`)}));let HSLAToRGBA=function(t,e,o,l,n){e/=100,o/=100;let r=(1-Math.abs(2*o-1))*e,c=r*(1-Math.abs(t/60%2-1)),s=o-r/2,i=0,a=0,u=0;return 0<=t&&t<60?(i=r,a=c,u=0):60<=t&&t<120?(i=c,a=r,u=0):120<=t&&t<180?(i=0,a=r,u=c):180<=t&&t<240?(i=0,a=c,u=r):240<=t&&t<300?(i=c,a=0,u=r):300<=t&&t<360&&(i=r,a=0,u=c),i=Math.round(255*(i+s)),a=Math.round(255*(a+s)),u=Math.round(255*(u+s)),!0===n?RGBAToHexA(i,a,u,l):{r:i,g:a,b:u,a:l}},RGBAToHSLA=function(t,e,o,l){t/=255,e/=255,o/=255,l=null==l?1:l;let n=Math.min(t,e,o),r=Math.max(t,e,o),c=r-n,s=0,i=0,a=0;return s=0==c?0:r==t?(e-o)/c%6:r==e?(o-t)/c+2:(t-e)/c+4,s=Math.round(60*s),s<0&&(s+=360),a=(r+n)/2,i=0==c?0:c/(1-Math.abs(2*a-1)),i=+(100*i).toFixed(1),a=+(100*a).toFixed(1),{h:s,s:i,l:a,a:l}},RGBAToHexA=function(t,e,o,l){return t=t.toString(16),e=e.toString(16),o=o.toString(16),l=Math.round(255*l).toString(16),1==t.length&&(t="0"+t),1==e.length&&(e="0"+e),1==o.length&&(o="0"+o),1==l.length&&(l="0"+l),"ff"==l?"#"+t+e+o:"#"+t+e+o+l},hexAToRGBA=function(t,e){7==t.length?t+="ff":4==t.length&&(t+=t.substring(1,4)+"ff");let o=0,l=0,n=0,r=1;return 5==t.length?(o="0x"+t[1]+t[1],l="0x"+t[2]+t[2],n="0x"+t[3]+t[3],r="0x"+t[4]+t[4]):9==t.length&&(o="0x"+t[1]+t[2],l="0x"+t[3]+t[4],n="0x"+t[5]+t[6],r="0x"+t[7]+t[8]),r=+(r/255).toFixed(3),!0===e?RGBAToHSLA(+o,+l,+n,r):"rgba("+ +o+","+ +l+","+ +n+","+r+")"},switchColorType=function(){if("HEXA"==colorPicker.colorTypeStatus){colorPicker.colorTypeStatus="RGBA",document.getElementById("hexa").style.display="none",document.getElementById("rgba").style.display="block";const t=HSLAToRGBA(colorPicker.hue,colorPicker.saturation,colorPicker.lightness,colorPicker.alpha);document.getElementsByClassName("rgba_input")[0].value=t.r,document.getElementsByClassName("rgba_input")[1].value=t.g,document.getElementsByClassName("rgba_input")[2].value=t.b,document.getElementsByClassName("rgba_input")[3].value=t.a}else if("RGBA"==colorPicker.colorTypeStatus)colorPicker.colorTypeStatus="HSLA",document.getElementById("rgba").style.display="none",document.getElementById("hsla").style.display="block",document.getElementsByClassName("hsla_input")[0].value=colorPicker.hue,document.getElementsByClassName("hsla_input")[1].value=colorPicker.saturation,document.getElementsByClassName("hsla_input")[2].value=colorPicker.lightness,document.getElementsByClassName("hsla_input")[3].value=colorPicker.alpha;else if("HSLA"==colorPicker.colorTypeStatus){colorPicker.colorTypeStatus="HEXA",document.getElementById("hsla").style.display="none",document.getElementById("hexa").style.display="block";const t=HSLAToRGBA(colorPicker.hue,colorPicker.saturation,colorPicker.lightness,colorPicker.alpha,!0);document.getElementById("hex_input").value=t}};document.getElementById("switch_color_type").addEventListener("click",(function(){switchColorType()})),document.getElementById("hex_input").addEventListener("blur",(function(){const t=this.value;t.match(/^#[0-9a-f]{3}([0-9a-f]{3})?([0-9a-f]{2})?$/)&&updateColorDisplays(t)})),document.querySelectorAll(".rgba_input").forEach(t=>{t.addEventListener("change",(function(){const t=document.querySelectorAll(".rgba_input");if(t[0].value>255)throw"Value must be below 256";if(t[1].value>255)throw"Value must be below 256";if(t[2].value>255)throw"Value must be below 256";if(t[3].value>1)throw"Value must be equal to or below 1";updateColorDisplays(`rgba(${t[0].value}, ${t[1].value}, ${t[2].value}, ${t[3].value})`)}))}),document.querySelectorAll(".hsla_input").forEach(t=>{t.addEventListener("change",(function(){const t=document.querySelectorAll(".hsla_input");if(t[0].value>359)throw"Value must be below 360";if(t[1].value>100)throw"Value must be below 100";if(t[2].value>100)throw"Value must be below 100";if(t[3].value>1)throw"Value must be equal to or below 1";updateColorDisplays(`hsl(${t[0].value}, ${t[1].value}%, ${t[2].value}%, ${t[3].value})`)}))}),document.getElementById("custom_colors_box").addEventListener("click",(function(t){if("custom_colors_preview"==t.target.className){const e=t.target.getAttribute("data-custom-color");updateColorDisplays(e)}}));let addCustomColor=function(){27==window.LSCustomColors[0].length&&(document.getElementById("custom_colors_add").style.display="none");const t=`hsl(${colorPicker.hue}, ${colorPicker.saturation}%, ${colorPicker.lightness}%, ${colorPicker.alpha})`;let e=document.createElement("BUTTON");e.className="custom_colors_preview",e.style.background=t,e.setAttribute("data-custom-color",t),document.getElementById("custom_colors_box").appendChild(e),window.LSCustomColors[0].unshift(t),localStorage.setItem("custom_colors",JSON.stringify(window.LSCustomColors))};document.getElementById("custom_colors_add").addEventListener("mouseup",(function(){addCustomColor()})),document.getElementById("custom_colors_box").addEventListener("contextmenu",(function(t){if("custom_colors_preview"==t.target.className){t.preventDefault();const e=document.getElementById("color_context_menu");e.style.display="block",e.style.top=t.target.getBoundingClientRect().top+25+"px",e.style.left=t.target.getBoundingClientRect().left+"px",colorPicker.contextMenuElem=t.target}}));let clearSingleCustomColor=function(t){const e=void 0===t?colorPicker.contextMenuElem:t;document.getElementById("custom_colors_box").removeChild(e),window.LSCustomColors={0:[]};for(let t in document.getElementsByClassName("custom_colors_preview"))!0!==isNaN(t)&&window.LSCustomColors[0].push(document.getElementsByClassName("custom_colors_preview")[t].getAttribute("data-custom-color"));localStorage.setItem("custom_colors",JSON.stringify(window.LSCustomColors)),document.getElementById("custom_colors_add").style.display="inline-block"};document.getElementById("color_clear_single").addEventListener("mousedown",(function(){clearSingleCustomColor()}));let clearSingleCustomColorTouch=function(t){if("custom_colors_preview"==t.target.className){const e=(new Date).getTime()-colorPicker.doubleTapTime;e<200&&e>0?clearSingleCustomColor(t.target):colorPicker.doubleTapTime=(new Date).getTime()}};document.getElementById("custom_colors_box").addEventListener("touchstart",(function(){clearSingleCustomColorTouch(event)}),{passive:!0});let clearAllCustomColors=function(){for(window.LSCustomColors={0:[]};document.getElementsByClassName("custom_colors_preview").length>0;)document.getElementById("custom_colors_box").removeChild(document.getElementsByClassName("custom_colors_preview")[0]);localStorage.setItem("custom_colors",JSON.stringify(window.LSCustomColors)),document.getElementById("custom_colors_add").style.display="inline-block"};document.getElementById("color_clear_all").addEventListener("mousedown",(function(){clearAllCustomColors()}));let colorSliderHandler=function(t){const e=document.getElementById("color_slider"),o=document.getElementById("color_slider_dragger");let l=t-e.getBoundingClientRect().left;l<11&&(l=11),l>277&&(l=277),o.attributes.x.nodeValue=l;const n=(l-11)/266*100,r=Math.round(359-3.59*n);colorPicker.hue=r;const c=`hsl(${r}, ${colorPicker.saturation}%, ${colorPicker.lightness}%, ${colorPicker.alpha})`;document.getElementById("color_picked_preview").children[0].setAttribute("fill",c),document.getElementById("saturation").children[1].attributes[1].nodeValue=`hsl(${r}, 100%, 50%)`,updateColorValueInput()};document.getElementById("color_slider").addEventListener("mousedown",(function(t){colorPicker.sliderStatus=!0,colorSliderHandler(t.pageX)})),document.addEventListener("mousemove",(function(t){!0===colorPicker.sliderStatus&&colorSliderHandler(t.pageX)})),document.addEventListener("mouseup",(function(){!0===colorPicker.sliderStatus&&(colorPicker.sliderStatus=!1)})),document.getElementById("color_slider").addEventListener("touchstart",(function(t){colorPicker.sliderStatusTouch=!0,colorSliderHandler(t.changedTouches[0].clientX)}),{passive:!0}),document.addEventListener("touchmove",(function(){!0===colorPicker.sliderStatusTouch&&(event.preventDefault(),colorSliderHandler(event.changedTouches[0].clientX))}),{passive:!1}),document.addEventListener("touchend",(function(){!0===colorPicker.sliderStatusTouch&&(colorPicker.sliderStatusTouch=!1)}));let opacitySliderHandler=function(t){const e=document.getElementById("opacity_slider"),o=document.getElementById("opacity_slider_dragger");let l=t-e.getBoundingClientRect().left;l<11&&(l=11),l>277&&(l=277),o.attributes.x.nodeValue=l;let n=.01*((l-11)/266*100);n=Number(Math.round(n+"e2")+"e-2"),colorPicker.alpha=n;const r=`hsl(${colorPicker.hue}, ${colorPicker.saturation}%, ${colorPicker.lightness}%, ${n})`;document.getElementById("color_picked_preview").children[0].setAttribute("fill",r),updateColorValueInput()};document.getElementById("opacity_slider").addEventListener("mousedown",(function(t){colorPicker.opacityStatus=!0,opacitySliderHandler(t.pageX)})),document.addEventListener("mousemove",(function(t){!0===colorPicker.opacityStatus&&opacitySliderHandler(t.pageX)})),document.addEventListener("mouseup",(function(){!0===colorPicker.opacityStatus&&(colorPicker.opacityStatus=!1)})),document.getElementById("opacity_slider").addEventListener("touchstart",(function(t){colorPicker.opacityStatusTouch=!0,opacitySliderHandler(t.changedTouches[0].clientX)}),{passive:!0}),document.addEventListener("touchmove",(function(){!0===colorPicker.opacityStatusTouch&&(event.preventDefault(),opacitySliderHandler(event.changedTouches[0].clientX))}),{passive:!1}),document.addEventListener("touchend",(function(){!0===colorPicker.opacityStatusTouch&&(colorPicker.opacityStatusTouch=!1)}));let colorBoxHandler=function(t,e,o){const l=document.getElementById("color_box"),n=document.getElementById("box_dragger");let r=t-l.getBoundingClientRect().left,c=!0===o?e-l.getBoundingClientRect().top:e-l.getBoundingClientRect().top-document.getElementsByTagName("HTML")[0].scrollTop;r<14&&(r=14),r>336&&(r=336),c<14&&(c=14),c>173&&(c=173),n.attributes.y.nodeValue=c,n.attributes.x.nodeValue=r;const s=Math.round((r-15)/322*100),i=100-s/2,a=100-(c-15)/159*100;let u=Math.floor(a/100*i);colorPicker.saturation=s,colorPicker.lightness=u;const d=`hsl(${colorPicker.hue}, ${s}%, ${u}%, ${colorPicker.alpha})`;document.getElementById("color_picked_preview").children[0].setAttribute("fill",d),updateColorValueInput()};document.getElementById("color_box").addEventListener("mousedown",(function(t){colorPicker.boxStatus=!0,colorBoxHandler(t.pageX,t.pageY)})),document.addEventListener("mousemove",(function(t){!0===colorPicker.boxStatus&&colorBoxHandler(t.pageX,t.pageY)})),document.addEventListener("mouseup",(function(t){!0===colorPicker.boxStatus&&(colorPicker.boxStatus=!1)})),document.getElementById("color_box").addEventListener("touchstart",(function(t){colorPicker.boxStatusTouch=!0,colorBoxHandler(t.changedTouches[0].clientX,t.changedTouches[0].clientY,!0)}),{passive:!0}),document.addEventListener("touchmove",(function(){!0===colorPicker.boxStatusTouch&&(event.preventDefault(),colorBoxHandler(event.changedTouches[0].clientX,event.changedTouches[0].clientY,!0))}),{passive:!1}),document.addEventListener("touchend",(function(){!0===colorPicker.boxStatusTouch&&(colorPicker.boxStatusTouch=!1)}));let updateColorDisplays=function(t){if("#"==t.substring(0,1))t=hexAToRGBA(t,!0);else if("r"==t.substring(0,1)){const e=t.match(/[.?\d]+/g);e[3]=null==e[3]?1:e[3],t=RGBAToHSLA(e[0],e[1],e[2],e[3])}else{const e=t.match(/[.?\d]+/g);e[3]=null==e[3]?1:e[3],t={h:e[0],s:e[1],l:e[2],a:e[3]}}colorPicker.hue=t.h,colorPicker.saturation=t.s,colorPicker.lightness=t.l,colorPicker.alpha=t.a,updateColorValueInput(),document.getElementById("color_picked_preview").children[0].setAttribute("fill",`hsl(${t.h}, ${t.s}%, ${t.l}%, ${t.a}`),document.getElementById("saturation").children[1].attributes[1].nodeValue=`hsl(${t.h}, 100%, 50%)`;const e=document.getElementById("box_dragger");let o,l;l=1.59*(100-t.l/(100-t.s/2)*100)+14,o=3.22*t.s+14,e.attributes.x.nodeValue=o,e.attributes.y.nodeValue=l;const n=document.getElementById("color_slider_dragger");let r=2.66*(100-t.h/359*100)+11;n.attributes.x.nodeValue=r;const c=document.getElementById("opacity_slider_dragger");let s=100*t.a*2.66+11;c.attributes.x.nodeValue=s},updateColorValueInput=function(){if("HEXA"==colorPicker.colorTypeStatus){const t=HSLAToRGBA(colorPicker.hue,colorPicker.saturation,colorPicker.lightness,colorPicker.alpha,!0);document.getElementById("hex_input").value=t}else if("RGBA"==colorPicker.colorTypeStatus){const t=HSLAToRGBA(colorPicker.hue,colorPicker.saturation,colorPicker.lightness,colorPicker.alpha);document.getElementsByClassName("rgba_input")[0].value=t.r,document.getElementsByClassName("rgba_input")[1].value=t.g,document.getElementsByClassName("rgba_input")[2].value=t.b,document.getElementsByClassName("rgba_input")[3].value=t.a}else document.getElementsByClassName("hsla_input")[0].value=colorPicker.hue,document.getElementsByClassName("hsla_input")[1].value=colorPicker.saturation,document.getElementsByClassName("hsla_input")[2].value=colorPicker.lightness,document.getElementsByClassName("hsla_input")[3].value=colorPicker.alpha};