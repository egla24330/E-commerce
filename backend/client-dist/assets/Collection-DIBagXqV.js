import{r as c,S as C,j as e}from"./index-D1vbKmrh.js";import{P as k}from"./Productitem-CeeUg2dq.js";import{S}from"./Searchbox-Btr60MWY.js";import{c as a}from"./createLucideIcon-CPP6_3Aj.js";import{C as _}from"./chevron-down-Bz4tZots.js";import"./proxy-BAIVwPzE.js";import"./shopping-bag-BKISK9ju.js";import"./x-CODl1PEt.js";/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],L=a("chevron-right",F);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]],M=a("circle-x",E);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H=[["path",{d:"M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",key:"sc7q7i"}]],T=a("funnel",H);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $=[["path",{d:"M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z",key:"1wgbhj"}]],z=a("shirt",$);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P=[["path",{d:"m15 5 6.3 6.3a2.4 2.4 0 0 1 0 3.4L17 19",key:"1cbfv1"}],["path",{d:"M9.586 5.586A2 2 0 0 0 8.172 5H3a1 1 0 0 0-1 1v5.172a2 2 0 0 0 .586 1.414L8.29 18.29a2.426 2.426 0 0 0 3.42 0l3.58-3.58a2.426 2.426 0 0 0 0-3.42z",key:"135mg7"}],["circle",{cx:"6.5",cy:"9.5",r:".5",fill:"currentColor",key:"5pm5xn"}]],R=a("tags",P);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]],I=a("trash-2",A),O=["Men","women","Kids","Couples"],q=["Topwear","Bottomwear","Outfit"],Q=()=>{const{products:d,searchBarStatus:h,search:i}=c.useContext(C),[m,x]=c.useState(!1),[o,p]=c.useState([]),[l,f]=c.useState([]),[g,y]=c.useState([]),j=(s,t,r)=>{r.includes(s)?t(r.filter(n=>n!==s)):t([...r,s])},b=()=>{let s=[...d];i&&h&&(s=s.filter(t=>t.name.toLowerCase().includes(i.toLowerCase()))),o.length&&(s=s.filter(t=>o.includes(t.category))),l.length&&(s=s.filter(t=>l.includes(t.subCategory))),y(s)},N=s=>{const t=s.target.value;let r=[...g];if(t==="low-high")r.sort((n,u)=>n.price-u.price);else if(t==="high-low")r.sort((n,u)=>u.price-n.price);else{b();return}y(r)};c.useEffect(()=>{b()},[d,o,l,i]);const w=()=>{p([]),f([])};return e.jsxs("div",{children:[h&&e.jsx(S,{}),e.jsxs("div",{className:"flex flex-col sm:flex-row gap-6 pt-10 border-t",children:[e.jsxs("div",{className:"min-w-60",children:[e.jsxs("p",{className:"my-2 text-xl font-semibold flex items-center cursor-pointer gap-2 select-none text-gray-800",onClick:()=>x(s=>!s),children:[e.jsx(T,{className:"w-5 h-5 text-gray-600"})," FILTERS",m?e.jsx(_,{className:"h-4 sm:hidden"}):e.jsx(L,{className:"h-4 sm:hidden"})]}),e.jsxs("div",{className:`${m?"":"hidden"} sm:block`,children:[e.jsx(v,{label:"CATEGORIES",options:O,selected:o,toggleFn:s=>j(s,p,o),icon:e.jsx(R,{className:"w-4 h-4 text-gray-500"})}),e.jsx(v,{label:"TYPE",options:q,selected:l,toggleFn:s=>j(s,f,l),icon:e.jsx(z,{className:"w-4 h-4 text-gray-500"})}),(o.length>0||l.length>0)&&e.jsxs("button",{onClick:w,className:"mt-4 text-sm text-red-500 hover:underline flex items-center gap-1",children:[e.jsx(I,{className:"w-4 h-4"})," Clear All Filters"]})]})]}),e.jsxs("div",{className:"flex-1",children:[e.jsx("div",{className:"flex items-center justify-end mb-4",children:e.jsxs("select",{className:"border border-gray-300 text-sm h-10 px-3 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200",onChange:N,children:[e.jsx("option",{value:"relavent",children:"Sort by: Relevant"}),e.jsx("option",{value:"low-high",children:"Sort by: Low to High"}),e.jsx("option",{value:"high-low",children:"Sort by: High to Low"})]})}),e.jsx("div",{className:"grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5",children:g.length?g.map((s,t)=>e.jsx(k,{id:s._id,image:s.image,name:s.name,price:s.price},t)):e.jsxs("div",{className:"col-span-full text-center text-gray-500 mt-10",children:[e.jsx(M,{className:"mx-auto mb-2 w-8 h-8 text-red-400"}),"No products found."]})})]})]})]})},v=({label:d,options:h,selected:i,toggleFn:m,icon:x})=>e.jsxs("div",{className:"mb-3 text-sm font-medium border border-gray-200 shadow-sm pl-5 py-3 mt-5 rounded-xl bg-white",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-2 text-gray-700",children:[x," ",e.jsx("p",{children:d})]}),e.jsx("div",{className:"flex flex-col gap-2 text-sm font-light text-gray-600",children:h.map(o=>e.jsxs("label",{className:"flex gap-2 items-center cursor-pointer",children:[e.jsx("input",{className:"w-4 h-4 text-blue-600 rounded focus:ring-blue-500",type:"checkbox",value:o,checked:i.includes(o),onChange:()=>m(o)}),o]},o))})]});export{Q as default};
