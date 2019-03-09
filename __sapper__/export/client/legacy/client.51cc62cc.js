import{a as t,b as e,c as r,d as n,e as a,f as o,g as s,h as i,i as c,j as l,k as u,l as f,m as h,n as p,o as d,p as m}from"./chunk.a14f3c8e.js";function g(e){if(r(this,e),this._state=t({},e.data),this._intro=!0,this._fragment=function(e,r){var l,u=[r.child.props],f=r.child.component;function h(r){for(var n={},a=0;a<u.length;a+=1)n=t(n,u[a]);return{root:e.root,store:e.store,data:n}}if(f)var p=new f(h());return{c:function(){l=n("main"),p&&p._fragment.c(),this.h()},l:function(t){l=a(t,"MAIN",{class:!0},!1);var e=o(l);p&&p._fragment.l(e),e.forEach(s),this.h()},h:function(){l.className="svelte-1tyvcu5"},m:function(t,e){i(t,l,e),p&&p._mount(l,null)},p:function(t,e){var r=t.child?c(u,[e.child.props]):{};f!==(f=e.child.component)?(p&&p.destroy(),f?((p=new f(h()))._fragment.c(),p._mount(l,null)):p=null):f&&p._set(r)},d:function(t){t&&s(l),p&&p.destroy()}}}(this,this._state),e.target){var u=o(e.target);e.hydrate?this._fragment.l(u):this._fragment.c(),u.forEach(s),this._mount(e.target,e.anchor),l(this)}}function v(e){var c,l,d,m,g,v,y,_,S;if(r(this,e),this._state=t({},e.data),this._intro=!0,this._fragment=(c=this._state,S=c.error.message,document.title=l=c.status,{c:function(){d=u("\r\n\r\n"),m=n("h1"),g=u(c.status),v=u("\r\n\r\n"),y=n("p"),_=u(S),this.h()},l:function(t){d=f(t,"\r\n\r\n"),m=a(t,"H1",{class:!0},!1);var e=o(m);g=f(e,c.status),e.forEach(s),v=f(t,"\r\n\r\n"),y=a(t,"P",{class:!0},!1);var r=o(y);_=f(r,S),r.forEach(s),this.h()},h:function(){m.className="svelte-13vgy2g",y.className="svelte-13vgy2g"},m:function(t,e){i(t,d,e),i(t,m,e),h(m,g),i(t,v,e),i(t,y,e),h(y,_)},p:function(t,e){t.status&&l!==(l=e.status)&&(document.title=l),t.status&&p(g,e.status),t.error&&S!==(S=e.error.message)&&p(_,S)},d:function(t){t&&(s(d),s(m),s(v),s(y))}}),e.target){var b=o(e.target);e.hydrate?this._fragment.l(b):this._fragment.c(),b.forEach(s),this._mount(e.target,e.anchor)}}t(g.prototype,e),t(v.prototype,e);var y,_,S,b,w,E,P=[],R=[{js:function(){return import("./chunk.d6b344b0.js")},css:["chunk.d6b344b0.css"]}],j=[{pattern:/^\/?$/,parts:[{i:0}]}],q=!1,C=[],O={path:null,params:null,query:null,child:{segment:null,component:null,props:{}}},L=null;var U,x=1;var A,N,k,I,D="undefined"!=typeof __SAPPER__&&__SAPPER__,K="undefined"!=typeof history?history:{pushState:function(t,e,r){},replaceState:function(t,e,r){},scrollRestoration:""},T={};function V(t){if(t.origin!==location.origin)return null;if(!t.pathname.startsWith(D.baseUrl))return null;var e=t.pathname.slice(D.baseUrl.length);if(!P.some(function(t){return t.test(e)}))for(var r=0;r<j.length;r+=1){var n=j[r],a=n.pattern.exec(e);if(a){var o=function(){var r=Object.create(null);return t.search.length>0&&t.search.slice(1).split("&").forEach(function(t){var e=/([^=]*)(?:=(.*))?/.exec(decodeURIComponent(t)),n=d(e,3),a=n[1],o=n[2];o=(o||"").replace(/\+/g," "),"string"==typeof r[a]&&(r[a]=[r[a]]),"object"===m(r[a])?r[a].push(o):r[a]=o}),{v:{url:t,path:e,page:n,match:a,query:r}}}();if("object"===m(o))return o.v}}}function B(){return{x:pageXOffset,y:pageYOffset}}function H(t,e,r,n){if(e)U=e;else{var a=B();T[U]=a,e=U=++x,T[U]=r?a:{x:0,y:0}}U=e,y&&y.set({preloading:!0});var o=L&&L.href===t.url.href?L.promise:G(t);L=null;var s=_={};return o.then(function(t){var a=t.redirect,o=t.data,i=t.nullable_depth,c=t.new_segments;if(a)return function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{replaceState:!1},r=V(new URL(t,document.baseURI));return r?(K[e.replaceState?"replaceState":"pushState"]({id:U},"",t),H(r,null).then(function(){})):(location.href=t,new Promise(function(t){}))}(a.location,{replaceState:!0});c&&(C=c),J(o,i,T[e],r,n,s),document.activeElement&&document.activeElement.blur()})}function J(t,e,r,n,a,o){if(_===o){if(y){for(var s=t.child,i=0;i<e&&i!==e;i+=1)s=s.props.child;var c=s.component;s.component=null,y.set({child:t.child}),s.component=c,y.set(t)}else{var l=document.querySelector("#sapper-head-start"),u=document.querySelector("#sapper-head-end");if(l&&u){for(;l.nextSibling!==u;)W(l.nextSibling);W(l),W(u)}Object.assign(t,b),y=new g({target:E,data:t,store:w,hydrate:!0})}if(!n){if(a){var f=document.querySelector(a);f&&(r={x:0,y:f.getBoundingClientRect().top})}T[U]=r,r&&scrollTo(r.x,r.y)}Object.assign(O,t),q=!0}}function G(t){for(var e=t.page,r=t.path,n=t.query,a=r.split("/").filter(Boolean),o=0;C[o]&&a[o]&&C[o]===a[o];)o+=1;o===a.length&&(o-=1);var s=null,i=null,c={store:w,fetch:function(t){function e(e,r){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}(function(t,e){return fetch(t,e)}),redirect:function(t,e){if(s&&(s.statusCode!==t||s.location!==e))throw new Error("Conflicting redirects");s={statusCode:t,location:e}},error:function(t,e){i={statusCode:t,message:e}}};return S||(S=g.preload?D.preloaded[0]||g.preload.call(c,{path:r,query:n,params:{}}):{}),Promise.all(e.parts.map(function(e,a){return a<o?null:e?(s=R[e.i],i="string"==typeof s.css?[]:s.css.map(M),i.unshift(s.js()),Promise.all(i).then(function(t){return t[0].default})).then(function(o){var s,i={path:r,query:n,params:e.params?e.params(t.match):{}};return s=q||!D.preloaded[a+1]?o.preload?o.preload.call(c,i):{}:D.preloaded[a+1],Promise.resolve(s).then(function(t){return{Component:o,preloaded:t}})}):null;var s,i})).catch(function(t){return i={statusCode:500,message:t},[]}).then(function(t){return b?t:Promise.resolve(S).then(function(e){return b=e,t})}).then(function(c){if(s)return{redirect:s,new_segments:a};var l=(e.parts[e.parts.length-1].params||function(){return{}})(t.match);if(i){var u={path:r,query:n,params:l,error:"string"==typeof i.message?new Error(i.message):i.message,status:i.statusCode};return{new_segments:a,data:Object.assign({},u,{preloading:!1,child:{component:v,props:u}})}}var f={path:r,query:n,error:null,status:null},h={path:r,preloading:!1,child:Object.assign({},O.child,{segment:a[0]})};X(n,O.query)&&(h.query=n),X(l,O.params)&&(h.params=l);for(var p=h.child,d=0,m=0;m<e.parts.length;m+=1){var g=e.parts[m];if(g){var y=g.params||function(){return{}};m<o?(p.props.path=r,p.props.query=n,p.props.child=Object.assign({},p.props.child),d+=1):(p.component=c[m].Component,p.props=Object.assign({},p.props,f,{params:y(t.match)},c[m].preloaded),p.props.child={}),(p=p.props.child).segment=a[m+1]}}return{data:h,nullable_depth:d,new_segments:a}})}function M(t){var e="client/".concat(t);if(!document.querySelector('link[href="'.concat(e,'"]')))return new Promise(function(t,r){var n=document.createElement("link");n.rel="stylesheet",n.href=e,n.onload=function(){return t()},n.onerror=r,document.head.appendChild(n)})}function W(t){t.parentNode.removeChild(t)}function X(t,e){return JSON.stringify(t)!==JSON.stringify(e)}function Y(t){var e=V(new URL(t,document.baseURI));if(e)return L&&t===L.href||function(t,e){L={href:t,promise:e}}(t,G(e)),L.promise}function $(t){clearTimeout(A),A=setTimeout(function(){z(t)},20)}function z(t){var e=Q(t.target);e&&"prefetch"===e.rel&&Y(e.href)}function F(t){if(1===function(t){return null===t.which?t.button:t.which}(t)&&!(t.metaKey||t.ctrlKey||t.shiftKey||t.defaultPrevented)){var e=Q(t.target);if(e&&e.href){var r="object"===m(e.href)&&"SVGAnimatedString"===e.href.constructor.name,n=String(r?e.href.baseVal:e.href);if(n!==location.href){if(!e.hasAttribute("download")&&"external"!==e.getAttribute("rel")&&(r?!e.target.baseVal:!e.target)){var a=new URL(n);if(a.pathname!==location.pathname||a.search!==location.search){var o=V(a);if(o)H(o,null,e.hasAttribute("sapper-noscroll"),a.hash),t.preventDefault(),K.pushState({id:U},"",a.href)}}}else location.hash||t.preventDefault()}}}function Q(t){for(;t&&"A"!==t.nodeName.toUpperCase();)t=t.parentNode;return t}function Z(t){if(T[U]=B(),t.state){var e=V(new URL(location.href));e?H(e,t.state.id):location.href=location.href}else(function(t){U=t})(x=x+1),K.replaceState({id:U},"",location.href)}N={target:document.querySelector("#sapper")},"scrollRestoration"in K&&(K.scrollRestoration="manual"),k=N.target,E=k,N.store&&(I=N.store,w=I(D.store)),addEventListener("click",F),addEventListener("popstate",Z),addEventListener("touchstart",z),addEventListener("mousemove",$),Promise.resolve().then(function(){var t=location,e=t.hash,r=t.href;if(K.replaceState({id:x},"",r),!D.error){var n=V(new URL(location.href));if(n)return H(n,x,!1,e)}});
//# sourceMappingURL=client.51cc62cc.js.map
