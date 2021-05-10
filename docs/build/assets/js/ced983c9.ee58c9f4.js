(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[7],{3905:function(e,t,n){"use strict";n.d(t,{Zo:function(){return p},kt:function(){return d}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var o=r.createContext({}),s=function(e){var t=r.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=s(e.components);return r.createElement(o.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},y=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,l=e.originalType,o=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),y=s(n),d=a,f=y["".concat(o,".").concat(d)]||y[d]||u[d]||l;return n?r.createElement(f,i(i({ref:t},p),{},{components:n})):r.createElement(f,i({ref:t},p))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=n.length,i=new Array(l);i[0]=y;var c={};for(var o in t)hasOwnProperty.call(t,o)&&(c[o]=t[o]);c.originalType=e,c.mdxType="string"==typeof e?e:a,i[1]=c;for(var s=2;s<l;s++)i[s]=n[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}y.displayName="MDXCreateElement"},6820:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return i},metadata:function(){return c},toc:function(){return o},default:function(){return p}});var r=n(2122),a=n(9756),l=(n(7294),n(3905)),i={},c={unversionedId:"api-reference/selectors",id:"api-reference/selectors",isDocsHomePage:!1,title:"Selectors",description:"@ById",source:"@site/docs/api-reference/selectors.md",sourceDirName:"api-reference",slug:"/api-reference/selectors",permalink:"/api-reference/selectors",editUrl:"https://github.com/anton-kravchenko/cypress-selectors/edit/master/docs/docs/api-reference/selectors.md",version:"current",frontMatter:{},sidebar:"docs",previous:{title:"Installation",permalink:"/getting-started/installation"},next:{title:"Types",permalink:"/api-reference/types"}},o=[{value:"@ById",id:"byid",children:[]},{value:"@ByType",id:"bytype",children:[]},{value:"@ByClass",id:"byclass",children:[]},{value:"@ByAttribute",id:"byattribute",children:[]},{value:"@BySelector",id:"byselector",children:[]},{value:"@ByXPath",id:"byxpath",children:[]}],s={toc:o};function p(e){var t=e.components,n=(0,a.Z)(e,["components"]);return(0,l.kt)("wrapper",(0,r.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h3",{id:"byid"},"@ById"),(0,l.kt)("p",null,"Selects an element by ",(0,l.kt)("inlineCode",{parentName:"p"},"id")," attribute:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-typescript"},"class Selectors {\n  @ById('main')\n  static main: Selector; // equivalent of - cy.get('#main')\n}\n")),(0,l.kt)("h3",{id:"bytype"},"@ByType"),(0,l.kt)("p",null,"Selects an elements by its type, e.g. ",(0,l.kt)("inlineCode",{parentName:"p"},"button"),", ",(0,l.kt)("inlineCode",{parentName:"p"},"div"),", ",(0,l.kt)("inlineCode",{parentName:"p"},"input")," e.t.c:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-typescript"},"class Selectors {\n  @ByType('input')\n  static input: Selector; // equivalent of - cy.get('input')\n}\n")),(0,l.kt)("h3",{id:"byclass"},"@ByClass"),(0,l.kt)("p",null,"Selects an element by its class:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-typescript"},"class Selectors {\n  @ByClass('button')\n  static button: Selector; // equivalent of - cy.get('.button')\n}\n")),(0,l.kt)("h3",{id:"byattribute"},"@ByAttribute"),(0,l.kt)("p",null,"Selects an element by attribute.:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-typescript"},"class Selectors {\n  @ByAttribute('header')\n  static header: Selector; // equivalent of - cy.get('[cypress-id=header')\n\n  @ByAttribute('listing', { attribute: 'custom-id' })\n  static listing: Selector; // equivalent of - cy.get('[custom-id=listing')\n}\n")),(0,l.kt)("p",null,"By default, ",(0,l.kt)("inlineCode",{parentName:"p"},"ByAttribute")," queries elements with ",(0,l.kt)("inlineCode",{parentName:"p"},"cypress-id")," attribute (",(0,l.kt)("inlineCode",{parentName:"p"},"Selectors.header")," selector), but the attribute can be specified explicitly as for ",(0,l.kt)("inlineCode",{parentName:"p"},"Selectors.listing")," selector"),(0,l.kt)("h3",{id:"byselector"},"@BySelector"),(0,l.kt)("p",null,"Selects an element by a CSS selector:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-typescript"},"class Selectors {\n  @BySelector('ul > li .focus')\n  static listItem: Selector; // equivalent of - cy.get('ul > li .focus')\n}\n")),(0,l.kt)("h3",{id:"byxpath"},"@ByXPath"),(0,l.kt)("p",null,"Selects an element by XPath selector:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-typescript"},"class Selectors {\n  @ByXPath(`//input`) // equivalent of - cy.xpath('//input')\n}\n")))}p.isMDXComponent=!0}}]);