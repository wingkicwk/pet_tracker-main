(function(t){function e(e){for(var r,i,a=e[0],l=e[1],c=e[2],g=0,p=[];g<a.length;g++)i=a[g],Object.prototype.hasOwnProperty.call(s,i)&&s[i]&&p.push(s[i][0]),s[i]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(t[r]=l[r]);u&&u(e);while(p.length)p.shift()();return o.push.apply(o,c||[]),n()}function n(){for(var t,e=0;e<o.length;e++){for(var n=o[e],r=!0,a=1;a<n.length;a++){var l=n[a];0!==s[l]&&(r=!1)}r&&(o.splice(e--,1),t=i(i.s=n[0]))}return t}var r={},s={app:0},o=[];function i(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=r,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)i.d(n,r,function(e){return t[e]}.bind(null,r));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],l=a.push.bind(a);a.push=e,a=a.slice();for(var c=0;c<a.length;c++)e(a[c]);var u=l;o.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";var r=n("85ec"),s=n.n(r);s.a},3400:function(t,e,n){},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[t.afterLogin?t._e():n("Ads",{attrs:{id:"ads"}}),n("Map",{on:{status:t.changeStatus}})],1)},o=[],i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-carousel",{attrs:{"indicator-position":"outside",autoplay:!0,height:"80px",interval:2e3}},t._l(t.adSpace,(function(e){return n("el-carousel-item",{key:e},[n("h4",[t._v(t._s(e))])])})),1)},a=[],l={name:"Ads",data:function(){return{adSpace:["Advertising space for rent :)","Great opportunity!","lovely position!","Call for BEST price"]}},components:{}},c=l,u=(n("d5fc"),n("2877")),g=Object(u["a"])(c,i,a,!1,null,null,null),p=g.exports,d=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("el-drawer",{attrs:{title:"User Center",visible:t.isUserDisplay,direction:"ltr",size:"300px"},on:{"update:visible":function(e){t.isUserDisplay=e}}},[n("UserPage",{on:{userStatus:t.changeStatus}})],1),n("el-row",{staticClass:"parent_rel topBarPosition",attrs:{align:"middle"}},[n("el-col",{staticClass:"vertically_centered",attrs:{span:2}},[n("el-button",{staticStyle:{"margin-left":"0px"},attrs:{type:t.userIcon,circle:""},on:{click:function(e){t.isUserDisplay=!0}}},[n("i",{staticClass:"el-icon-user-solid"})])],1),n("el-button",{staticStyle:{float:"right","margin-left":"10px","margin-right":"10px"},attrs:{type:"text"},on:{click:t.test}},[t._v("test ")]),n("el-button",{staticStyle:{float:"right"},attrs:{disabled:!t.isLogin,type:"primary"},on:{click:t.locatePet}},[t._v("Locate Pet")])],1),n("el-row",{staticStyle:{"margin-bottom":"8px"}},[n("el-button",{attrs:{disabled:!t.isLogin},on:{click:function(e){t.setFirst=!0}}},[t._v("Set Point1")]),t._v(" - "+t._s(t.marker[0]["lat"])+","+t._s(t.marker[0]["lng"])+" "),n("el-button",{attrs:{disabled:!t.isLogin},on:{click:function(e){return t.reset(t.marker[0])}}},[t._v("Reset")])],1),n("el-row",{staticStyle:{"margin-bottom":"8px"}},[n("el-button",{attrs:{disabled:!t.isLogin},on:{click:function(e){t.setSecond=!0}}},[t._v("Set Point2")]),t._v(" - "+t._s(t.marker[1]["lat"])+","+t._s(t.marker[1]["lng"])+" "),n("el-button",{attrs:{disabled:!t.isLogin},on:{click:function(e){return t.reset(t.marker[1])}}},[t._v("Reset")])],1),n("el-row",{staticStyle:{"margin-bottom":"8px"}},[n("el-tooltip",{staticClass:"item",staticStyle:{"margin-bottom":"8px"},attrs:{effect:"dark",disabled:t.isLogin,content:"Join us to start",placement:"top-start"}},[n("span",[n("el-button",{attrs:{disabled:!t.isLogin,type:"primary"},on:{click:t.setSafeArea}},[t._v("Generate Safe Area")])],1)])],1),n("span"),n("el-dialog",{attrs:{title:"WARNING",visible:t.missingAlert,width:"30%"},on:{"update:visible":function(e){t.missingAlert=e}}},[n("span",{staticStyle:{"font-size":"18px","font-weight":"bold"}},[t._v("your dog is out of the safe area")]),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("Locate your pet")]),n("el-button",{attrs:{type:"primary"},on:{click:function(e){t.dialogVisible=!1}}},[t._v("Got it")])],1)]),n("GmapMap",{ref:"mymap",style:t.mapSize,attrs:{center:t.mapCenter,zoom:t.zoom,"map-type-id":"terrain",options:{zoomControl:!0,mapTypeControl:!1,scaleControl:!1,streetViewControl:!1,rotateControl:!1,fullscreenControl:!0,disableDefaultUI:!1}},on:{click:t.setMarker}},[t._l(t.marker,(function(e,r){return n("GmapMarker",{key:r,attrs:{position:t.getPosition(e),clickable:!0,draggable:!0},on:{click:function(n){return t.toggleInfo(e,r)},dragend:function(e){return t.updateCoordinates(e.latLng,r)}}})})),n("GmapMarker",{attrs:{icon:t.dogIcon,position:t.dogPosition,clickable:!0},on:{click:t.clickDog}})],2)],1)},f=[],m=(n("baa5"),n("755e")),h=n("1052"),y=n.n(h),k=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{directives:[{name:"loading",rawName:"v-loading.fullscreen.lock",value:t.loading,expression:"loading",modifiers:{fullscreen:!0,lock:!0}}]},[t.beforeLogin?r("el-row",{attrs:{type:"flex",justify:"center"}},[r("el-col",{attrs:{span:20}},[r("el-form",{ref:"users",attrs:{model:t.users,"label-width":"small"}},[r("el-form-item",{attrs:{label:"username"}},[r("el-input",{model:{value:t.users.username,callback:function(e){t.$set(t.users,"username",e)},expression:"users.username"}})],1),r("el-form-item",{attrs:{label:"password"}},[r("el-input",{attrs:{type:"password"},model:{value:t.users.password,callback:function(e){t.$set(t.users,"password",e)},expression:"users.password"}})],1),r("el-form-item",[r("el-checkbox",{attrs:{label:"remember me ",name:"type"}})],1),r("el-form-item",{attrs:{size:"large"}},[r("el-button",{attrs:{type:"primary"},on:{click:t.login}},[t._v("Sign in")]),r("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"No worries, get membership now!",placement:"top-end"}},[r("el-button",{attrs:{type:"primary"},on:{click:t.goSignUp}},[t._v("Sign up")])],1)],1)],1)],1)],1):t._e(),t.afterLogin?r("div",[r("el-row",{attrs:{type:"flex",justify:"center"}},[r("el-col",{attrs:{span:20}},[t._v(" Glad to see you, our valued client ")])],1),r("el-row",{attrs:{type:"flex",justify:"center"}},[r("el-col",{attrs:{span:20}},[t._v(" Let's look forward to more features 😊 ")])],1),r("el-row",{attrs:{type:"flex",justify:"center"}},[r("el-col",{attrs:{span:20}},[r("img",{staticClass:"noAds",attrs:{src:n("72e4"),width:"50%"}})])],1),r("el-row",{attrs:{type:"flex",justify:"center"}},[r("el-button",{attrs:{type:"success"},on:{click:t.signOut}},[t._v("Sign out")])],1)],1):t._e(),r("transition",{attrs:{name:"el-zoom-in-top"}},[t.signUpPage?r("div",{attrs:{id:"register"}},[r("el-row",{attrs:{type:"flex",justify:"center"}},[r("el-col",{attrs:{span:20}},[r("el-form",{ref:"register",attrs:{model:t.register}},[r("el-form-item",{attrs:{label:"Username"}},[r("el-input",{model:{value:t.register.username,callback:function(e){t.$set(t.register,"username",e)},expression:"register.username"}})],1),r("el-form-item",{attrs:{label:"Password"}},[r("el-input",{attrs:{"show-password":""},model:{value:t.register.password,callback:function(e){t.$set(t.register,"password",e)},expression:"register.password"}})],1),r("el-form-item",{attrs:{label:"Confirm Password"}},[r("el-input",{attrs:{"show-password":""},model:{value:t.register.passwordConfirm,callback:function(e){t.$set(t.register,"passwordConfirm",e)},expression:"register.passwordConfirm"}})],1),r("el-form-item",{attrs:{label:"Equipment ID"}},[r("el-input",{attrs:{"show-password":""},model:{value:t.register.equipmentID,callback:function(e){t.$set(t.register,"equipmentID",e)},expression:"register.equipmentID"}})],1),r("el-form-item",{attrs:{label:"Email"}},[r("el-input",{model:{value:t.register.email,callback:function(e){t.$set(t.register,"email",e)},expression:"register.email"}})],1),r("el-form-item",{attrs:{size:"large"}},[r("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"Join now!",placement:"top-end"}},[r("el-button",{attrs:{type:"primary"},on:{click:t.signUp}},[t._v("Sign up")])],1),r("el-button",{attrs:{type:"primary"},on:{click:t.goPre}},[t._v("Return")])],1)],1)],1)],1)],1):t._e()])],1)},b=[],v={name:"UserPage",data:function(){return{noAds:"../assets/NoAds.png",loading:!1,prefixUrl:"",deviceID:"",afterLogin:!1,beforeLogin:!0,signUpPage:!1,users:{username:"",password:""},register:{username:"",password:"",passwordConfirm:"",equipmentID:"",email:""}}},methods:{goSignUp:function(){this.signUpPage=!0,this.afterLogin=!1,this.beforeLogin=!1},goPre:function(){this.signUpPage=!1,this.afterLogin=!1,this.beforeLogin=!0},signUp:function(){var t=this;if(this.register.password==this.register.passwordConfirm){for(var e in this.register)if(0==this.register[e].length)return void this.$notify.error({title:"Sorry",message:e+" cannot be empity",duration:2e3});this.loading=!0,y()({method:"post",url:this.prefixUrl+"/userManage/register/",data:{username:this.register.username,pwd:this.register.password,pwdcfm:this.register.passwordConfirm,email:this.register.email,equipmentID:this.register.equipmentID},transformRequest:[function(t){var e="";for(var n in t)e+=encodeURIComponent(n)+"="+encodeURIComponent(t[n])+"&";return e=e.substring(0,e.lastIndexOf("&")),e}],headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then((function(n){if(n.data.isSuccess)for(e in t.signUpPage=!1,t.beforeLogin=!0,t.$notify({title:"Thanks",message:"Registration success！",type:"success",duration:2e3}),t.register)t.register[e]="";else t.$notify.error({title:"Waring",message:n.data.reason,duration:2e3})})),this.loading=!1}else this.$notify.error({title:"Sorry",message:"Please enter the same password twice",duration:2e3})},login:function(){var t=this;this.loading=!0,y()({method:"post",url:this.prefixUrl+"/userManage/login/",data:{username:this.users.username,password:this.users.password},transformRequest:[function(t){var e="";for(var n in t)e+=encodeURIComponent(n)+"="+encodeURIComponent(t[n])+"&";return e=e.substring(0,e.lastIndexOf("&")),e}],headers:{"Content-Type":"application/x-www-form-urlencoded"},withCredentials:!0}).then((function(e){e.data.isSuccess?(t.$notify({title:"Thanks",message:"Hey! Welcome back 😊",type:"success",duration:2e3}),t.deviceId=e.data.deviceid,t.afterLogin=!0,t.beforeLogin=!1,t.currentStatus(t.users.username)):(t.$notify.error({title:"Sorry",message:"Your username or password is not right 😭",duration:2e3}),t.users.password="")})),this.loading=!1},signOut:function(){this.$notify({title:"Thanks",message:"You are logged out now",type:"success",duration:2e3}),this.afterLogin=!1,this.beforeLogin=!0,this.users.username="",this.users.password="",this.currentStatus("null")},currentStatus:function(t){this.$emit("userStatus",t)}}},w=v,P=Object(u["a"])(w,k,b,!1,null,"72124f60",null),_=P.exports,x={data:function(){return{zoom:13,mapCenter:{lat:53.3441,lng:-6.26749},isLogin:!1,userIcon:"primary",username:"",isUserDisplay:!1,missingAlert:!1,dogPosition:{lat:53.3441,lng:-6.26749},userPosition:{lat:53.3441,lng:-6.26749},dogIcon:"https://img.icons8.com/clouds/100/000000/dog.png",userMarker:"https://img.icons8.com/clouds/100/000000/user-male.png",currentLocation:{},areaObject:null,safeArea:[],setFirst:!1,setSecond:!1,mapSize:"width: 100%;height:520px",setPosition:!1,count:0,mock_position:[[53.26315493851116,-6.2030094172131784],[53.263066,-6.202697],[53.262967,-6.202437],[53.262906,-6.202196],[53.262884,-6.202034],[53.262882,-6.201835],[53.262868,-6.201641],[53.262879,-6.201448],[53.262866,-6.201264],[53.262846,-6.201007]],toGetPosition:!1,prefixUrl:"",marker:{0:{full_name:0,lat:0,lng:0},1:{full_name:1,lat:0,lng:0}},infoPosition:null,infoContent:null,infoOpened:!1,noNeedWarning:!1,infoCurrentKey:null,infoOptions:{pixelOffset:{width:0,height:-35}}}},methods:{changeStatus:function(t){var e=this;console.log(t),"null"!=t?(e.userIcon="success",e.isLogin=!0,e.username=t,this.getPreSet(),this.toGetPosition=!0,this.$emit("status",t)):(e.userIcon="primary",e.isLogin=!1,e.username="null",e.toGetPosition=!1,this.$emit("status",t))},updateCoordinates:function(t,e){this.marker[e]={full_name:e,lat:t.lat(),lng:t.lng()},this.areaObject.setMap(null),this.setSafeArea()},reset:function(t){t.lat=0,t.lng=0,this.safeArea=[],y()({method:"post",url:this.prefixUrl+"/setupfence",data:{username:this.username,q1_lat:0,q1_long:0,q2_lat:0,q2_long:0},transformRequest:[function(t){var e="";for(var n in t)e+=encodeURIComponent(n)+"="+encodeURIComponent(t[n])+"&";return e=e.substring(0,e.lastIndexOf("&")),e}],headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then((function(t){console.log(t)})),this.areaObject.setMap(null)},toggleInfo:function(t,e){console.log("tanchu"),this.infoPosition=this.getPosition(t),this.infoContent=t.full_name,this.infoCurrentKey==e?this.infoOpened=!this.infoOpened:(this.infoOpened=!0,this.infoCurrentKey=e)},getPosition:function(t){return{lat:parseFloat(t.lat),lng:parseFloat(t.lng)}},setMarker:function(t){return this.setFirst?(console.log(t.latLng.lat()),console.log(t.latLng.lng()),this.marker[0]={full_name:this.count,lat:t.latLng.lat(),lng:t.latLng.lng()},void(this.setFirst=!1)):this.setSecond?(console.log(t.latLng.lat()),console.log(t.latLng.lng()),this.marker[1]={full_name:this.count,lat:t.latLng.lat(),lng:t.latLng.lng()},void(this.setSecond=!1)):void console.log("尚未尝试获取坐标")},setSafeArea:function(){y()({method:"post",url:this.prefixUrl+"/setupfence",data:{username:this.username,q1_lat:this.marker[0]["lat"],q1_long:this.marker[0]["lng"],q2_lat:this.marker[1]["lat"],q2_long:this.marker[1]["lng"]},transformRequest:[function(t){var e="";for(var n in t)e+=encodeURIComponent(n)+"="+encodeURIComponent(t[n])+"&";return e=e.substring(0,e.lastIndexOf("&")),e}],headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then((function(t){console.log(t)})),null!=this.areaObject&&this.areaObject.setMap(null),0!=this.marker[0]["lat"]&&0!=this.marker[1]["lat"]?(this.safeArea=[{lat:this.marker[0]["lat"],lng:this.marker[0]["lng"]},{lat:this.marker[0]["lat"],lng:this.marker[1]["lng"]},{lat:this.marker[1]["lat"],lng:this.marker[1]["lng"]},{lat:this.marker[1]["lat"],lng:this.marker[0]["lng"]}],this.areaObject=new this.google.maps.Polygon({paths:this.safeArea,strokeColor:"#FF0000",strokeOpacity:.8,strokeWeight:2,fillColor:"#67C23A",fillOpacity:.25}),this.areaObject.setMap(this.$refs.mymap.$mapObject)):this.$notify({title:"Waring",message:"Please finish the setting",type:"warning"})},test:function(){this.marker[0].lat>this.marker[1].lat?this.dogPosition.lat=Math.random()*(this.marker[0].lat-this.marker[1].lat)+this.marker[1].lat+3e-4:this.dogPosition.lat=Math.random()*(this.marker[1].lat-this.marker[0].lat)+this.marker[0].lat+3e-4,this.marker[0].lng>this.marker[1].lng?this.dogPosition.lng=Math.random()*(this.marker[0].lng-this.marker[1].lng)+this.marker[1].lng:this.dogPosition.lng=Math.random()*(this.marker[1].lng-this.marker[0].lng)+this.marker[0].lng},clickDog:function(){var t=this;this.$alert("How are you!","Your dog：",{confirmButtonText:"I am fine",callback:function(e){t.$message({type:"info",message:"action: ".concat(e)})}})},onSuccess:function(t){alert("纬度: "+t.coords.latitude+"\n经度: "+t.coords.longitude+"\n海拔: "+t.coords.altitude+"\n水平精度: "+t.coords.accuracy+"\n垂直精度: "+t.coords.altitudeAccura)},onError:function(t){switch(t.code){case t.PERMISSION_DENIED:alert("您拒绝对获取地理位置的请求");break;case t.POSITION_UNAVAILABLE:alert("位置信息是不可用的");break;case t.TIMEOUT:alert("请求您的地理位置超时");break;case t.UNKNOWN_ERROR:alert("未知错误");break}},getPreSet:function(){var t=this;y()({method:"post",url:this.prefixUrl+"/getfence",data:{username:this.username},transformRequest:[function(t){var e="";for(var n in t)e+=encodeURIComponent(n)+"="+encodeURIComponent(t[n])+"&";return e=e.substring(0,e.lastIndexOf("&")),e}],headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then((function(e){console.log(e),0!=e.data["Point1"][0]&&(t.marker[0]["lat"]=e.data["Point1"][0],t.marker[0]["lng"]=e.data["Point1"][1],t.marker[1]["lat"]=e.data["Point2"][0],t.marker[1]["lng"]=e.data["Point2"][1],t.setSafeArea())}))},lostWaring:function(){var t=this;this.noNeedWarning||(this.$confirm("Your pet is out of safe area NOW! ","Waring",{confirmButtonText:"LOCATE IT!",cancelButtonText:"GOT IT",type:"warning"}).then((function(){t.$message({type:"success",message:"Successful locating!"}),t.locatePet()})),this.noNeedWarning=!0)},sleep:function(t){for(var e=Date.now();Date.now()-e<=t;);},locatePet:function(){this.$refs.mymap.center=this.dogPosition,this.zoom=17},getPetLocation:function(){var t=this,e=this;e.toGetPosition&&y()({method:"post",url:this.prefixUrl+"/petposition",data:{username:e.username},transformRequest:[function(t){var e="";for(var n in t)e+=encodeURIComponent(n)+"="+encodeURIComponent(t[n])+"&";return e=e.substring(0,e.lastIndexOf("&")),e}],headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then((function(n){if(n.data.IsSuccess){if(0==n.data.Point[0]||0==n.data.Point[1])return;e.dogPosition["lat"]=n.data.Point[0],e.dogPosition["lng"]=n.data.Point[1]}else t.$message({message:"Fail to get your pet position...try again....",type:"warning"})}))}},watch:{"dogPosition.lat":function(){0!=this.safeArea.length&&(console.log(this.dogPosition.lat+"--------------"+this.dogPosition.lng),(this.dogPosition.lat>this.marker[0]["lat"]&&this.dogPosition.lat>this.marker[1]["lat"]||this.dogPosition.lat<this.marker[0]["lat"]&&this.dogPosition.lat<this.marker[1]["lat"]||this.dogPosition.lng>this.marker[0]["lng"]&&this.dogPosition.lng>this.marker[1]["lng"]||this.dogPosition.lng<this.marker[0]["lng"]&&this.dogPosition.lng<this.marker[1]["lng"])&&this.lostWaring())},deep:!0},mounted:function(){var t=this;navigator.geolocation&&navigator.geolocation.getCurrentPosition((function(e){var n={lat:e.coords.latitude,lng:e.coords.longitude};console.log(n),t.userPosition=n})),setInterval(this.getPetLocation,8e3)},computed:{google:m["gmapApi"]},components:{UserPage:_}},S=x,C=Object(u["a"])(S,d,f,!1,null,null,null),I=C.exports,O={name:"App",data:function(){return{afterLogin:!1}},methods:{changeStatus:function(t){this.afterLogin="null"!=t}},components:{Ads:p,Map:I}},L=O,U=(n("034f"),Object(u["a"])(L,s,o,!1,null,null,null)),A=U.exports,$=n("5c96"),j=n.n($);n("0fae");r["default"].config.productionTip=!1,r["default"].use(j.a),r["default"].use(m,{load:{key:"AIzaSyB-23i4h40QWQgjFW13cZNpMLU222iCSPw",libraries:"places,directions",language:"En"},autobindAllEvents:!1}),new r["default"]({render:function(t){return t(A)}}).$mount("#app")},"72e4":function(t,e,n){t.exports=n.p+"static/img/NoAds.9b617d8b.png"},"85ec":function(t,e,n){},d5fc:function(t,e,n){"use strict";var r=n("3400"),s=n.n(r);s.a}});
//# sourceMappingURL=app.5a62e90b.js.map