(this["webpackJsonpreact-template"]=this["webpackJsonpreact-template"]||[]).push([[0],{108:function(e,t,n){"use strict";n.r(t);var c=n(0),i=n.n(c),r=n(18),a=n.n(r),l=(n(77),n(3)),o=(n(78),n(119)),s=n(53),u=n(7);function b(e,t,n){return window.runtime.EventsOnMultiple(e,t,n)}function d(e,t){return b(e,t,-1)}var h=n(122),j=n(121),m=n(45),p=n(52),g=n(1);var O=function(e){var t=e.Iden,n=e.name,c=e.draggable,i=(e.wait,e.detail),r=Object(j.a)((function(e){return{type:"image",item:{Iden:t,Name:n},collect:function(e){return{isDragging:!!e.isDragging()}}}})),a=Object(l.a)(r,2),o=a[0].isDragging,s=a[1];return Object(g.jsx)(p.a,{delay:{hide:450,show:300},overlay:function(e){return Object(g.jsx)(m.a,Object(u.a)(Object(u.a)({className:"button-tooltip"},e),{},{children:Object(g.jsxs)("ul",{children:[Object(g.jsxs)("li",{children:["From :",i.From]}),Object(g.jsxs)("li",{children:["Owner :",i.Owner]}),Object(g.jsxs)("li",{children:["By :",i.By]}),Object(g.jsxs)("li",{children:["At :",i.AtTime]})]})}))},placement:"bottom",children:Object(g.jsx)("div",{id:n,style:{backgroundColor:"x"!==n?"black":"Aquamarine",color:"white",visibility:o?"hidden":"",text_align:"x"!==n?"justify":"center",width:"3rem",height:"3rem"},ref:c?s:{},children:"x"!==n?t+" "+n:"X"})})};var x=function(e){var t=e.items,n=e.bay,c=Object(h.a)((function(){return{accept:"image",drop:function(e){return o(e.Iden)},collect:function(e){return{isOut:!!e.isOver()}}}})),i=Object(l.a)(c,2),r=i[0].isOut,a=i[1],o=function(e){e<0||window.go.main.Basic.Flip(String(e),Number(-1)).then((function(e){}))};return Object(g.jsx)("div",{className:"wait",style:{border:r?"0.5rem solid rgba(0, 0, 0, 0.05)":"0.5rem solid green",flexDirection:"row",flexWrap:"wrap",display:"flex",flex:"2",height:"5rem"},ref:a,children:t.map((function(e){return-1===e.Cor.Bay&&-1===e.Cor.Row&&-1===e.Cor.Tier&&e.Type==n%2?Object(g.jsx)(O,{draggable:!0,Iden:e.Iden,name:e.Name,wait:!0,detail:e.Detail}):Object(g.jsx)(g.Fragment,{})}))})},f=n(12);function v(e){var t=e.list,n=Object(c.useState)(1),i=Object(l.a)(n,2),r=i[0],a=i[1];return Object(g.jsx)("div",{className:"border border-primary rounded ",style:{height:"900px",overflowX:"scroll"},children:Object(g.jsx)("div",{onWheelCapture:function(e){if(e.shiftKey){var t=-.001*e.deltaY;a(t+r)}},style:{width:"100%",height:"100%",flex:"1",transformOrigin:"0 0",transform:"scale(".concat(r,")"),overflowY:"scroll"},children:Object(f.a)(t).reverse().map((function(e){return e.length<1?Object(g.jsx)("div",{}):Object(g.jsx)("div",{children:Object(g.jsx)("div",{style:{paddingLeft:"0.25rem",paddingTop:"0.5rem",paddingBottom:"2rem",fontSize:"0.9rem"},children:String(e)})})}))})})}var y=function(e){var t=e.items,n=e.id,i=e.bay,r=e.row,a=e.tier,o=Object(h.a)((function(){return{accept:"image",drop:function(e){return m(e.Iden)},collect:function(e){return{isOver:!!e.isOver()}}}})),s=Object(l.a)(o,2),u=s[0].isOver,b=s[1],d=Object(c.useState)({bay:i,row:r,tier:a}),j=Object(l.a)(d,2);j[0],j[1],Object(c.useEffect)((function(){console.log(i,r,a)}),[i]);var m=function(e){e<=0||(console.log(i,r,a),window.go.main.Basic.Flip(String(e),Number(n)).then((function(e){})))};return Object(g.jsx)("div",{className:"Drop",style:{border:u?"1rem solid rgba(255, 0, 0, 0.05)":"1rem solid yellow",width:"5rem",height:"5rem",color:"blue",visibility:"visible",alignSelf:"flex-start",background:"rgba(255, 255, 255, 0.0 )"},ref:b,children:t.map((function(e){return e.Cor.Bay===i&&e.Cor.Row===r&&e.Cor.Tier===a?Object(g.jsx)(O,{draggable:!0,Iden:e.Iden,name:e.Name,detail:e.Detail}):Object(g.jsx)(g.Fragment,{})}))})};var w=function(e){var t=e.dat,n=e.box,i=e.img,r=e.pos,a=e.zIndex,o=Object(c.useState)({width:1,height:40,scale:1}),s=Object(l.a)(o,2),u=s[0],b=s[1];return Object(g.jsx)("div",{style:{height:"100%",backgroundImage:null!==i?"url(".concat(URL.createObjectURL(i),")"):"url('http://localhost:4000/img')",backgroundSize:"100% 100%",backgroundRepeat:"no-repeat",width:"100%"},children:Object(g.jsx)("div",{className:"border border-success border-3",onWheelCapture:function(e){if(e.shiftKey){var t=-.001*e.deltaY+u.scale;b({width:u.width,height:u.height,scale:t})}},style:{height:"100%",overflowX:"scroll",overflowY:"scroll"},children:Object(g.jsx)("div",{style:{display:"flex",flexDirection:"column",flexWrap:"wrap",transform:"scale(".concat(u.scale,") translate(").concat(r.x,"px,").concat(r.y,"px)"),width:"fit-content",height:"fit-content"},children:Object(f.a)(Array(n.y).keys()).map((function(e,c){return Object(g.jsx)("div",{style:{height:"5rem",width:"90rem",display:"flex",flexDirection:"row",flexWrap:"wrap"},children:Object(f.a)(Array(n.x).keys()).map((function(e,i){return t.Inval.some((function(e){return e.Bay===a&&e.Tier===n.y-c-1&&e.Row===i}))?Object(g.jsx)("div",{style:{backgroundColor:"DarkGrey",color:"white",width:"5rem",height:"5rem"},children:Object(g.jsx)("span",{})}):Object(g.jsx)(y,{items:t.Rv,id:i+(n.y-c-1)*n.x+a*n.x*n.y,bay:a,row:i,tier:n.y-c-1})}))})}))})})})},N=n(120);var S=function(){var e=Object(c.useState)({ShipName:String,Name:String,Rv:[{Name:String,Cor:{Bay:Number,Row:Number,Tier:Number},Iden:Number,Type:Number,Key:Number,Detail:{From:String,AtTime:String,By:String,Owner:String}}],version:-1,Log:[],Inval:[{Bay:Number,Row:Number,Tier:Number}],Bays:Number,Rows:Number,Tier:Number}),t=Object(l.a)(e,2),n=t[0],i=t[1],r=Object(c.useState)({x:0,y:0,z:0}),a=Object(l.a)(r,2),o=a[0],s=a[1],b=Object(c.useState)(null),h=Object(l.a)(b,2),j=h[0],m=h[1],p=Object(c.useState)(0),O=Object(l.a)(p,2),f=O[0],y=O[1],S=Object(c.useState)({x:0,y:0,path:"http://localhost:4000/img",cur_name:""}),C=Object(l.a)(S,2),I=C[0],T=C[1];return n.version<0&&window.go.main.Basic.Flip("yes",Number(0)).then((function(e){i(e)})),d("List",(function(e){n.version!==e.version&&(i(e),console.log(e))})),Object(c.useEffect)((function(){window.go.main.Basic.Flip("yes",Number(0)).then((function(e){i(e),s({x:e.Rows,y:e.Tiers,z:e.Bays}),console.log(n)})),window.go.main.Basic.GetImageFile().then((function(e){T({x:e.x,y:e.y})}))}),[]),Object(g.jsx)("div",{className:"container-fluid ",style:{height:"100%"},children:Object(g.jsxs)("div",{className:"row",children:[Object(g.jsx)("div",{className:"col-10",children:Object(g.jsx)("div",{className:"row",children:Object(g.jsxs)("div",{className:"col-md",children:[Object(g.jsx)("div",{className:"List row border border-primary rounded",children:Object(g.jsx)(x,{items:n.Rv,bay:f})}),Object(g.jsx)("div",{children:"------------------------------------------------------------------------------------------------------------------------------------"}),Object(g.jsxs)("div",{children:[Object(g.jsxs)("label",{children:["Currently on ",f,"/",o.z-1," Bay on Ship ",n.ShipName," ","by ",n.Name," ",Object(g.jsx)("button",{className:"btn btn-primary",onClick:function(e){e.preventDefault(),f!==o.z-1&&(window.go.main.Basic.Bay(Number(f+1)).then(),y(f+1))},children:"Next Bay"}),Object(g.jsx)("button",{className:"btn btn-primary",onClick:function(e){e.preventDefault(),0!==f&&(window.go.main.Basic.Bay(Number(f-1)).then(),y(f-1))},children:"Prev Bay"})]}),Object(g.jsxs)("div",{className:"input-group mb-2",children:[Object(g.jsx)("button",{type:"button",className:"btn btn-primary input-group-prepend",onClick:function(e){e.preventDefault(),T({y:I.y-1,x:I.x})},children:"up"}),Object(g.jsx)("input",{className:"form-control",type:"number",placeholder:"Y background",value:I.y,onChange:function(e){null!==e.target.value&&""!==e.target.value&&T({y:Number(e.target.value),x:I.x,path:I.path})}}),Object(g.jsx)("button",{type:"button",className:"btn btn-primary input-group-append",onClick:function(e){e.preventDefault(),T({y:I.y+1,x:I.x,path:I.path})},children:"down"})]}),Object(g.jsxs)("div",{className:"input-group mb-3",children:[Object(g.jsx)("button",{type:"button",className:"btn btn-primary input-group-prepend",onClick:function(e){e.preventDefault(),T({y:I.y,x:I.x-1,path:I.path})},children:"left"}),Object(g.jsx)("input",{className:"form-control",type:"number",placeholder:"X background",value:I.x,onChange:function(e){null!==e.target.value&&""!==e.target.value&&T({x:Number(e.target.value),y:I.y,path:I.path})}}),Object(g.jsx)("button",{type:"button",className:"btn btn-primary input-group-append",onClick:function(e){e.preventDefault(),T({y:I.y,x:I.x+1,path:I.path})},children:"right"})]}),Object(g.jsx)("div",{children:Object(g.jsxs)("div",{className:"row",children:[Object(g.jsx)("input",{className:"col",type:"file",name:"myImage",onChange:function(e){m(e.target.files[0])}}),Object(g.jsx)("button",{type:"button",className:"btn btn-primary col mb-2",onClick:function(e){e.preventDefault(),m(null),window.go.main.Basic.RemoveImage().then((function(e){console.log(e)}))},children:"Remove"}),Object(g.jsx)("button",{type:"button",className:"btn btn-primary col mb-2",onClick:function(e){if(e.preventDefault(),window.go.main.Basic.SetImageFile(Number(I.x),Number(I.y),Number(o.x),Number(o.y)).then((function(e){alert(e)})),null!==j){var t=new FormData;t.append("Img",j);try{N.a.post("http://localhost:4000/save",t).then((function(e){e.data&&console.log(e.data)})),window.go.main.Basic.SetImageFile(Number(I.x),Number(I.y),Number(o.x),Number(o.y)).then((function(e){alert(e)}))}catch(n){console.log(n)}finally{T(Object(u.a)(Object(u.a)({},I),{},{cur_name:j.name}))}}},children:"Re-Config"}),Object(g.jsx)("button",{type:"button",className:"btn btn-primary col mb-2",onClick:function(){window.go.main.Basic.Flip("yes",Number(0)).then((function(e){i(e)}))},children:"Reload"})]})})]}),Object(g.jsx)("div",{children:"------------------------------------------------------------------------------------------------------------------------------------"}),Object(g.jsx)("div",{style:{height:"100%"},children:Object(g.jsx)(w,{dat:n,box:o,img:j,pos:I,zIndex:f})})]})})}),Object(g.jsx)("div",{className:"col-2 h-100",children:Object(g.jsx)(v,{list:n.Log})})]})})};var C,I,T,k=function(){return Object(g.jsx)("div",{className:"bg-light",style:{height:"100vh"},children:Object(g.jsx)(o.a,{backend:s.a,children:Object(g.jsx)(S,{})})})},D=n(5),B=n(31);function z(){return Object(g.jsxs)("div",{style:{textAlign:"justify",alignItems:"space-evenly"},children:[Object(g.jsx)("h1",{children:"Home page"}),Object(g.jsx)(B.b,{to:"/ship",children:"Ship"}),"||",Object(g.jsx)(B.b,{to:"/cargo",children:"Cargo"})]})}var R=["title","titleId"];function L(){return L=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var c in n)Object.prototype.hasOwnProperty.call(n,c)&&(e[c]=n[c])}return e},L.apply(this,arguments)}function F(e,t){if(null==e)return{};var n,c,i=function(e,t){if(null==e)return{};var n,c,i={},r=Object.keys(e);for(c=0;c<r.length;c++)n=r[c],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(c=0;c<r.length;c++)n=r[c],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}function E(e,t){var n=e.title,i=e.titleId,r=F(e,R);return c.createElement("svg",L({fill:"#000000",height:"800px",width:"800px",id:"Capa_1",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",viewBox:"0 0 435.926 435.926",xmlSpace:"preserve",ref:t,"aria-labelledby":i},r),n?c.createElement("title",{id:i},n):null,C||(C=c.createElement("g",{id:"SVGRepo_bgCarrier",strokeWidth:0})),I||(I=c.createElement("g",{id:"SVGRepo_tracerCarrier",strokeLinecap:"round",strokeLinejoin:"round"})),T||(T=c.createElement("g",{id:"SVGRepo_iconCarrier"},c.createElement("g",null,c.createElement("path",{d:"M434.886,210.701c-1.42-2.506-4.079-4.056-6.96-4.056h-34.625v-16.208c0-4.418-3.582-8-8-8h-24.333V150.52 c0-4.418-3.582-8-8-8h-31.667v-32.281c0-4.418-3.582-8-8-8h-79.667c-4.418,0-8,3.582-8,8v32.281h-31.667c-4.418,0-8,3.582-8,8 v31.917h-24.333c-4.418,0-8,3.582-8,8v31.583h-32.333v-87.5c0-4.418-3.582-8-8-8h-96c-4.418,0-8,3.582-8,8v87.5H8 c-2.875,0-5.529,1.542-6.952,4.041c-1.423,2.498-1.396,5.568,0.071,8.04l48.63,81.985c6.023,10.034,19.391,17.601,31.093,17.601 H345.4c11.703,0,25.071-7.567,31.098-17.607l58.292-97.323C436.27,216.285,436.307,213.208,434.886,210.701z M377.301,206.645h-56 v-8.208h56V206.645z M305.301,198.437v8.314c-13.408,1.063-22.964,10.084-27.404,15.27h-36.262v-23.583H305.301z M344.968,182.437 h-64V158.52h64V182.437z M241.635,118.239h63.667v24.281h-63.667V118.239z M201.968,158.52h63v23.917h-63V158.52z M169.635,198.437 h56v23.583h-56V198.437z M25.301,142.52h80v15.417h-16c-4.418,0-8,3.582-8,8s3.582,8,8,8h16v16.25h-16c-4.418,0-8,3.582-8,8 s3.582,8,8,8h16v15.833h-80V142.52z M362.775,307.852c-3.09,5.147-11.371,9.835-17.375,9.835H80.843 c-6.003,0-14.285-4.688-17.354-9.8L22.047,238.02h91.254h168.5c2.663,0,5.176-1.361,6.662-3.571 c0.08-0.118,8.07-11.804,19.447-11.804h76.056c0.435,0.073,0.879,0.12,1.334,0.12s0.899-0.047,1.334-0.12h27.174L362.775,307.852z"}),c.createElement("path",{d:"M65.301,157.94c-2.11,0-4.17,0.85-5.66,2.34c-1.49,1.49-2.34,3.55-2.34,5.66c0,2.1,0.85,4.16,2.34,5.65 c1.49,1.49,3.55,2.35,5.66,2.35c2.11,0,4.17-0.86,5.66-2.35c1.49-1.49,2.34-3.55,2.34-5.65c0-2.11-0.85-4.17-2.34-5.66 C69.471,158.79,67.411,157.94,65.301,157.94z"}),c.createElement("path",{d:"M41.631,157.94c-2.1,0-4.17,0.85-5.65,2.34c-1.49,1.49-2.35,3.55-2.35,5.66c0,2.1,0.86,4.16,2.35,5.65 c1.49,1.49,3.55,2.35,5.65,2.35c2.11,0,4.17-0.86,5.66-2.35c1.49-1.49,2.34-3.55,2.34-5.65c0-2.11-0.85-4.17-2.34-5.66 C45.801,158.79,43.741,157.94,41.631,157.94z"}),c.createElement("path",{d:"M65.301,190.19c-2.11,0-4.17,0.85-5.66,2.34c-1.49,1.49-2.34,3.55-2.34,5.66c0,2.1,0.85,4.16,2.34,5.65 c1.49,1.49,3.55,2.35,5.66,2.35c2.11,0,4.17-0.86,5.66-2.35c1.49-1.49,2.34-3.55,2.34-5.65c0-2.11-0.85-4.17-2.34-5.66 C69.471,191.04,67.411,190.19,65.301,190.19z"}),c.createElement("path",{d:"M41.631,190.19c-2.1,0-4.16,0.85-5.65,2.34c-1.49,1.49-2.35,3.55-2.35,5.66c0,2.1,0.86,4.16,2.35,5.65 c1.49,1.49,3.55,2.35,5.65,2.35c2.11,0,4.17-0.86,5.66-2.35c1.49-1.49,2.34-3.55,2.34-5.65c0-2.11-0.85-4.17-2.34-5.66 C45.801,191.04,43.741,190.19,41.631,190.19z"}),c.createElement("path",{d:"M121.481,254.27c-2.1,0-4.16,0.85-5.65,2.34c-1.49,1.49-2.35,3.55-2.35,5.66c0,2.1,0.86,4.17,2.35,5.66 c1.48,1.49,3.55,2.34,5.65,2.34c2.11,0,4.17-0.85,5.66-2.34c1.49-1.49,2.34-3.55,2.34-5.66c0-2.11-0.85-4.17-2.34-5.66 C125.651,255.121,123.591,254.27,121.481,254.27z"}),c.createElement("path",{d:"M153.551,254.27c-2.11,0-4.17,0.85-5.66,2.34c-1.49,1.49-2.34,3.55-2.34,5.66c0,2.11,0.85,4.17,2.34,5.66 c1.49,1.49,3.56,2.34,5.66,2.34c2.11,0,4.17-0.85,5.66-2.34c1.49-1.49,2.34-3.55,2.34-5.66c0-2.11-0.85-4.17-2.34-5.66 C157.721,255.121,155.661,254.27,153.551,254.27z"}),c.createElement("path",{d:"M185.621,254.27c-2.11,0-4.17,0.85-5.66,2.34c-1.49,1.49-2.34,3.56-2.34,5.66s0.85,4.17,2.34,5.66 c1.49,1.49,3.55,2.34,5.66,2.34c2.1,0,4.16-0.85,5.65-2.34c1.49-1.49,2.35-3.56,2.35-5.66s-0.86-4.17-2.35-5.66 C189.781,255.121,187.721,254.27,185.621,254.27z"}),c.createElement("path",{d:"M217.681,254.27c-2.1,0-4.17,0.85-5.65,2.34c-1.49,1.49-2.35,3.55-2.35,5.66c0,2.11,0.86,4.17,2.35,5.66 c1.48,1.49,3.55,2.34,5.65,2.34c2.11,0,4.17-0.85,5.66-2.34c1.49-1.49,2.34-3.55,2.34-5.66c0-2.11-0.85-4.17-2.34-5.66 C221.851,255.121,219.791,254.27,217.681,254.27z"}),c.createElement("path",{d:"M249.751,254.27c-2.1,0-4.17,0.85-5.66,2.34c-1.49,1.49-2.34,3.55-2.34,5.66c0,2.11,0.85,4.17,2.34,5.66 c1.49,1.49,3.56,2.34,5.66,2.34c2.11,0,4.17-0.85,5.66-2.34c1.49-1.49,2.34-3.55,2.34-5.66c0-2.11-0.85-4.17-2.34-5.66 C253.921,255.121,251.861,254.27,249.751,254.27z"}),c.createElement("path",{d:"M281.821,254.27c-2.11,0-4.17,0.85-5.66,2.34c-1.49,1.49-2.34,3.55-2.34,5.66c0,2.11,0.85,4.17,2.34,5.66 c1.49,1.49,3.55,2.34,5.66,2.34c2.1,0,4.16-0.85,5.65-2.34c1.49-1.49,2.35-3.55,2.35-5.66c0-2.11-0.86-4.17-2.35-5.66 C285.981,255.121,283.921,254.27,281.821,254.27z"})))))}var M=c.forwardRef(E);n.p;var W=function(e){var t=e.Iden,n=e.name,i=e.draggable,r=(e.wait,e.detail),a=e.inTime,o=e.outTime,s=(e.len,e.put),b=Object(c.useState)(!1),d=Object(l.a)(b,2),h=d[0],O=d[1],x=(Object(c.useRef)(null),Object(j.a)((function(e){return{type:"image",item:{Iden:t,Name:n},collect:function(e){return{isDragging:!!e.isDragging()}}}}))),f=Object(l.a)(x,2),v=f[0].isDragging,y=f[1],w=Object(c.useState)({inTime:a,outTime:o}),N=Object(l.a)(w,2),S=N[0],C=N[1],I=function(e){e.preventDefault(),"in"===e.target.name?C({outTime:S.outTime,inTime:e.target.value}):C({inTime:S.inTime,outTime:e.target.value})},T=function(e){e.preventDefault(),window.go.main.ShipStruct.SetTime(n,String(S.inTime),String(S.outTime)).then((function(e){alert(e)}))};return Object(g.jsx)(p.a,{show:h,overlay:function(e){return Object(g.jsx)(m.a,Object(u.a)(Object(u.a)({className:"button-tooltip"},e),{},{children:Object(g.jsxs)("ul",{children:[Object(g.jsxs)("li",{children:["From :",r.From]}),Object(g.jsxs)("li",{children:["In : ",a]}),Object(g.jsxs)("li",{children:["Out: ",o]}),s?Object(g.jsxs)("li",{children:["In:",Object(g.jsx)("input",{type:"datetime-local",value:S.inTime,onChange:I,name:"in"})]}):Object(g.jsx)(g.Fragment,{}),s?Object(g.jsxs)("li",{children:["Out:",Object(g.jsx)("input",{type:"datetime-local",value:S.outTime,onChange:I,name:"out"})]}):Object(g.jsx)(g.Fragment,{}),s?Object(g.jsx)("li",{children:Object(g.jsx)("input",{type:"button",value:"Submit",onClick:T})}):Object(g.jsx)(g.Fragment,{})]})}))},placement:"bottom",children:Object(g.jsxs)("div",{id:n,onClick:function(){O(!h)},style:{backgroundColor:"x"!==n?"white":"gray",visibility:v?"hidden":"",text_align:"x"!==n?"justify":"center",with:"100%",height:s?"30%":"100%",overflowX:"visible",maxWidth:"none !important"},ref:i?y:{},children:[Object(g.jsx)(M,{style:{width:"100%",height:"100%"}}),Object(g.jsx)("div",{style:{position:"relative",zIndex:"1"},children:"x"!==n?t+" "+n:"X"})]})})};var V=function(e){var t=e.items,n=Object(h.a)((function(){return{accept:"image",drop:function(e){return a(e.Name)},collect:function(e){return{isOut:!!e.isOver()}}}})),c=Object(l.a)(n,2),i=c[0].isOut,r=c[1],a=function(e){""!==e&&window.go.main.ShipStruct.PlaceShip(Number(-1),String(e)).then((function(e){}))};return Object(g.jsx)("div",{className:"wait",style:{border:i?"0.5rem solid rgba(0, 0, 0, 0.05)":"0.5rem solid green",flexDirection:"row",flexWrap:"wrap",display:"flex",flex:"2",height:"15rem",overflowX:"scroll"},ref:r,children:t.map((function(e){return e.Placed<0?Object(g.jsx)(W,{draggable:!0,Iden:e.Iden,name:e.Name,wait:!0,detail:e.Detail,inTime:e.InTime,outTime:e.OutTime,len:e.Length,put:!0}):Object(g.jsx)(g.Fragment,{})}))})};function P(e){var t=e.list,n=Object(c.useState)(1),i=Object(l.a)(n,2),r=i[0],a=i[1];return Object(g.jsx)("div",{className:"border border-primary rounded ",style:{height:"900px",overflowX:"scroll"},children:Object(g.jsx)("div",{onWheelCapture:function(e){if(e.shiftKey){var t=-.001*e.deltaY;a(t+r)}},style:{width:"100%",height:"100%",flex:"1",transformOrigin:"0 0",transform:"scale(".concat(r,")"),overflowY:"scroll"},children:Object(f.a)(t).reverse().map((function(e){return e.length<1?Object(g.jsx)("div",{}):Object(g.jsx)("div",{children:Object(g.jsx)("div",{style:{paddingLeft:"0.25rem",paddingTop:"0.5rem",paddingBottom:"2rem",fontSize:"0.9rem"},children:String(e)})})}))})})}var X=function(e){var t=e.items,n=e.id,c=(e.scale,e.doc),i=(e.len,Object(h.a)((function(){return{accept:"image",drop:function(e){return o(e.Name)},collect:function(e){return{isOver:!!e.isOver()}}}}))),r=Object(l.a)(i,2),a=(r[0].isOver,r[1]),o=function(e){""!==e&&window.go.main.ShipStruct.PlaceShip(Number(c.No),String(e)).then((function(){}))};return Object(g.jsx)("div",{style:{width:"100%",height:"5rem",color:"blue",visibility:"visible",alignSelf:"flex-start",background:"rgba(255, 255, 255, 0.0 )",maxWidth:"none !important"},ref:a,children:c.ShipList.map((function(e,i){return t.map((function(t,r){return i===n&&t.Name===e&&t.Placed===c.No?(console.log(t),Object(g.jsx)(W,{draggable:!0,Iden:t.Iden,name:t.Name,detail:t.Detail,inTime:t.InTime,outTime:t.OutTime,wait:!1,len:t.Length,put:!1})):i===n&&t.Name===e?Object(g.jsx)(W,{draggable:!1,Iden:t.Iden,name:"x",detail:t.Detail,inTime:t.InTime,outTime:t.OutTime,wait:!1,len:t.Length,put:!1}):Object(g.jsx)("span",{})}))}))})};var Y=function(e){var t=e.dat,n=(e.box,e.img),i=(e.pos,Object(c.useState)({width:1,height:40,scale:1})),r=Object(l.a)(i,2),a=r[0],o=r[1];return Object(g.jsx)("div",{style:{backgroundImage:null!==n?"url(".concat(URL.createObjectURL(n),")"):"url('http://localhost:4040/img')",backgroundSize:"100% 100%",backgroundRepeat:"no-repeat",width:"100%"},children:Object(g.jsx)("div",{className:"border border-success border-3",onWheelCapture:function(e){if(e.shiftKey){var t=-.001*e.deltaY+a.scale;o({width:a.width,height:a.height,scale:t})}},style:{height:"100%",width:"100%",overflowX:"scroll",overflowY:"scroll"},children:Object(g.jsx)("div",{style:{position:"relative",width:"100%",height:"100%",display:"flex",flexDirection:"row",flexWrap:"wrap"},children:t.Docks.map((function(e,n){return Object(g.jsxs)("div",{className:"".concat(-1===e.BoarderRight?" border-end border-danger border-3":""," "),style:{display:"flex",flexDirection:"column",flexWrap:"wrap",width:"calc(100%*(".concat(e.Length,"/").concat(t.Total,"))")},children:[Object(g.jsx)("div",{children:e.No}),Object(f.a)(Array(8).keys()).map((function(n,c){return Object(g.jsx)(X,{items:t.Ships,scale:a.scale,doc:e,id:7-c,len:t.Total})}))]})}))})})})};var _=function(){var e=Object(c.useState)({Docks:[{No:Number,Name:String,Length:Number,BoarderRight:Number,ShipList:[]}],Ships:[],Log:[],Total:Number}),t=Object(l.a)(e,2),n=t[0],i=t[1],r=Object(c.useState)({x:8,y:1}),a=Object(l.a)(r,2),o=a[0],s=(a[1],Object(c.useState)(null)),u=Object(l.a)(s,2),b=u[0],h=u[1],j=Object(c.useState)({x:0,y:0,path:"http://localhost:4040/Ship/img",cur_name:""}),m=Object(l.a)(j,2),p=m[0];return m[1],d("Ship",(function(e){console.log("here"),console.log(e),i(e)})),Object(c.useEffect)((function(){window.go.main.ShipStruct.Initial().then((function(e){console.log("nii"),console.log(e),i(e)}))}),[]),Object(g.jsx)("div",{className:"container-fluid ",style:{height:"100%"},children:Object(g.jsxs)("div",{className:"row",children:[Object(g.jsx)("div",{className:"col-10",children:Object(g.jsx)("div",{className:"row",children:Object(g.jsxs)("div",{className:"col-md",children:[Object(g.jsx)("div",{className:"List row border border-primary rounded",children:Object(g.jsx)(V,{items:n.Ships})}),Object(g.jsx)("div",{children:"------------------------------------------------------------------------------------------------------------------------------------"}),Object(g.jsx)("div",{children:Object(g.jsx)("div",{children:Object(g.jsxs)("div",{className:"row",children:[Object(g.jsx)("input",{className:"col",type:"file",name:"myImage",onChange:function(e){h(e.target.files[0])}}),Object(g.jsx)("button",{type:"button",className:"btn btn-primary col mb-2",onClick:function(e){e.preventDefault(),h(null),window.go.main.ShipStruct.RemoveImage().then((function(e){console.log(e)}))},children:"Remove"}),Object(g.jsx)("button",{type:"button",className:"btn btn-primary col mb-2",onClick:function(e){if(e.preventDefault(),null!==b){var t=new FormData;t.append("Img",b);try{N.a.post("http://localhost:4040/save",t).then((function(e){alert(e)}))}catch(n){alert(n)}}},children:"Re-Config"})]})})}),Object(g.jsx)("div",{children:"------------------------------------------------------------------------------------------------------------------------------------"}),Object(g.jsx)("div",{style:{width:"100%"},children:Object(g.jsx)(Y,{dat:n,box:o,img:b,pos:p})})]})})}),Object(g.jsx)("div",{className:"col-2 h-100",children:Object(g.jsx)(P,{list:n.Log})})]})})};var A=function(){return Object(g.jsx)("div",{className:"bg-light",style:{height:"100vh"},children:Object(g.jsx)(o.a,{backend:s.a,children:Object(g.jsx)(_,{})})})};var G=function(){var e=Object(c.useState)([]),t=Object(l.a)(e,2);return t[0],t[1],Object(g.jsx)("div",{children:Object(g.jsxs)(D.c,{children:[Object(g.jsx)(D.a,{path:"/",element:Object(g.jsx)(z,{})}),Object(g.jsx)(D.a,{path:"/ship",element:Object(g.jsx)(A,{})}),Object(g.jsx)(D.a,{path:"/cargo",element:Object(g.jsx)(k,{})})]})})},H=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,123)).then((function(t){var n=t.getCLS,c=t.getFID,i=t.getFCP,r=t.getLCP,a=t.getTTFB;n(e),c(e),i(e),r(e),a(e)}))};n(85),n(86);a.a.render(Object(g.jsx)(i.a.StrictMode,{children:Object(g.jsx)(B.a,{children:Object(g.jsx)(G,{})})}),document.getElementById("root")),H()},77:function(e,t,n){},78:function(e,t,n){}},[[108,1,2]]]);
//# sourceMappingURL=main.5047f96d.chunk.js.map