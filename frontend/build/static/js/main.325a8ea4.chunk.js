(this["webpackJsonpreact-template"]=this["webpackJsonpreact-template"]||[]).push([[0],{108:function(e,t,n){"use strict";n.r(t);var i=n(0),r=n.n(i),c=n(18),a=n.n(c),l=(n(77),n(3)),o=(n(78),n(120)),s=n(52),u=n(7);function d(e,t,n){return window.runtime.EventsOnMultiple(e,t,n)}function b(e,t){return d(e,t,-1)}var j=n(123),m=n(122),h=n(59),g=n(51),O=n(1);var p=function(e){var t=e.Iden,n=e.name,i=e.draggable,r=(e.wait,e.detail),c=Object(m.a)((function(e){return{type:"image",item:{Iden:t,Name:n},collect:function(e){return{isDragging:!!e.isDragging()}}}})),a=Object(l.a)(c,2),o=a[0].isDragging,s=a[1];return Object(O.jsx)(g.a,{delay:{hide:450,show:300},overlay:function(e){return Object(O.jsx)(h.a,Object(u.a)(Object(u.a)({className:"button-tooltip"},e),{},{children:Object(O.jsxs)("ul",{children:[Object(O.jsxs)("li",{children:["From :",r.From]}),Object(O.jsxs)("li",{children:["Owner :",r.Owner]}),Object(O.jsxs)("li",{children:["By :",r.By]}),Object(O.jsxs)("li",{children:["At :",r.AtTime]})]})}))},placement:"bottom",children:Object(O.jsx)("div",{id:n,style:{backgroundColor:"x"!==n?"black":"DarkGrey",color:"white",visibility:o?"hidden":"",text_align:"x"!==n?"justify":"center",width:"3rem",height:"3rem"},ref:i?s:{},children:"x"!==n?t+" "+n:"X"})})};var x=function(e){var t=e.items,n=Object(j.a)((function(){return{accept:"image",drop:function(e){return a(e.Iden)},collect:function(e){return{isOut:!!e.isOver()}}}})),i=Object(l.a)(n,2),r=i[0].isOut,c=i[1],a=function(e){e<0||window.go.main.Basic.Flip(String(e),Number(-1)).then((function(e){}))};return Object(O.jsx)("div",{className:"wait",style:{border:r?"0.5rem solid rgba(0, 0, 0, 0.05)":"0.5rem solid green",flexDirection:"row",flexWrap:"wrap",display:"flex",flex:"2",height:"5rem"},ref:c,children:t.map((function(e){return e.Placed<0?Object(O.jsx)(p,{draggable:!0,Iden:e.Iden,name:e.Name,wait:!0,detail:e.Detail}):Object(O.jsx)(O.Fragment,{})}))})},f=n(12);function v(e){var t=e.list,n=Object(i.useState)(1),r=Object(l.a)(n,2),c=r[0],a=r[1];return Object(O.jsx)("div",{className:"border border-primary rounded ",style:{height:"900px",overflowX:"scroll"},children:Object(O.jsx)("div",{onWheelCapture:function(e){if(e.shiftKey){var t=-.001*e.deltaY;a(t+c)}},style:{width:"100%",height:"100%",flex:"1",transformOrigin:"0 0",transform:"scale(".concat(c,")"),overflowY:"scroll"},children:Object(f.a)(t).reverse().map((function(e){return e.length<1?Object(O.jsx)("div",{}):Object(O.jsx)("div",{children:Object(O.jsx)("div",{style:{paddingLeft:"0.25rem",paddingTop:"0.5rem",paddingBottom:"2rem",fontSize:"0.9rem"},children:String(e)})})}))})})}var y=function(e){var t=e.items,n=e.id,i=e.scale,r=Object(j.a)((function(){return{accept:"image",drop:function(e){return s(e.Iden)},collect:function(e){return{isOver:!!e.isOver()}}}})),c=Object(l.a)(r,2),a=c[0].isOver,o=c[1],s=function(e){e<=0||window.go.main.Basic.Flip(String(e),Number(n)).then((function(e){}))};return Object(O.jsx)("div",{className:"Drop",style:{border:a?"1rem solid rgba(255, 0, 0, 0.05)":"1rem solid yellow",width:"5rem",height:"5rem",color:"blue",visibility:"visible",alignSelf:"flex-start",background:"rgba(255, 255, 255, 0.0 )",transform:"scale(".concat(i,")")},ref:o,children:t.map((function(e){return e.Placed===n?Object(O.jsx)(p,{draggable:!0,Iden:e.Iden,name:e.Name,detail:e.Detail}):Object(O.jsx)(O.Fragment,{})}))})};var w=function(e){var t=e.dat,n=e.box,r=e.img,c=e.pos,a=Object(i.useState)({width:1,height:40,scale:1}),o=Object(l.a)(a,2),s=o[0],u=o[1];return Object(O.jsx)("div",{style:{height:"100%",backgroundImage:null!==r?"url(".concat(URL.createObjectURL(r),")"):"url('http://localhost:4000/img')",backgroundPosition:"".concat(c.x,"px ").concat(c.y,"px"),backgroundSize:"auto 100%",backgroundRepeat:"no-repeat",width:"100%"},children:Object(O.jsx)("div",{className:"border border-success border-3",onWheelCapture:function(e){if(e.shiftKey){var t=-.001*e.deltaY+s.scale;u({width:s.width,height:s.height,scale:t})}},style:{height:"100%",overflowX:"scroll",overflowY:"scroll"},children:Object(O.jsx)("div",{style:{height:"100%",width:"100%",display:"flex",flexDirection:"row",flexWrap:"wrap",justifyContent:"space-evenly",transformOrigin:"0 0",paddingTop:"calc(5rem)"},children:Object(f.a)(Array(n.y).keys()).map((function(e,i){return Object(O.jsx)("div",{style:{height:"5rem",width:"90rem",display:"flex",flexDirection:"row",flexWrap:"wrap",justifyContent:"space-evenly"},children:Object(f.a)(Array(n.x).keys()).map((function(e,r){return Object(O.jsx)(y,{items:t.Rv,id:Number(r+i*n.x),scale:s.scale})}))})}))})})})},N=n(121);var S=function(){var e=Object(i.useState)({Rv:[],version:-1,Log:[]}),t=Object(l.a)(e,2),n=t[0],r=t[1],c=Object(i.useState)({x:8,y:1}),a=Object(l.a)(c,2),o=a[0],s=a[1],d=Object(i.useState)(null),j=Object(l.a)(d,2),m=j[0],h=j[1],g=Object(i.useState)({x:0,y:0,path:"http://localhost:4000/img",cur_name:""}),p=Object(l.a)(g,2),f=p[0],y=p[1];return n.version<0&&window.go.main.Basic.Flip("yes",Number(0)).then((function(e){r(e)})),b("List",(function(e){n.version!==e.version&&r(e)})),Object(i.useEffect)((function(){window.go.main.Basic.Flip("yes",Number(0)).then((function(e){r(e),console.log(n)})),window.go.main.Basic.GetImageFile().then((function(e){y({x:e.x,y:e.y}),s({x:e.col,y:e.row})}))}),[]),Object(O.jsx)("div",{className:"container-fluid ",style:{},children:Object(O.jsxs)("div",{className:"row",children:[Object(O.jsx)("div",{className:"col-10",children:Object(O.jsx)("div",{className:"row",style:{alignSelf:"flex-start",width:"100%",height:"100%"},children:Object(O.jsxs)("div",{className:"col-md",children:[Object(O.jsx)("div",{className:"List row border border-primary rounded",style:{},children:Object(O.jsx)(x,{items:n.Rv})}),Object(O.jsx)("div",{children:"------------------------------------------------------------------------------------------------------------------------------------"}),Object(O.jsxs)("div",{style:{},children:[Object(O.jsx)("label",{children:"Change number of row, colum input"}),Object(O.jsxs)("div",{className:"input-group mb-2 ",label:"Change number of row, colum input",style:{},children:[Object(O.jsx)("input",{className:"form-control",type:"number",placeholder:"Number of row for Block",onChange:function(e){if(null!==e.target.value&&""!==e.target.value)return e.target.value<1?(e.target.value=1,void s({y:Number(e.target.value),x:o.x,set:!0})):void s({y:Number(e.target.value),x:o.x,set:!0})}}),Object(O.jsx)("input",{className:"form-control",type:"number",placeholder:"Number of column for block",onChange:function(e){if(null!==e.target.value&&""!==e.target.value)return e.target.value<1?(e.target.value=1,void s({x:Number(e.target.value),y:o.y,set:!0})):void s({x:Number(e.target.value),y:o.y,set:!0})}})]}),Object(O.jsxs)("div",{className:"input-group mb-2",style:{},children:[Object(O.jsx)("button",{type:"button",className:"btn btn-primary input-group-prepend",onClick:function(e){e.preventDefault(),y({y:f.y-1,x:f.x})},children:"up"}),Object(O.jsx)("input",{className:"form-control",type:"number",placeholder:"Y background",value:f.y,onChange:function(e){null!==e.target.value&&""!==e.target.value&&y({y:Number(e.target.value),x:f.x,path:f.path})}}),Object(O.jsx)("button",{type:"button",className:"btn btn-primary input-group-append",onClick:function(e){e.preventDefault(),y({y:f.y+1,x:f.x,path:f.path})},children:"down"})]}),Object(O.jsxs)("div",{className:"input-group mb-3",style:{},children:[Object(O.jsx)("button",{type:"button",className:"btn btn-primary input-group-prepend",onClick:function(e){e.preventDefault(),y({y:f.y,x:f.x-1,path:f.path})},children:"left"}),Object(O.jsx)("input",{className:"form-control",type:"number",placeholder:"X background",value:f.x,onChange:function(e){null!==e.target.value&&""!==e.target.value&&y({x:Number(e.target.value),y:f.y,path:f.path})}}),Object(O.jsx)("button",{type:"button",className:"btn btn-primary input-group-append",onClick:function(e){e.preventDefault(),y({y:f.y,x:f.x+1,path:f.path})},children:"right"})]}),Object(O.jsx)("div",{children:Object(O.jsxs)("div",{className:"row",style:{},children:[Object(O.jsx)("input",{className:"col",type:"file",name:"myImage",style:{},onChange:function(e){h(e.target.files[0])}}),Object(O.jsx)("button",{type:"button",className:"btn btn-primary col mb-2",onClick:function(e){e.preventDefault(),h(null),window.go.main.Basic.RemoveImage().then((function(e){console.log(e)}))},children:"Remove"}),Object(O.jsx)("button",{type:"button",className:"btn btn-primary col mb-2",onClick:function(e){if(e.preventDefault(),window.go.main.Basic.SetImageFile(Number(f.x),Number(f.y),Number(o.x),Number(o.y)).then((function(e){alert(e)})),null!==m){var t=new FormData;t.append("Img",m);try{N.a.post("http://localhost:4000/save",t).then((function(e){e.data&&console.log(e.data)})),window.go.main.Basic.SetImageFile(Number(f.x),Number(f.y),Number(o.x),Number(o.y)).then((function(e){alert(e)}))}catch(n){console.log(n)}finally{y(Object(u.a)(Object(u.a)({},f),{},{cur_name:m.name}))}}},children:"Re-Config"}),Object(O.jsx)("button",{type:"button",className:"btn btn-primary col mb-2",onClick:function(){window.go.main.Basic.Flip("yes",Number(0)).then((function(e){r(e)}))},children:"Reload"})]})})]}),Object(O.jsx)("div",{children:"------------------------------------------------------------------------------------------------------------------------------------"}),Object(O.jsx)("div",{style:{height:"100%"},children:Object(O.jsx)(w,{dat:n,box:o,img:m,pos:f})})]})})}),Object(O.jsx)("div",{className:"col-2 h-100",children:Object(O.jsx)(v,{list:n.Log})})]})})};var k=function(){return Object(O.jsx)("div",{className:"bg-light",style:{},children:Object(O.jsx)(o.a,{backend:s.a,children:Object(O.jsx)(S,{})})})},C=n(5),I=n(31);function D(){return Object(O.jsxs)("div",{style:{textAlign:"justify",alignItems:"space-evenly"},children:[Object(O.jsx)("h1",{children:"Home page"}),Object(O.jsx)(I.b,{to:"/ship",children:"Ship"}),"||",Object(O.jsx)(I.b,{to:"/cargo",children:"Cargo"})]})}var T=n(71);var F=function(e){var t=e.Iden,n=e.name,r=e.draggable,c=(e.wait,e.detail),a=e.inTime,o=e.outTime,s=e.len,d=e.put,b=Object(i.useState)(!1),j=Object(l.a)(b,2),h=j[0],p=j[1],x=(Object(i.useRef)(null),Object(m.a)((function(e){return{type:"image",item:{Iden:t,Name:n},collect:function(e){return{isDragging:!!e.isDragging()}}}}))),f=Object(l.a)(x,2),v=f[0].isDragging,y=f[1],w=Object(i.useState)({inTime:a,outTime:o}),N=Object(l.a)(w,2),S=N[0],k=N[1],C=function(e){e.preventDefault(),"in"===e.target.name?k({outTime:S.outTime,inTime:e.target.value}):k({inTime:S.inTime,outTime:e.target.value})},I=function(e){e.preventDefault(),window.go.main.ShipStruct.SetTime(n,String(S.inTime),String(S.outTime)).then((function(e){alert(e)}))};return Object(O.jsx)(g.a,{show:h,overlay:function(e){return Object(O.jsx)(T.a,Object(u.a)(Object(u.a)({className:"button-tooltip"},e),{},{children:Object(O.jsxs)("ul",{children:[Object(O.jsxs)("li",{children:["From :",c.From]}),Object(O.jsxs)("li",{children:["In : ",a]}),Object(O.jsxs)("li",{children:["Out: ",o]}),d?Object(O.jsxs)("li",{children:["In:",Object(O.jsx)("input",{type:"datetime-local",value:S.inTime,onChange:C,name:"in"})]}):Object(O.jsx)(O.Fragment,{}),d?Object(O.jsxs)("li",{children:["Out:",Object(O.jsx)("input",{type:"datetime-local",value:S.outTime,onChange:C,name:"out"})]}):Object(O.jsx)(O.Fragment,{}),d?Object(O.jsx)("li",{children:Object(O.jsx)("input",{type:"button",value:"Submit",onClick:I})}):Object(O.jsx)(O.Fragment,{})]})}))},placement:"bottom",children:Object(O.jsx)("div",{className:"bg-black border border-light",id:n,onClick:function(){p(!h)},style:{color:"white",visibility:v?"hidden":"",text_align:"x"!==n?"justify":"center",width:d?String("calc(100%/6 *("+String(s)+"/"+String(200)+"))"):"calc(100% *("+String(s)+"/"+String(200)+"))",height:"4rem",overflowX:"visible",maxWidth:"none !important"},ref:r?y:{},children:"x"!==n?t+" "+n:"X"})})};var L=function(e){var t=e.items,n=Object(j.a)((function(){return{accept:"image",drop:function(e){return a(e.Name)},collect:function(e){return{isOut:!!e.isOver()}}}})),i=Object(l.a)(n,2),r=i[0].isOut,c=i[1],a=function(e){""!==e&&window.go.main.ShipStruct.PlaceShip(Number(-1),String(e)).then((function(e){}))};return Object(O.jsx)("div",{className:"wait",style:{border:r?"0.5rem solid rgba(0, 0, 0, 0.05)":"0.5rem solid green",flexDirection:"row",flexWrap:"wrap",display:"flex",flex:"2",height:"15rem",overflowX:"scroll"},ref:c,children:t.map((function(e){return e.Placed<0?Object(O.jsx)(F,{draggable:!0,Iden:e.Iden,name:e.Name,wait:!0,detail:e.Detail,inTime:e.InTime,outTime:e.OutTime,len:e.Length,put:!0}):Object(O.jsx)(O.Fragment,{})}))})};function B(e){var t=e.list,n=Object(i.useState)(1),r=Object(l.a)(n,2),c=r[0],a=r[1];return Object(O.jsx)("div",{className:"border border-primary rounded ",style:{height:"900px",overflowX:"scroll"},children:Object(O.jsx)("div",{onWheelCapture:function(e){if(e.shiftKey){var t=-.001*e.deltaY;a(t+c)}},style:{width:"100%",height:"100%",flex:"1",transformOrigin:"0 0",transform:"scale(".concat(c,")"),overflowY:"scroll"},children:Object(f.a)(t).reverse().map((function(e){return e.length<1?Object(O.jsx)("div",{}):Object(O.jsx)("div",{children:Object(O.jsx)("div",{style:{paddingLeft:"0.25rem",paddingTop:"0.5rem",paddingBottom:"2rem",fontSize:"0.9rem"},children:String(e)})})}))})})}var R=function(e){var t=e.items,n=e.id,i=(e.scale,e.doc),r=Object(j.a)((function(){return{accept:"image",drop:function(e){return o(e.Name)},collect:function(e){return{isOver:!!e.isOver()}}}})),c=Object(l.a)(r,2),a=(c[0].isOver,c[1]),o=function(e){""!==e&&window.go.main.ShipStruct.PlaceShip(Number(i.No),String(e)).then((function(){}))};return Object(O.jsx)("div",{className:"Drop row border border-danger border-3",style:{width:"11rem",height:"5rem",color:"blue",visibility:"visible",alignSelf:"flex-start",background:"rgba(255, 255, 255, 0.0 )"},ref:a,children:i.ShipList.map((function(e,r){return t.map((function(t,c){return r===n&&t.Name===e&&t.Placed===i.No?(console.log(t),Object(O.jsx)(F,{draggable:!0,Iden:t.Iden,name:t.Name,detail:t.Detail,inTime:t.InTime,outTime:t.OutTime,wait:!1,len:t.Length,put:!1})):Object(O.jsx)(O.Fragment,{})}))}))})};var P=function(e){var t=e.dat,n=(e.box,e.img),r=e.pos,c=Object(i.useState)({width:1,height:40,scale:1}),a=Object(l.a)(c,2),o=a[0],s=a[1];return Object(O.jsx)("div",{style:{height:"100%",backgroundImage:null!==n?"url(".concat(URL.createObjectURL(n),")"):"url('http://localhost:4040/img')",backgroundPosition:"".concat(r.x,"px ").concat(r.y,"px"),backgroundSize:"auto 100%",backgroundRepeat:"no-repeat",width:"100%"},children:Object(O.jsx)("div",{className:"border border-success border-3 container-fluid",onWheelCapture:function(e){if(e.shiftKey){var t=-.001*e.deltaY+o.scale;s({width:o.width,height:o.height,scale:t})}},style:{height:"100%",width:"100%",overflowX:"scroll",overflowY:"scroll"},children:Object(O.jsx)("div",{className:"row",children:t.Docks.map((function(e,n){return Object(O.jsxs)("div",{className:"col-2",children:[Object(O.jsx)("div",{className:"row",children:e.No}),Object(f.a)(Array(8).keys()).map((function(n,i){return Object(O.jsx)(R,{items:t.Ships,scale:o.scale,doc:e,id:i})}))]})}))})})})};var W=function(){var e=Object(i.useState)({Docks:[{No:Number,Name:String,Length:Number,BoarderRight:Number,ShipList:[]}],Ships:[],Log:[]}),t=Object(l.a)(e,2),n=t[0],r=t[1],c=Object(i.useState)({x:8,y:1}),a=Object(l.a)(c,2),o=a[0],s=(a[1],Object(i.useState)(null)),u=Object(l.a)(s,2),d=u[0],j=(u[1],Object(i.useState)({x:0,y:0,path:"http://localhost:4040/img",cur_name:""})),m=Object(l.a)(j,2),h=m[0];return m[1],b("Ship",(function(e){console.log("here"),console.log(e),r(e)})),Object(i.useEffect)((function(){window.go.main.ShipStruct.Initial().then((function(e){console.log("nii"),console.log(e),r(e)}))}),[]),Object(O.jsx)("div",{className:"container-fluid ",children:Object(O.jsxs)("div",{className:"row",children:[Object(O.jsx)("div",{className:"col-10",children:Object(O.jsx)("div",{className:"row",style:{alignSelf:"flex-start",width:"100%",height:"100%"},children:Object(O.jsxs)("div",{className:"col-md",children:[Object(O.jsx)("div",{className:"List row border border-primary rounded",children:Object(O.jsx)(L,{items:n.Ships})}),Object(O.jsx)("div",{children:"------------------------------------------------------------------------------------------------------------------------------------"}),Object(O.jsx)("div",{children:"------------------------------------------------------------------------------------------------------------------------------------"}),Object(O.jsx)("div",{style:{height:"100%",width:"100%"},children:Object(O.jsx)(P,{dat:n,box:o,img:d,pos:h})})]})})}),Object(O.jsx)("div",{className:"col-2 h-100",children:Object(O.jsx)(B,{list:n.Log})})]})})};var X=function(){return Object(O.jsx)("div",{className:"bg-light",style:{},children:Object(O.jsx)(o.a,{backend:s.a,children:Object(O.jsx)(W,{})})})};var Y=function(){var e=Object(i.useState)([]),t=Object(l.a)(e,2);return t[0],t[1],Object(O.jsx)("div",{children:Object(O.jsxs)(C.c,{children:[Object(O.jsx)(C.a,{path:"/",element:Object(O.jsx)(D,{})}),Object(O.jsx)(C.a,{path:"/ship",element:Object(O.jsx)(X,{})}),Object(O.jsx)(C.a,{path:"/cargo",element:Object(O.jsx)(k,{})})]})})},A=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,124)).then((function(t){var n=t.getCLS,i=t.getFID,r=t.getFCP,c=t.getLCP,a=t.getTTFB;n(e),i(e),r(e),c(e),a(e)}))};n(85),n(86);a.a.render(Object(O.jsx)(r.a.StrictMode,{children:Object(O.jsx)(I.a,{children:Object(O.jsx)(Y,{})})}),document.getElementById("root")),A()},77:function(e,t,n){},78:function(e,t,n){}},[[108,1,2]]]);
//# sourceMappingURL=main.325a8ea4.chunk.js.map