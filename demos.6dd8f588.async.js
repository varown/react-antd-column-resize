"use strict";(self.webpackChunkreact_antd_column_resize=self.webpackChunkreact_antd_column_resize||[]).push([[433],{70511:function(T,o,e){e.r(o);var f=e(71577),y=e(96074),E=e(46540),c=e(67294),_=e(41625),n=e(85893),r=function(){var m=[{title:"Name",dataIndex:"name",key:"name",width:200,align:"center"},{title:"Age",dataIndex:"age",key:"age",width:100},{title:"Address",dataIndex:"address",key:"address",width:300},{title:"phone",dataIndex:"phone",key:"phone"}],t=[{key:"1",name:"John Doe",age:32,address:"123 Street, City",phone:"1588553336"},{key:"2",name:"Jane Smith",age:28,address:"456 Road, Town",phone:"1588553336"}],d=(0,_.U)({columns:m}),x=d.resizableColumns,W=d.components,Z=d.tableWidth,v=d.resetColumns;return(0,n.jsxs)("div",{className:"app",children:[(0,n.jsx)(f.ZP,{onClick:v,children:"\u91CD\u7F6EColumns"}),(0,n.jsx)(y.Z,{}),(0,n.jsx)(E.Z,{columns:x,dataSource:t,components:W,bordered:!0,scroll:{x:Z||!1}})]})};o.default=r},90516:function(T,o,e){e.r(o);for(var f=e(46540),y=e(67294),E=e(41625),c=e(85893),_=[{title:"NameNameNameName",dataIndex:"name",key:"name",width:100,fixed:"left",filters:[{text:"Joe",value:"Joe"},{text:"John",value:"John"}],onFilter:function(t,d){return d.name.indexOf(t)===0}},{title:"Company",children:[{title:"Company Address",dataIndex:"companyAddress",key:"companyAddress",width:200,align:"center"},{title:"Company Name",dataIndex:"companyName",key:"companyName",align:"center",ellipsis:!0}]},{title:"Other",children:[{title:"Age",dataIndex:"age",key:"age",width:150,sorter:function(t,d){return t.age-d.age}},{title:"Address",children:[{title:"Street",dataIndex:"street",key:"street",width:150},{title:"Block",children:[{title:"Building",dataIndex:"building",key:"building",width:100},{title:"Door No.",dataIndex:"number",key:"number",width:100}]}]}]},{title:"Gender",dataIndex:"gender",key:"gender",width:120,fixed:"right"}],n=[],r=0;r<100;r++)n.push({key:r,name:"John Brown",age:r+1,street:"Lake Park",building:"C",number:2035,companyAddress:"Lake Street 42",companyName:"SoftLake Co",gender:"M"});var C=function(){var t=(0,E.U)({columns:_}),d=t.resizableColumns,x=t.components,W=t.tableWidth;return(0,c.jsx)(c.Fragment,{children:(0,c.jsx)(f.Z,{columns:d,components:x,dataSource:n,bordered:!0,scroll:{x:W}})})};o.default=C},87874:function(T,o,e){e.r(o);var f=e(93350),y=e(67294),E=e(41625),c=e(85893),_=function(){var r=[{title:"Name",dataIndex:"name",key:"name",width:200,align:"center"},{title:"Age",dataIndex:"age",key:"age",width:100},{title:"Address",dataIndex:"address",key:"address",width:300},{title:"phone",dataIndex:"phone",key:"phone",fixed:"right"}],C=[{key:"1",name:"John Doe",age:32,address:"123 Street, City",phone:"1588553336"},{key:"2",name:"Jane Smith",age:28,address:"456 Road, Town",phone:"1588553336"}],m=(0,E.U)({columns:r}),t=m.resizableColumns,d=m.components,x=m.tableWidth;return(0,c.jsx)("div",{className:"app",children:(0,c.jsx)(f.Z,{columns:t,dataSource:C,components:d,bordered:!0,scroll:{x:x||!1}})})};o.default=_},37206:function(T,o,e){e.r(o);for(var f=e(93350),y=e(67294),E=e(41625),c=e(85893),_=[{title:"NameNameNameName",dataIndex:"name",key:"name",width:100,fixed:"left",filters:[{text:"Joe",value:"Joe"},{text:"John",value:"John"}],onFilter:function(t,d){return d.name.indexOf(t)===0}},{title:"Company",children:[{title:"Company Address",dataIndex:"companyAddress",key:"companyAddress",width:200,align:"center"},{title:"Company Name",dataIndex:"companyName",key:"companyName",align:"center",ellipsis:!0}]},{title:"Other",children:[{title:"Age",dataIndex:"age",key:"age",width:150,sorter:function(t,d){return t.age-d.age}},{title:"Address",children:[{title:"Street",dataIndex:"street",key:"street",width:150},{title:"Block",children:[{title:"Building",dataIndex:"building",key:"building",width:100},{title:"Door No.",dataIndex:"number",key:"number",width:100}]}]}]},{title:"Gender",dataIndex:"gender",key:"gender",width:120,fixed:"right"}],n=[],r=0;r<100;r++)n.push({key:r,name:"John Brown",age:r+1,street:"Lake Park",building:"C",number:2035,companyAddress:"Lake Street 42",companyName:"SoftLake Co",gender:"M"});var C=function(){var t=(0,E.U)({columns:_}),d=t.resizableColumns,x=t.components,W=t.tableWidth;return(0,c.jsx)(c.Fragment,{children:(0,c.jsx)(f.Z,{columns:d,dataSource:n,components:x,bordered:!0,scroll:{x:W||!1}})})};o.default=C},53968:function(T,o,e){e.r(o);var f=e(42122),y=e.n(f),E=e(27424),c=e.n(E),_=e(20057),n=e(96074),r=e(46540),C=e(67294),m=e(41625),t=e(85893),d=[{title:"Name",dataIndex:"name",width:150,render:function(g){return(0,t.jsx)("a",{children:g})}},{title:"Age",dataIndex:"age",width:150},{title:"Address",dataIndex:"address"}],x=[{key:"1",name:"John Brown",age:32,address:"New York No. 1 Lake Park"},{key:"2",name:"Jim Green",age:42,address:"London No. 1 Lake Park"},{key:"3",name:"Joe Black",age:32,address:"Sydney No. 1 Lake Park"},{key:"4",name:"Disabled User",age:99,address:"Sydney No. 1 Lake Park"}],W={onChange:function(g,N){console.log("selectedRowKeys: ".concat(g),"selectedRows: ",N)},getCheckboxProps:function(g){return{disabled:g.name==="Disabled User",name:g.name}}},Z=function(){var g=(0,C.useState)("checkbox"),N=c()(g,2),H=N[0],q=N[1],U=(0,m.U)({columns:d}),ee=U.resizableColumns,te=U.components,P=U.tableWidth;return(0,t.jsxs)("div",{children:[(0,t.jsxs)(_.ZP.Group,{onChange:function(A){var j=A.target.value;q(j)},value:H,children:[(0,t.jsx)(_.ZP,{value:"checkbox",children:"Checkbox"}),(0,t.jsx)(_.ZP,{value:"radio",children:"radio"})]}),(0,t.jsx)(n.Z,{}),(0,t.jsx)(r.Z,{rowSelection:y()({type:H},W),columns:ee,components:te,scroll:{x:P},dataSource:x})]})};o.default=Z},41625:function(T,o,e){e.d(o,{U:function(){return ee}});var f=e(27424),y=e.n(f),E=e(18698),c=e.n(E),_=e(42122),n=e.n(_),r=e(67294),C="dataIndex",m=e(60869),t=m.Z,d=e(70215),x=e.n(d),W=e(1706),Z=e(65570),v=e(85893),g=["width","minWidth","maxWidth","defaultWidth","cellKey","onResize","children","onClick","rowSpan","style","colSpan","title","scope","className"],N=function(P){var i=P,A=i.width,j=i.minWidth,F=i.maxWidth,G=i.defaultWidth,Y=i.cellKey,M=i.onResize,B=i.children,K=i.onClick,w=i.rowSpan,R=i.style,k=i.colSpan,ne=i.title,ae=i.scope,$=i.className,Q=x()(i,g),V=t(A),L=y()(V,2),D=L[0],J=L[1],re=(0,r.useState)(!1),X=y()(re,2),a=X[0],l=X[1];if((0,r.useEffect)(function(){J(A)},[A]),!D||Number.isNaN(Number(A)))return R==null||delete R.width,(0,v.jsx)("th",n()(n()({},Q),{},{onClick:K,rowSpan:w,colSpan:k,className:$,style:n()(n()({},R),{},{minWidth:G}),children:(0,v.jsx)("span",{title:ne,children:B})}));var u=function(z){try{var h,p,b=(h=document.body)===null||h===void 0?void 0:h.style,ie=(p=document.documentElement)===null||p===void 0?void 0:p.style;b&&ie&&(b.userSelect=z?"none":"",b.pointerEvents=z?"none":"",ie.cursor=z?"col-resize":"")}catch(le){console.error("An error occurred while toggling column resize styles:",le)}},s=function(z,h){var p,b=h==null||(p=h.size)===null||p===void 0?void 0:p.width;u(!0),l(!0),J(b)},I=function(z,h){var p,b=h==null||(p=h.size)===null||p===void 0?void 0:p.width;J(b)},O=function(){u(!1),l(!1),D!==A&&(M==null||M(Y,D))},de=function(z){z.stopPropagation()};return(0,v.jsxs)("th",{scope:ae,colSpan:k,rowSpan:w,onClick:K,className:"resizable-container ".concat($),style:n()(n()({},R),{},{overflow:"unset"}),children:[(0,v.jsx)(W.Resizable,{width:D,height:0,className:"resizable-box",minConstraints:[j,50],maxConstraints:[F,50],handle:(0,v.jsx)("div",{className:"resizable-handler",onClick:de,children:(0,v.jsx)("div",{className:"resizable-line"})}),draggableOpts:{enableUserSelectHack:!1},onResize:I,onResizeStart:s,onResizeStop:O,children:(0,v.jsx)("div",{style:{width:a?D:"100%",height:"100%"}})}),(0,v.jsx)("div",n()(n()({},Q),{},{className:"resizable-title",children:B}))]})},H=(0,r.memo)(N),q=function(P){var i=P.columns,A=P.minWidth,j=A===void 0?120:A,F=P.maxWidth,G=F===void 0?2e3:F,Y=P.defaultWidth,M=Y===void 0?120:Y,B=(0,r.useCallback)(function(a){if(!Array.isArray(a))return 0;var l=function(s){var I,O=s==null?void 0:s.children,de=!Array.isArray(O),S=Array.isArray(O)?B(O):0,z=(I=s==null?void 0:s.width)!==null&&I!==void 0?I:Number(M),h=de?z:0;return isNaN(Number(h))?(console.error("Invalid column width: ".concat(h)),S):S+Number(h)};return a==null?void 0:a.reduce(function(u,s){return u+l(s)},0)},[M]),K=(0,r.useCallback)(function(a,l){D(function(u){return u==null?void 0:u.map(function(s){return w(s,a,l)})})},[]);function w(a,l,u){var s=a[C]||a.key;s!==l&&Array.isArray(a.children)&&(a.children=a.children.map(function(O){return w(O,l,u)}));var I=s!==l?a==null?void 0:a.width:u;return I===a.width?a:n()(n()(n()({},a),s===l&&{width:u}),{},{onHeaderCell:function(){return{minWidth:j,maxWidth:G,defaultWidth:M,width:I,cellKey:a[C]||a.key,onResize:K}}})}function R(a){return a==null?void 0:a.map(function(l){if(c()(l)!=="object")return l;var u=l.children;return Array.isArray(u)&&(l.children=R(u)),n()(n()({},l),{},{onHeaderCell:function(){return n()(n()({minWidth:j,maxWidth:G,defaultWidth:M},"width"in l&&{width:l.width}),{},{cellKey:l[C]||l.key,onResize:K})}})})}var k=(0,r.useMemo)(function(){return R(i)},[i]),ne=t(k,{}),ae=y()(ne,1),$=ae[0],Q=(0,r.useState)($),V=y()(Q,2),L=V[0],D=V[1],J=(0,r.useMemo)(function(){return B(L)},[L]),re=(0,r.useCallback)(function(){D(k)},[k]),X=(0,r.useMemo)(function(){return{header:{cell:H}}},[]);return i.every(function(a){return"width"in a})?(console.warn("All columns have a width property, so the column will not be resizable"),{resizableColumns:i,components:{},tableWidth:!1,resetColumns:function(){}}):{resizableColumns:L,components:X,tableWidth:J,resetColumns:re}},U=q,ee=U}}]);
