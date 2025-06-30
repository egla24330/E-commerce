import{r as o,S as n,j as e}from"./index-DDIn7SRn.js";import{c}from"./createLucideIcon-BhGo9CUR.js";import{S as i}from"./shopping-bag-Bcm9GOsp.js";import{X as l}from"./x-C5dJHmDC.js";/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]],x=c("search",m),y=()=>{const{searchBarStatus:t,setSearchBarStatus:r,setSearch:a}=o.useContext(n);return e.jsxs("div",{className:`
        fixed top-0 left-0 w-full z-50 
        transition-all duration-500 ease-in-out
        ${t?"opacity-100 translate-y-0":"opacity-0 -translate-y-10 pointer-events-none"}
        h-[100px] flex justify-center items-center px-4 shadow-sm
         bg-white/20 backdrop-blur-md  
      `,children:[e.jsxs("div",{className:"flex justify-between items-center bg-white w-full sm:w-[50%] max-w-2xl border border-gray-200 rounded-3xl px-4 py-2 shadow-md",children:[e.jsx(x,{className:"w-5 h-5 text-gray-500 mr-2"}),e.jsx("input",{type:"text",className:"outline-none w-full bg-transparent text-gray-700 placeholder-gray-400",placeholder:"Search for products...",onChange:s=>a(s.target.value)}),e.jsx(i,{className:"w-5 h-5 text-gray-500 ml-2 hidden sm:block"})]}),e.jsx(l,{onClick:()=>r(!1),className:"w-5 h-5 ml-4 text-gray-600 cursor-pointer transition-transform duration-300 hover:rotate-90"})]})};export{y as S};
