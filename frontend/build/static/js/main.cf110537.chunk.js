(this["webpackJsonpreact-template"]=this["webpackJsonpreact-template"]||[]).push([[0],{100:function(e,t,n){"use strict";n.r(t);var i=n(0),r=n.n(i),c=n(17),a=n.n(c),l=(n(69),n(3)),o=(n(70),n(111)),s=n(49),d=n(7);function u(e,t,n){return window.runtime.EventsOnMultiple(e,t,n)}function b(e,t){return u(e,t,-1)}var j=n(114),h=n(113),m=n(42),g=n(48),O=n(1);var x=function(e){var t=e.Iden,n=e.name,i=e.draggable,r=(e.wait,e.detail),c=Object(h.a)((function(e){return{type:"image",item:{Iden:t,Name:n},collect:function(e){return{isDragging:!!e.isDragging()}}}})),a=Object(l.a)(c,2),o=a[0].isDragging,s=a[1];return Object(O.jsx)(g.a,{delay:{hide:450,show:300},overlay:function(e){return Object(O.jsx)(m.a,Object(d.a)(Object(d.a)({className:"button-tooltip"},e),{},{children:Object(O.jsxs)("ul",{children:[Object(O.jsxs)("li",{children:["From :",r.From]}),Object(O.jsxs)("li",{children:["Owner :",r.Owner]}),Object(O.jsxs)("li",{children:["By :",r.By]}),Object(O.jsxs)("li",{children:["At :",r.AtTime]})]})}))},placement:"bottom",children:Object(O.jsx)("div",{id:n,style:{backgroundColor:"x"!==n?"black":"DarkGrey",color:"white",visibility:o?"hidden":"",text_align:"x"!==n?"justify":"center",width:"3rem",height:"3rem"},ref:i?s:{},children:"x"!==n?t+" "+n:"X"})})};var p=function(e){var t=e.items,n=Object(j.a)((function(){return{accept:"image",drop:function(e){return a(e.Iden)},collect:function(e){return{isOut:!!e.isOver()}}}})),i=Object(l.a)(n,2),r=i[0].isOut,c=i[1],a=function(e){e<0||window.go.main.Basic.Flip(String(e),Number(-1)).then((function(e){}))};return Object(O.jsx)("div",{className:"wait",style:{border:r?"0.5rem solid rgba(0, 0, 0, 0.05)":"0.5rem solid green",flexDirection:"row",flexWrap:"wrap",display:"flex",flex:"2",height:"5rem"},ref:c,children:t.map((function(e){return e.Placed<0?Object(O.jsx)(x,{draggable:!0,Iden:e.Iden,name:e.Name,wait:!0,detail:e.Detail}):Object(O.jsx)(O.Fragment,{})}))})},f=n(12);function v(e){var t=e.list,n=Object(i.useState)(1),r=Object(l.a)(n,2),c=r[0],a=r[1];return Object(O.jsx)("div",{className:"border border-primary rounded ",style:{height:"900px",overflowX:"scroll"},children:Object(O.jsx)("div",{onWheelCapture:function(e){if(e.shiftKey){var t=-.001*e.deltaY;a(t+c)}},style:{width:"100%",height:"100%",flex:"1",transformOrigin:"0 0",transform:"scale(".concat(c,")"),overflowY:"scroll"},children:Object(f.a)(t).reverse().map((function(e){return e.length<1?Object(O.jsx)("div",{}):Object(O.jsx)("div",{children:Object(O.jsx)("div",{style:{paddingLeft:"0.25rem",paddingTop:"0.5rem",paddingBottom:"2rem",fontSize:"0.9rem"},children:String(e)})})}))})})}var y=function(e){var t=e.items,n=e.id,i=e.scale,r=Object(j.a)((function(){return{accept:"image",drop:function(e){return s(e.Iden)},collect:function(e){return{isOver:!!e.isOver()}}}})),c=Object(l.a)(r,2),a=c[0].isOver,o=c[1],s=function(e){e<=0||window.go.main.Basic.Flip(String(e),Number(n)).then((function(e){}))};return Object(O.jsx)("div",{className:"Drop",style:{border:a?"1rem solid rgba(255, 0, 0, 0.05)":"1rem solid yellow",width:"5rem",height:"5rem",color:"blue",visibility:"visible",alignSelf:"flex-start",background:"rgba(255, 255, 255, 0.0 )",transform:"scale(".concat(i,")")},ref:o,children:t.map((function(e){return e.Placed===n?Object(O.jsx)(x,{draggable:!0,Iden:e.Iden,name:e.Name,detail:e.Detail}):Object(O.jsx)(O.Fragment,{})}))})};var w=function(e){var t=e.dat,n=e.box,r=e.img,c=e.pos,a=Object(i.useState)({width:1,height:40,scale:1}),o=Object(l.a)(a,2),s=o[0],d=o[1];return Object(O.jsx)("div",{style:{height:"100%",backgroundImage:null!==r?"url(".concat(URL.createObjectURL(r),")"):"url('http://localhost:4000/img')",backgroundPosition:"".concat(c.x,"px ").concat(c.y,"px"),backgroundSize:"auto 100%",backgroundRepeat:"no-repeat",width:"100%"},children:Object(O.jsx)("div",{className:"border border-success border-3",onWheelCapture:function(e){if(e.shiftKey){var t=-.001*e.deltaY+s.scale;d({width:s.width,height:s.height,scale:t})}},style:{height:"100%",overflowX:"scroll",overflowY:"scroll"},children:Object(O.jsx)("div",{style:{height:"100%",width:"100%",display:"flex",flexDirection:"row",flexWrap:"wrap",justifyContent:"space-evenly",transformOrigin:"0 0",paddingTop:"calc(5rem)"},children:Object(f.a)(Array(n.y).keys()).map((function(e,i){return Object(O.jsx)("div",{style:{height:"5rem",width:"90rem",display:"flex",flexDirection:"row",flexWrap:"wrap",justifyContent:"space-evenly"},children:Object(f.a)(Array(n.x).keys()).map((function(e,r){return Object(O.jsx)(y,{items:t.Rv,id:Number(r+i*n.x),scale:s.scale})}))})}))})})})},N=n(112);var S=function(){var e=Object(i.useState)({Rv:[],version:-1,Log:[]}),t=Object(l.a)(e,2),n=t[0],r=t[1],c=Object(i.useState)({x:8,y:1}),a=Object(l.a)(c,2),o=a[0],s=a[1],u=Object(i.useState)(null),j=Object(l.a)(u,2),h=j[0],m=j[1],g=Object(i.useState)({x:0,y:0,path:"http://localhost:4000/img",cur_name:""}),x=Object(l.a)(g,2),f=x[0],y=x[1];return n.version<0&&window.go.main.Basic.Flip("yes",Number(0)).then((function(e){r(e)})),b("List",(function(e){n.version!==e.version&&r(e)})),Object(i.useEffect)((function(){window.go.main.Basic.Flip("yes",Number(0)).then((function(e){r(e),console.log(n)})),window.go.main.Basic.GetImageFile().then((function(e){y({x:e.x,y:e.y}),s({x:e.col,y:e.row})}))}),[]),Object(O.jsx)("div",{className:"container-fluid ",style:{},children:Object(O.jsxs)("div",{className:"row",children:[Object(O.jsx)("div",{className:"col-10",children:Object(O.jsx)("div",{className:"row",style:{alignSelf:"flex-start",width:"100%",height:"100%"},children:Object(O.jsxs)("div",{className:"col-md",children:[Object(O.jsx)("div",{className:"List row border border-primary rounded",style:{},children:Object(O.jsx)(p,{items:n.Rv})}),Object(O.jsx)("div",{children:"------------------------------------------------------------------------------------------------------------------------------------"}),Object(O.jsxs)("div",{style:{},children:[Object(O.jsx)("label",{children:"Change number of row, colum input"}),Object(O.jsxs)("div",{className:"input-group mb-2 ",label:"Change number of row, colum input",style:{},children:[Object(O.jsx)("input",{className:"form-control",type:"number",placeholder:"Number of row for Block",onChange:function(e){if(null!==e.target.value&&""!==e.target.value)return e.target.value<1?(e.target.value=1,void s({y:Number(e.target.value),x:o.x,set:!0})):void s({y:Number(e.target.value),x:o.x,set:!0})}}),Object(O.jsx)("input",{className:"form-control",type:"number",placeholder:"Number of column for block",onChange:function(e){if(null!==e.target.value&&""!==e.target.value)return e.target.value<1?(e.target.value=1,void s({x:Number(e.target.value),y:o.y,set:!0})):void s({x:Number(e.target.value),y:o.y,set:!0})}})]}),Object(O.jsxs)("div",{className:"input-group mb-2",style:{},children:[Object(O.jsx)("button",{type:"button",className:"btn btn-primary input-group-prepend",onClick:function(e){e.preventDefault(),y({y:f.y-1,x:f.x})},children:"up"}),Object(O.jsx)("input",{className:"form-control",type:"number",placeholder:"Y background",value:f.y,onChange:function(e){null!==e.target.value&&""!==e.target.value&&y({y:Number(e.target.value),x:f.x,path:f.path})}}),Object(O.jsx)("button",{type:"button",className:"btn btn-primary input-group-append",onClick:function(e){e.preventDefault(),y({y:f.y+1,x:f.x,path:f.path})},children:"down"})]}),Object(O.jsxs)("div",{className:"input-group mb-3",style:{},children:[Object(O.jsx)("button",{type:"button",className:"btn btn-primary input-group-prepend",onClick:function(e){e.preventDefault(),y({y:f.y,x:f.x-1,path:f.path})},children:"left"}),Object(O.jsx)("input",{className:"form-control",type:"number",placeholder:"X background",value:f.x,onChange:function(e){null!==e.target.value&&""!==e.target.value&&y({x:Number(e.target.value),y:f.y,path:f.path})}}),Object(O.jsx)("button",{type:"button",className:"btn btn-primary input-group-append",onClick:function(e){e.preventDefault(),y({y:f.y,x:f.x+1,path:f.path})},children:"right"})]}),Object(O.jsx)("div",{children:Object(O.jsxs)("div",{className:"row",style:{},children:[Object(O.jsx)("input",{className:"col",type:"file",name:"myImage",style:{},onChange:function(e){m(e.target.files[0])}}),Object(O.jsx)("button",{type:"button",className:"btn btn-primary col mb-2",onClick:function(e){e.preventDefault(),m(null),window.go.main.Basic.RemoveImage().then((function(e){console.log(e)}))},children:"Remove"}),Object(O.jsx)("button",{type:"button",className:"btn btn-primary col mb-2",onClick:function(e){if(e.preventDefault(),window.go.main.Basic.SetImageFile(Number(f.x),Number(f.y),Number(o.x),Number(o.y)).then((function(e){alert(e)})),null!==h){var t=new FormData;t.append("Img",h);try{N.a.post("http://localhost:4000/save",t).then((function(e){e.data&&console.log(e.data)})),window.go.main.Basic.SetImageFile(Number(f.x),Number(f.y),Number(o.x),Number(o.y)).then((function(e){alert(e)}))}catch(n){console.log(n)}finally{y(Object(d.a)(Object(d.a)({},f),{},{cur_name:h.name}))}}},children:"Re-Config"}),Object(O.jsx)("button",{type:"button",className:"btn btn-primary col mb-2",onClick:function(){window.go.main.Basic.Flip("yes",Number(0)).then((function(e){r(e)}))},children:"Reload"})]})})]}),Object(O.jsx)("div",{children:"------------------------------------------------------------------------------------------------------------------------------------"}),Object(O.jsx)("div",{style:{height:"100%"},children:Object(O.jsx)(w,{dat:n,box:o,img:h,pos:f})})]})})}),Object(O.jsx)("div",{className:"col-2 h-100",children:Object(O.jsx)(v,{list:n.Log})})]})})};var k=function(){return Object(O.jsx)("div",{className:"bg-light",style:{},children:Object(O.jsx)(o.a,{backend:s.a,children:Object(O.jsx)(S,{})})})},I=n(5),D=n(28);function C(){return Object(O.jsxs)("div",{style:{textAlign:"justify",alignItems:"space-evenly"},children:[Object(O.jsx)("h1",{children:"Home page"}),Object(O.jsx)(D.b,{to:"/ship",children:"Ship"}),"||",Object(O.jsx)(D.b,{to:"/cargo",children:"Cargo"})]})}var F=function(e){var t=e.Iden,n=e.name,r=e.draggable,c=(e.wait,e.detail),a=e.inTime,o=e.outTime,s=e.len,u=Object(h.a)((function(e){return{type:"image",item:{Iden:t,Name:n},collect:function(e){return{isDragging:!!e.isDragging()}}}})),b=Object(l.a)(u,2),j=b[0].isDragging,x=b[1],p=Object(i.useState)({inTime:a,outTime:o}),f=Object(l.a)(p,2);return f[0],f[1],Object(O.jsx)(g.a,{delay:{hide:450,show:300},overlay:function(e){return Object(O.jsx)(m.a,Object(d.a)(Object(d.a)({className:"button-tooltip"},e),{},{children:Object(O.jsxs)("ul",{children:[Object(O.jsxs)("li",{children:["From :",c.From]}),Object(O.jsxs)("li",{children:["Owner :",c.Owner]}),Object(O.jsxs)("li",{children:["By :",c.By]}),Object(O.jsxs)("li",{children:["At :",c.AtTime]}),Object(O.jsxs)("li",{children:["In : ",a]}),Object(O.jsxs)("li",{children:["Out: ",o]})]})}))},placement:"bottom",children:Object(O.jsx)("div",{className:"bg-black border border-light",id:n,style:{color:"white",visibility:j?"hidden":"",text_align:"x"!==n?"justify":"center",width:"calc(100%/6 *"+String(s/200)+")",height:"4rem"},ref:r?x:{},children:"x"!==n?t+" "+n:"X"})})};var L=function(e){var t=e.items,n=Object(j.a)((function(){return{accept:"image",drop:function(e){return a(e.Name)},collect:function(e){return{isOut:!!e.isOver()}}}})),i=Object(l.a)(n,2),r=i[0].isOut,c=i[1],a=function(e){""!==e&&window.go.main.ShipStruct.PlaceShip(Number(-1),String(e)).then((function(e){}))};return Object(O.jsx)("div",{className:"wait",style:{border:r?"0.5rem solid rgba(0, 0, 0, 0.05)":"0.5rem solid green",flexDirection:"row",flexWrap:"wrap",display:"flex",flex:"2",height:"15rem",overflowX:"scroll"},ref:c,children:t.map((function(e){return e.Placed<0?Object(O.jsx)(F,{draggable:!0,Iden:e.Iden,name:e.Name,wait:!0,detail:e.Detail,inTime:e.InTime,outTime:e.OutTime,len:e.Length}):Object(O.jsx)(O.Fragment,{})}))})};function B(e){var t=e.list,n=Object(i.useState)(1),r=Object(l.a)(n,2),c=r[0],a=r[1];return Object(O.jsx)("div",{className:"border border-primary rounded ",style:{height:"900px",overflowX:"scroll"},children:Object(O.jsx)("div",{onWheelCapture:function(e){if(e.shiftKey){var t=-.001*e.deltaY;a(t+c)}},style:{width:"100%",height:"100%",flex:"1",transformOrigin:"0 0",transform:"scale(".concat(c,")"),overflowY:"scroll"},children:Object(f.a)(t).reverse().map((function(e){return e.length<1?Object(O.jsx)("div",{}):Object(O.jsx)("div",{children:Object(O.jsx)("div",{style:{paddingLeft:"0.25rem",paddingTop:"0.5rem",paddingBottom:"2rem",fontSize:"0.9rem"},children:String(e)})})}))})})}var T=function(e){var t=e.items,n=e.id,i=(e.scale,e.doc),r=Object(j.a)((function(){return{accept:"image",drop:function(e){return o(e.Name)},collect:function(e){return{isOver:!!e.isOver()}}}})),c=Object(l.a)(r,2),a=(c[0].isOver,c[1]),o=function(e){""!==e&&window.go.main.ShipStruct.PlaceShip(Number(i.No),String(e)).then((function(){}))};return Object(O.jsx)("div",{className:"Drop row border border-danger border-3",style:{width:"11rem",height:"5rem",color:"blue",visibility:"visible",alignSelf:"flex-start",background:"rgba(255, 255, 255, 0.0 )"},ref:a,children:i.ShipList.map((function(e,r){return t.map((function(t,c){return r===n&&t.Name===e&&t.Placed===i.No?(console.log(t),Object(O.jsx)(F,{draggable:!0,Iden:t.Iden,name:t.Name,detail:t.Detail,inTime:t.InTime,outTime:t.OutTime,wait:!1,len:t.Length})):Object(O.jsx)(O.Fragment,{})}))}))})};var R=function(e){var t=e.dat,n=(e.box,e.img),r=e.pos,c=Object(i.useState)({width:1,height:40,scale:1}),a=Object(l.a)(c,2),o=a[0],s=a[1];return Object(O.jsx)("div",{style:{height:"100%",backgroundImage:null!==n?"url(".concat(URL.createObjectURL(n),")"):"url('http://localhost:4040/img')",backgroundPosition:"".concat(r.x,"px ").concat(r.y,"px"),backgroundSize:"auto 100%",backgroundRepeat:"no-repeat",width:"100%"},children:Object(O.jsx)("div",{className:"border border-success border-3 container-fluid",onWheelCapture:function(e){if(e.shiftKey){var t=-.001*e.deltaY+o.scale;s({width:o.width,height:o.height,scale:t})}},style:{height:"100%",width:"100%",overflowX:"scroll",overflowY:"scroll"},children:Object(O.jsx)("div",{className:"row",children:t.Docks.map((function(e,n){return Object(O.jsxs)("div",{className:"col-2",children:[Object(O.jsx)("div",{className:"row",children:e.No}),Object(f.a)(Array(8).keys()).map((function(n,i){return Object(O.jsx)(T,{items:t.Ships,scale:o.scale,doc:e,id:7-i})}))]})}))})})})};var P=function(){var e=Object(i.useState)({Docks:[{No:Number,Name:String,Length:Number,BoarderRight:Number,ShipList:[]}],Ships:[],Log:[]}),t=Object(l.a)(e,2),n=t[0],r=t[1],c=Object(i.useState)({x:8,y:1}),a=Object(l.a)(c,2),o=a[0],s=(a[1],Object(i.useState)(null)),d=Object(l.a)(s,2),u=d[0],j=(d[1],Object(i.useState)({x:0,y:0,path:"http://localhost:4040/img",cur_name:""})),h=Object(l.a)(j,2),m=h[0];return h[1],b("Ship",(function(e){console.log("here"),console.log(e),r(e)})),Object(i.useEffect)((function(){window.go.main.ShipStruct.Initial().then((function(e){console.log("nii"),console.log(e),r(e)}))}),[]),Object(O.jsx)("div",{className:"container-fluid ",children:Object(O.jsxs)("div",{className:"row",children:[Object(O.jsx)("div",{className:"col-10",children:Object(O.jsx)("div",{className:"row",style:{alignSelf:"flex-start",width:"100%",height:"100%"},children:Object(O.jsxs)("div",{className:"col-md",children:[Object(O.jsx)("div",{className:"List row border border-primary rounded",children:Object(O.jsx)(L,{items:n.Ships})}),Object(O.jsx)("div",{children:"------------------------------------------------------------------------------------------------------------------------------------"}),Object(O.jsx)("div",{children:"------------------------------------------------------------------------------------------------------------------------------------"}),Object(O.jsx)("div",{style:{height:"100%",width:"100%"},children:Object(O.jsx)(R,{dat:n,box:o,img:u,pos:m})})]})})}),Object(O.jsx)("div",{className:"col-2 h-100",children:Object(O.jsx)(B,{list:n.Log})})]})})};var Y=function(){return Object(O.jsx)("div",{className:"bg-light",style:{},children:Object(O.jsx)(o.a,{backend:s.a,children:Object(O.jsx)(P,{})})})};var A=function(){var e=Object(i.useState)([]),t=Object(l.a)(e,2);return t[0],t[1],Object(O.jsx)("div",{children:Object(O.jsxs)(I.c,{children:[Object(O.jsx)(I.a,{path:"/",element:Object(O.jsx)(C,{})}),Object(O.jsx)(I.a,{path:"/ship",element:Object(O.jsx)(Y,{})}),Object(O.jsx)(I.a,{path:"/cargo",element:Object(O.jsx)(k,{})})]})})},W=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,115)).then((function(t){var n=t.getCLS,i=t.getFID,r=t.getFCP,c=t.getLCP,a=t.getTTFB;n(e),i(e),r(e),c(e),a(e)}))};n(77),n(78);a.a.render(Object(O.jsx)(r.a.StrictMode,{children:Object(O.jsx)(D.a,{children:Object(O.jsx)(A,{})})}),document.getElementById("root")),W()},69:function(e,t,n){},70:function(e,t,n){}},[[100,1,2]]]);
//# sourceMappingURL=main.cf110537.chunk.js.map