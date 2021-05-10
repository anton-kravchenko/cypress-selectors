(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[439],{3905:function(e,t,r){"use strict";r.d(t,{Zo:function(){return p},kt:function(){return y}});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function c(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?c(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},c=Object.keys(e);for(n=0;n<c.length;n++)r=c[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(n=0;n<c.length;n++)r=c[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var l=n.createContext({}),s=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},p=function(e){var t=s(e.components);return n.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,c=e.originalType,l=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),f=s(r),y=o,m=f["".concat(l,".").concat(y)]||f[y]||u[y]||c;return r?n.createElement(m,a(a({ref:t},p),{},{components:r})):n.createElement(m,a({ref:t},p))}));function y(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var c=r.length,a=new Array(c);a[0]=f;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i.mdxType="string"==typeof e?e:o,a[1]=i;for(var s=2;s<c;s++)a[s]=r[s];return n.createElement.apply(null,a)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},2106:function(e,t,r){"use strict";r.r(t),r.d(t,{frontMatter:function(){return a},metadata:function(){return i},toc:function(){return l},default:function(){return p}});var n=r(2122),o=r(9756),c=(r(7294),r(3905)),a={},i={unversionedId:"api-reference/by",id:"api-reference/by",isDocsHomePage:!1,title:"`By` namespace",description:"All of the selectors are accessible via By namespace like the following:",source:"@site/docs/api-reference/by.md",sourceDirName:"api-reference",slug:"/api-reference/by",permalink:"/cypress-selectors/api-reference/by",editUrl:"https://github.com/anton-kravchenko/cypress-selectors/edit/master/docs/docs/api-reference/by.md",version:"current",frontMatter:{},sidebar:"docs",previous:{title:"Global configuration",permalink:"/cypress-selectors/api-reference/global-configuration"},next:{title:"Recipes",permalink:"/cypress-selectors/recipes"}},l=[],s={toc:l};function p(e){var t=e.components,r=(0,o.Z)(e,["components"]);return(0,c.kt)("wrapper",(0,n.Z)({},s,r,{components:t,mdxType:"MDXLayout"}),(0,c.kt)("p",null,"All of the selectors are accessible via ",(0,c.kt)("inlineCode",{parentName:"p"},"By")," namespace like the following:"),(0,c.kt)("pre",null,(0,c.kt)("code",{parentName:"pre",className:"language-typescript"},"import { By } from 'cypress-selectors';\nimport type { Selector } from 'cypress-selectors';\n\nclass HomePageSelectors {\n  @By.Id('main')\n  static main: Selector; // equivalent of - cy.get('#main')\n\n  @By.Type('input')\n  static input: Selector; // equivalent of - cy.get('input')\n\n  @By.Class('button')\n  static button: Selector; // equivalent of - cy.get('.button')\n\n  @By.Attribute('header')\n  static header: Selector; // equivalent of - cy.get('[cypress-id=header')\n\n  @By.Selector('ul > li .focus')\n  static listItem: Selector; // equivalent of - cy.get('ul > li .focus')\n\n  @By.XPath(`//input`)\n  static input: Selector; // equivalent of - cy.xpath('//input')\n}\n")))}p.isMDXComponent=!0}}]);