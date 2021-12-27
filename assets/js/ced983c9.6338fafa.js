(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[7],{3905:function(e,t,n){"use strict";n.d(t,{Zo:function(){return p},kt:function(){return y}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),o=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},p=function(e){var t=o(e.components);return a.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),d=o(n),y=r,m=d["".concat(s,".").concat(y)]||d[y]||u[y]||i;return n?a.createElement(m,l(l({ref:t},p),{},{components:n})):a.createElement(m,l({ref:t},p))}));function y(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,l=new Array(i);l[0]=d;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:r,l[1]=c;for(var o=2;o<i;o++)l[o]=n[o];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},6820:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return l},metadata:function(){return c},toc:function(){return s},default:function(){return p}});var a=n(2122),r=n(9756),i=(n(7294),n(3905)),l={},c={unversionedId:"api-reference/selectors",id:"api-reference/selectors",isDocsHomePage:!1,title:"Selectors",description:"@ById",source:"@site/docs/api-reference/selectors.md",sourceDirName:"api-reference",slug:"/api-reference/selectors",permalink:"/cypress-selectors/api-reference/selectors",editUrl:"https://github.com/anton-kravchenko/cypress-selectors/edit/main/docs/docs/api-reference/selectors.md",version:"current",frontMatter:{},sidebar:"docs",previous:{title:"Set Up",permalink:"/cypress-selectors/getting-started/set-up"},next:{title:"Types",permalink:"/cypress-selectors/api-reference/types"}},s=[{value:"@ById",id:"byid",children:[]},{value:"@ByType",id:"bytype",children:[]},{value:"@ByClass",id:"byclass",children:[]},{value:"@ByAttribute",id:"byattribute",children:[]},{value:"@BySelector",id:"byselector",children:[]},{value:"@ByXPath",id:"byxpath",children:[]},{value:"@ByName",id:"byname",children:[]},{value:"@ByExactText",id:"byexacttext",children:[]},{value:"@ByPartialText",id:"bypartialtext",children:[]},{value:"@ByExactLinkText",id:"byexactlinktext",children:[]},{value:"@ByPartialLinkText",id:"bypartiallinktext",children:[]}],o={toc:s};function p(e){var t=e.components,n=(0,r.Z)(e,["components"]);return(0,i.kt)("wrapper",(0,a.Z)({},o,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h3",{id:"byid"},"@ById"),(0,i.kt)("p",null,"Selects an element by ",(0,i.kt)("inlineCode",{parentName:"p"},"id")," attribute:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"class Selectors {\n  @ById('main')\n  static main: Selector; // equivalent of - cy.get('#main')\n}\n")),(0,i.kt)("h3",{id:"bytype"},"@ByType"),(0,i.kt)("p",null,"Selects an elements by its type, e.g. ",(0,i.kt)("inlineCode",{parentName:"p"},"button"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"div"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"input")," e.t.c:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"class Selectors {\n  @ByType('input')\n  static input: Selector; // equivalent of - cy.get('input')\n}\n")),(0,i.kt)("h3",{id:"byclass"},"@ByClass"),(0,i.kt)("p",null,"Selects an element by its class:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"class Selectors {\n  @ByClass('button')\n  static button: Selector; // equivalent of - cy.get('.button')\n}\n")),(0,i.kt)("h3",{id:"byattribute"},"@ByAttribute"),(0,i.kt)("p",null,"Selects an element by attribute:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"class Selectors {\n  @ByAttribute('header')\n  static header: Selector; // equivalent of - cy.get('[cypress-id=header')\n\n  @ByAttribute('listing', { attribute: 'custom-id' })\n  static listing: Selector; // equivalent of - cy.get('[custom-id=listing')\n}\n")),(0,i.kt)("p",null,"By default, ",(0,i.kt)("inlineCode",{parentName:"p"},"ByAttribute")," queries elements with ",(0,i.kt)("inlineCode",{parentName:"p"},"cypress-id")," attribute (",(0,i.kt)("inlineCode",{parentName:"p"},"Selectors.header")," selector), but the attribute can be specified explicitly as for ",(0,i.kt)("inlineCode",{parentName:"p"},"Selectors.listing")," selector."),(0,i.kt)("p",null,"The default attribute can also be configured ",(0,i.kt)("a",{parentName:"p",href:"/cypress-selectors/api-reference/global-configuration#defaultattribute"},"globally"),"."),(0,i.kt)("h3",{id:"byselector"},"@BySelector"),(0,i.kt)("p",null,"Selects an element by a CSS selector:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"class Selectors {\n  @BySelector('ul > li .focus')\n  static listItem: Selector; // equivalent of - cy.get('ul > li .focus')\n}\n")),(0,i.kt)("h3",{id:"byxpath"},"@ByXPath"),(0,i.kt)("p",null,"Selects an element by XPath selector:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"class Selectors {\n  @ByXPath(`//input`) // equivalent of - cy.xpath('//input')\n}\n")),(0,i.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"Fox ",(0,i.kt)("a",{parentName:"p",href:"https://www.w3schools.com/xml/xpath_syntax.asp"},"XPath")," selectors, that do not specify ",(0,i.kt)("inlineCode",{parentName:"p"},"parent"),", use absolute location path (e.g. ",(0,i.kt)("inlineCode",{parentName:"p"},"//div"),")."),(0,i.kt)("p",{parentName:"div"},"For ",(0,i.kt)("inlineCode",{parentName:"p"},"children")," selectors, that specify ",(0,i.kt)("inlineCode",{parentName:"p"},"parent")," selector, use relative location path (e.g. ",(0,i.kt)("inlineCode",{parentName:"p"},"./div"),")."))),(0,i.kt)("h3",{id:"byname"},"@ByName"),(0,i.kt)("p",null,"Selects an element by ",(0,i.kt)("inlineCode",{parentName:"p"},"name")," attribute:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"class Selectors {\n  @ByName('email') static workEmail: Selector; // equivalent of - cy.get(`[name=\"email\"]`)\n}\n")),(0,i.kt)("h3",{id:"byexacttext"},"@ByExactText"),(0,i.kt)("p",null,"Selects an element that has specified exact text:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"class Selectors {\n  @ByExactText('Foo') static bar: Selector; // equivalent of - cy.xpath(`//*[text()='Foo']`)\n  @ByExactText('bar', { ignoreCase: true }) static bar: Selector;\n}\n")),(0,i.kt)("p",null,"By default, ",(0,i.kt)("inlineCode",{parentName:"p"},"ByExactText")," is case sensitive. To ignore case sensitivity, set ",(0,i.kt)("inlineCode",{parentName:"p"},"ignoreCase")," to ",(0,i.kt)("inlineCode",{parentName:"p"},"true")," as in the second example."),(0,i.kt)("h3",{id:"bypartialtext"},"@ByPartialText"),(0,i.kt)("p",null,"Selects an element that contains specified partial text:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"class Selectors {\n  @ByPartialText('Foo') static p: Selector; // equivalent of - cy.xpath(`/*[contains(text(), 'Foo')]`)\n  @ByPartialText('bar', { ignoreCase: true }) static bar: Selector;\n}\n")),(0,i.kt)("p",null,"By default, ",(0,i.kt)("inlineCode",{parentName:"p"},"ByPartialText")," is case sensitive. To ignore case sensitivity, set ",(0,i.kt)("inlineCode",{parentName:"p"},"ignoreCase")," to ",(0,i.kt)("inlineCode",{parentName:"p"},"true")," as in the second example."),(0,i.kt)("h3",{id:"byexactlinktext"},"@ByExactLinkText"),(0,i.kt)("p",null,"Selects a link that has specified exact text:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"class Selectors {\n  @ByExactLinkText('Link') static link: Selector; // equivalent of - cy.xpath(`//a[text()='Link']`)\n  @ByExactLinkText('link a', { ignoreCase: true }) static linkA: Selector;\n}\n")),(0,i.kt)("p",null,"By default, ",(0,i.kt)("inlineCode",{parentName:"p"},"ByExactLinkText")," is case sensitive. To ignore case sensitivity, set ",(0,i.kt)("inlineCode",{parentName:"p"},"ignoreCase")," to ",(0,i.kt)("inlineCode",{parentName:"p"},"true")," as in the second example."),(0,i.kt)("h3",{id:"bypartiallinktext"},"@ByPartialLinkText"),(0,i.kt)("p",null,"Selects a link that contains specified partial text:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"class Selectors {\n  @ByPartialLinkText('Link') static link: Selector; // equivalent of - cy.xpath(`//a[contains(text(), 'Link')]`)\n  @ByPartialLinkText('link a', { ignoreCase: true }) static linkA: Selector;\n}\n")),(0,i.kt)("p",null,"By default, ",(0,i.kt)("inlineCode",{parentName:"p"},"ByPartialLinkText")," is case sensitive. To ignore case sensitivity, set ",(0,i.kt)("inlineCode",{parentName:"p"},"ignoreCase")," to ",(0,i.kt)("inlineCode",{parentName:"p"},"true")," as in the second example."))}p.isMDXComponent=!0}}]);