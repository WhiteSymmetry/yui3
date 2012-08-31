YUI.add("imageloader",function(c,b){c.ImgLoadGroup=function(){this._init();c.ImgLoadGroup.superclass.constructor.apply(this,arguments);};c.ImgLoadGroup.NAME="imgLoadGroup";c.ImgLoadGroup.ATTRS={name:{value:""},timeLimit:{value:null},foldDistance:{validator:c.Lang.isNumber,setter:function(e){this._setFoldTriggers();return e;},lazyAdd:false},className:{value:null,setter:function(e){this._className=e;return e;},lazyAdd:false},classNameAction:{value:"default"}};var d={_init:function(){this._triggers=[];this._imgObjs={};this._timeout=null;this._classImageEls=null;this._className=null;this._areFoldTriggersSet=false;this._maxKnownHLimit=0;c.on("domready",this._onloadTasks,this);},addTrigger:function(g,f){if(!g||!f){return this;}var e=function(){this.fetch();};this._triggers.push(c.on(f,e,g,this));return this;},addCustomTrigger:function(e,g){if(!e){return this;}var f=function(){this.fetch();};if(c.Lang.isUndefined(g)){this._triggers.push(c.on(e,f,this));}else{this._triggers.push(g.on(e,f,this));}return this;},_setFoldTriggers:function(){if(this._areFoldTriggersSet){return;}var e=function(){this._foldCheck();};this._triggers.push(c.on("scroll",e,window,this));this._triggers.push(c.on("resize",e,window,this));this._areFoldTriggersSet=true;},_onloadTasks:function(){var e=this.get("timeLimit");if(e&&e>0){this._timeout=setTimeout(this._getFetchTimeout(),e*1000);}if(!c.Lang.isUndefined(this.get("foldDistance"))){this._foldCheck();}},_getFetchTimeout:function(){var e=this;return function(){e.fetch();};},registerImage:function(){var e=arguments[0].domId;if(!e){return null;}this._imgObjs[e]=new c.ImgLoadImgObj(arguments[0]);return this._imgObjs[e];},fetch:function(){this._clearTriggers();this._fetchByClass();for(var e in this._imgObjs){if(this._imgObjs.hasOwnProperty(e)){this._imgObjs[e].fetch();}}},_clearTriggers:function(){clearTimeout(this._timeout);for(var f=0,e=this._triggers.length;f<e;f++){this._triggers[f].detach();}},_foldCheck:function(){var k=true,l=c.DOM.viewportRegion(),j=l.bottom+this.get("foldDistance"),m,f,h,g,e;if(j<=this._maxKnownHLimit){return;}this._maxKnownHLimit=j;for(m in this._imgObjs){if(this._imgObjs.hasOwnProperty(m)){f=this._imgObjs[m].fetch(j);k=k&&f;}}if(this._className){if(this._classImageEls===null){this._classImageEls=[];h=c.all("."+this._className);h.each(function(i){this._classImageEls.push({el:i,y:i.getY(),fetched:false});},this);}h=this._classImageEls;for(g=0,e=h.length;g<e;g++){if(h[g].fetched){continue;}if(h[g].y&&h[g].y<=j){this._updateNodeClassName(h[g].el);h[g].fetched=true;}else{k=false;}}}if(k){this._clearTriggers();}},_updateNodeClassName:function(f){var e;if(this.get("classNameAction")=="enhanced"){if(f.get("tagName").toLowerCase()=="img"){e=f.getStyle("backgroundImage");/url\(["']?(.*?)["']?\)/.test(e);e=RegExp.$1;f.set("src",e);f.setStyle("backgroundImage","");}}f.removeClass(this._className);},_fetchByClass:function(){if(!this._className){return;}c.all("."+this._className).each(c.bind(this._updateNodeClassName,this));}};c.extend(c.ImgLoadGroup,c.Base,d);c.ImgLoadImgObj=function(){c.ImgLoadImgObj.superclass.constructor.apply(this,arguments);this._init();};c.ImgLoadImgObj.NAME="imgLoadImgObj";c.ImgLoadImgObj.ATTRS={domId:{value:null,writeOnce:true},bgUrl:{value:null},srcUrl:{value:null},width:{value:null},height:{value:null},setVisible:{value:false},isPng:{value:false},sizingMethod:{value:"scale"},enabled:{value:"true"}};var a={_init:function(){this._fetched=false;this._imgEl=null;this._yPos=null;},fetch:function(g){if(this._fetched){return true;}var e=this._getImgEl(),f;if(!e){return false;}if(g){f=this._getYPos();if(!f||f>g){return false;}}if(this.get("bgUrl")!==null){if(this.get("isPng")&&c.UA.ie&&c.UA.ie<=6){e.setStyle("filter",'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+this.get("bgUrl")+'", sizingMethod="'+this.get("sizingMethod")+'", enabled="'+this.get("enabled")+'")');}else{e.setStyle("backgroundImage","url('"+this.get("bgUrl")+"')");}}else{if(this.get("srcUrl")!==null){e.setAttribute("src",this.get("srcUrl"));}}if(this.get("setVisible")){e.setStyle("visibility","visible");}if(this.get("width")){e.setAttribute("width",this.get("width"));}if(this.get("height")){e.setAttribute("height",this.get("height"));}this._fetched=true;return true;},_getImgEl:function(){if(this._imgEl===null){this._imgEl=c.one("#"+this.get("domId"));}return this._imgEl;},_getYPos:function(){if(this._yPos===null){this._yPos=this._getImgEl().getY();}return this._yPos;}};c.extend(c.ImgLoadImgObj,c.Base,a);},"@VERSION@",{"requires":["base-base","node-style","node-screen"]});