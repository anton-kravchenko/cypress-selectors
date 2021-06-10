(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[85],{3905:function(e,t,r){"use strict";r.d(t,{Zo:function(){return p},kt:function(){return f}});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},s=Object.keys(e);for(n=0;n<s.length;n++)r=s[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(n=0;n<s.length;n++)r=s[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var o=n.createContext({}),i=function(e){var t=n.useContext(o),r=t;return e&&(r="function"==typeof e?e(t):c(c({},t),e)),r},p=function(e){var t=i(e.components);return n.createElement(o.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},y=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,s=e.originalType,o=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),y=i(r),f=a,m=y["".concat(o,".").concat(f)]||y[f]||u[f]||s;return r?n.createElement(m,c(c({ref:t},p),{},{components:r})):n.createElement(m,c({ref:t},p))}));function f(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var s=r.length,c=new Array(s);c[0]=y;var l={};for(var o in t)hasOwnProperty.call(t,o)&&(l[o]=t[o]);l.originalType=e,l.mdxType="string"==typeof e?e:a,c[1]=l;for(var i=2;i<s;i++)c[i]=r[i];return n.createElement.apply(null,c)}return n.createElement.apply(null,r)}y.displayName="MDXCreateElement"},9628:function(e,t,r){"use strict";r.r(t),r.d(t,{frontMatter:function(){return c},metadata:function(){return l},toc:function(){return o},default:function(){return p}});var n=r(2122),a=r(9756),s=(r(7294),r(3905)),c={},l={unversionedId:"xpath_vs_css",id:"xpath_vs_css",isDocsHomePage:!1,title:"XPath vs CSS",description:"The library supports two selector engines",source:"@site/docs/xpath_vs_css.md",sourceDirName:".",slug:"/xpath_vs_css",permalink:"/cypress-selectors/xpath_vs_css",editUrl:"https://github.com/anton-kravchenko/cypress-selectors/edit/main/docs/docs/xpath_vs_css.md",version:"current",frontMatter:{},sidebar:"docs",previous:{title:"Recipes",permalink:"/cypress-selectors/recipes"},next:{title:"Caveats",permalink:"/cypress-selectors/caveats"}},o=[{value:"XPath",id:"xpath",children:[]},{value:"CSS",id:"css",children:[]}],i={toc:o};function p(e){var t=e.components,r=(0,a.Z)(e,["components"]);return(0,s.kt)("wrapper",(0,n.Z)({},i,r,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("p",null,"The library supports two selector engines: ",(0,s.kt)("inlineCode",{parentName:"p"},"XPath")," and ",(0,s.kt)("inlineCode",{parentName:"p"},"CSS"),". Below is the list of selectors powered by these engines:"),(0,s.kt)("h3",{id:"xpath"},"XPath"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("a",{parentName:"li",href:"/cypress-selectors/api-reference/selectors#byxpath"},"@ByXPath")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("a",{parentName:"li",href:"/cypress-selectors/api-reference/selectors#byname"},"@ByName")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("a",{parentName:"li",href:"/cypress-selectors/api-reference/selectors#byexacttext"},"@ByExactText")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("a",{parentName:"li",href:"/cypress-selectors/api-reference/selectors#bypartialtext"},"@ByPartialText")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("a",{parentName:"li",href:"/cypress-selectors/api-reference/selectors#byexactlinktext"},"@ByExactLinkText")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("a",{parentName:"li",href:"/cypress-selectors/api-reference/selectors#bypartiallinktext"},"@ByPartialLinkText"))),(0,s.kt)("h3",{id:"css"},"CSS"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("a",{parentName:"li",href:"/cypress-selectors/api-reference/selectors#byselector"},"@BySelector")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("a",{parentName:"li",href:"/cypress-selectors/api-reference/selectors#byid"},"@ById")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("a",{parentName:"li",href:"/cypress-selectors/api-reference/selectors#bytype"},"@ByType")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("a",{parentName:"li",href:"/cypress-selectors/api-reference/selectors#byclass"},"@ByClass")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("a",{parentName:"li",href:"/cypress-selectors/api-reference/selectors#byattribute"},"@ByAttribute"))),(0,s.kt)("p",null,"You can query elements using ",(0,s.kt)("inlineCode",{parentName:"p"},"CSS")," selectors via ",(0,s.kt)("a",{parentName:"p",href:"/cypress-selectors/api-reference/selectors#byselector"},"@BySelector")," and XPath selectors via ",(0,s.kt)("a",{parentName:"p",href:"/cypress-selectors/api-reference/selectors#byxpath"},"@ByXPath"),"."))}p.isMDXComponent=!0}}]);