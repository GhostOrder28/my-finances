(function(){"use strict";var e={9639:function(e,n,t){var r={};t.r(r),t.d(r,{setEmail:function(){return v},setUsername:function(){return g}});var o={};t.r(o),t.d(o,{signinUser:function(){return C},signoutUser:function(){return P},signupUser:function(){return O}});var i=t(9242),a=t(3396);function u(e,n,t,r,o,i){const u=(0,a.up)("Navigation"),s=(0,a.up)("router-view");return(0,a.wg)(),(0,a.iD)(a.HY,null,[i.isAuth?(0,a.kq)("",!0):((0,a.wg)(),(0,a.j4)(u,{key:0})),(0,a.Wm)(s)],64)}const s=(0,a.RC)((()=>Promise.all([t.e(89),t.e(932)]).then(t.bind(t,5932))));var c={components:{Navigation:s},computed:{isAuth(){return"/signin"===this.$route.path||"/signup"===this.$route.path}}},f=t(89);const l=(0,f.Z)(c,[["render",u]]);var d=l,p=t(2483),m=t(4533),h=()=>({username:"",email:""});function g(e,n){e.username=n}function v(e,n){e.email=n}var b=t(4311);const y={baseURL:"/",withCredentials:!0},w=b.Z.create(y);w.interceptors.response.use((function(e){return e}),(function(e){return e.response.data.authorizationError&&E.dispatch(""),Promise.reject(e)}));var k=w;async function C({commit:e},n){const{email:t,password:r}=n,o=await k.post("/auth/signin",{email:t,password:r});e("setUsername",o.data.userData.username),e("setEmail",o.data.userData.email)}async function O({commit:e},n){const{username:t,email:r,password:o}=n,i=await k.post("/auth/signup",{username:t,email:r,password:o});E.dispatch("signinUser",{email:i.data.userCredentials.email,password:i.data.userCredentials.password})}async function P({commit:e}){await k.get("/auth/signout")}var E=(0,m.MT)({state:h,mutations:r,actions:o});const j=()=>Promise.all([t.e(89),t.e(229)]).then(t.bind(t,229)),A=()=>Promise.all([t.e(89),t.e(690)]).then(t.bind(t,2690)),N=()=>Promise.all([t.e(89),t.e(963)]).then(t.bind(t,3963)),S=()=>Promise.all([t.e(89),t.e(511)]).then(t.bind(t,3511)),T=()=>Promise.all([t.e(89),t.e(737),t.e(201)]).then(t.bind(t,3201)),_=()=>Promise.all([t.e(89),t.e(737),t.e(461)]).then(t.bind(t,461)),U=()=>t.e(796).then(t.bind(t,5796)),x=[{path:"/",component:j},{path:"/clients",component:j},{path:"/signup",component:U},{path:"/signin",component:U},{path:"/client",component:A},{path:"/sale",component:N},{path:"/newclient",component:S},{path:"/newsale",component:T},{path:"/newpayment",component:_}],L=(0,p.p7)({history:(0,p.PO)(),routes:x});L.beforeEach((function(e,n,t){const{path:r}=e;"/signin"!==r&&"/signup"!==r&&(console.log("store",E),console.log(E.state.email),E.state.email?t():t("/signin")),t()}));var D=L;(0,i.ri)(d).use(D).use(E).mount("#app")}},n={};function t(r){var o=n[r];if(void 0!==o)return o.exports;var i=n[r]={exports:{}};return e[r](i,i.exports,t),i.exports}t.m=e,function(){var e=[];t.O=function(n,r,o,i){if(!r){var a=1/0;for(f=0;f<e.length;f++){r=e[f][0],o=e[f][1],i=e[f][2];for(var u=!0,s=0;s<r.length;s++)(!1&i||a>=i)&&Object.keys(t.O).every((function(e){return t.O[e](r[s])}))?r.splice(s--,1):(u=!1,i<a&&(a=i));if(u){e.splice(f--,1);var c=o();void 0!==c&&(n=c)}}return n}i=i||0;for(var f=e.length;f>0&&e[f-1][2]>i;f--)e[f]=e[f-1];e[f]=[r,o,i]}}(),function(){t.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return t.d(n,{a:n}),n}}(),function(){t.d=function(e,n){for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})}}(),function(){t.f={},t.e=function(e){return Promise.all(Object.keys(t.f).reduce((function(n,r){return t.f[r](e,n),n}),[]))}}(),function(){t.u=function(e){return"js/"+e+"."+{89:"56019b97",201:"29b2b798",229:"b5b4c91f",461:"d1201395",511:"843597bc",690:"6887659b",737:"7225685d",796:"c7e61c40",932:"2e3a7646",963:"db1bfd19"}[e]+".js"}}(),function(){t.miniCssF=function(e){return"css/"+e+"."+{201:"befe155e",229:"76cc9815",461:"66b8a5d8",511:"f6cdb5a6",690:"2a59c077",796:"9558d494",932:"7402ca86",963:"214421b2"}[e]+".css"}}(),function(){t.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)}}(),function(){var e={},n="my-finances:";t.l=function(r,o,i,a){if(e[r])e[r].push(o);else{var u,s;if(void 0!==i)for(var c=document.getElementsByTagName("script"),f=0;f<c.length;f++){var l=c[f];if(l.getAttribute("src")==r||l.getAttribute("data-webpack")==n+i){u=l;break}}u||(s=!0,u=document.createElement("script"),u.charset="utf-8",u.timeout=120,t.nc&&u.setAttribute("nonce",t.nc),u.setAttribute("data-webpack",n+i),u.src=r),e[r]=[o];var d=function(n,t){u.onerror=u.onload=null,clearTimeout(p);var o=e[r];if(delete e[r],u.parentNode&&u.parentNode.removeChild(u),o&&o.forEach((function(e){return e(t)})),n)return n(t)},p=setTimeout(d.bind(null,void 0,{type:"timeout",target:u}),12e4);u.onerror=d.bind(null,u.onerror),u.onload=d.bind(null,u.onload),s&&document.head.appendChild(u)}}}(),function(){t.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){t.p="/"}(),function(){var e=function(e,n,t,r,o){var i=document.createElement("link");i.rel="stylesheet",i.type="text/css";var a=function(t){if(i.onerror=i.onload=null,"load"===t.type)r();else{var a=t&&("load"===t.type?"missing":t.type),u=t&&t.target&&t.target.href||n,s=new Error("Loading CSS chunk "+e+" failed.\n("+u+")");s.code="CSS_CHUNK_LOAD_FAILED",s.type=a,s.request=u,i.parentNode.removeChild(i),o(s)}};return i.onerror=i.onload=a,i.href=n,t?t.parentNode.insertBefore(i,t.nextSibling):document.head.appendChild(i),i},n=function(e,n){for(var t=document.getElementsByTagName("link"),r=0;r<t.length;r++){var o=t[r],i=o.getAttribute("data-href")||o.getAttribute("href");if("stylesheet"===o.rel&&(i===e||i===n))return o}var a=document.getElementsByTagName("style");for(r=0;r<a.length;r++){o=a[r],i=o.getAttribute("data-href");if(i===e||i===n)return o}},r=function(r){return new Promise((function(o,i){var a=t.miniCssF(r),u=t.p+a;if(n(a,u))return o();e(r,u,null,o,i)}))},o={143:0};t.f.miniCss=function(e,n){var t={201:1,229:1,461:1,511:1,690:1,796:1,932:1,963:1};o[e]?n.push(o[e]):0!==o[e]&&t[e]&&n.push(o[e]=r(e).then((function(){o[e]=0}),(function(n){throw delete o[e],n})))}}(),function(){var e={143:0};t.f.j=function(n,r){var o=t.o(e,n)?e[n]:void 0;if(0!==o)if(o)r.push(o[2]);else{var i=new Promise((function(t,r){o=e[n]=[t,r]}));r.push(o[2]=i);var a=t.p+t.u(n),u=new Error,s=function(r){if(t.o(e,n)&&(o=e[n],0!==o&&(e[n]=void 0),o)){var i=r&&("load"===r.type?"missing":r.type),a=r&&r.target&&r.target.src;u.message="Loading chunk "+n+" failed.\n("+i+": "+a+")",u.name="ChunkLoadError",u.type=i,u.request=a,o[1](u)}};t.l(a,s,"chunk-"+n,n)}},t.O.j=function(n){return 0===e[n]};var n=function(n,r){var o,i,a=r[0],u=r[1],s=r[2],c=0;if(a.some((function(n){return 0!==e[n]}))){for(o in u)t.o(u,o)&&(t.m[o]=u[o]);if(s)var f=s(t)}for(n&&n(r);c<a.length;c++)i=a[c],t.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return t.O(f)},r=self["webpackChunkmy_finances"]=self["webpackChunkmy_finances"]||[];r.forEach(n.bind(null,0)),r.push=n.bind(null,r.push.bind(r))}();var r=t.O(void 0,[998],(function(){return t(9639)}));r=t.O(r)})();
//# sourceMappingURL=app.f6646ee2.js.map