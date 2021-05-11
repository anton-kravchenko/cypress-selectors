(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[671],{3905:function(e,t,r){"use strict";r.d(t,{Zo:function(){return u},kt:function(){return h}});var n=r(7294);function s(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function c(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?c(Object(r),!0).forEach((function(t){s(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e,t){if(null==e)return{};var r,n,s=function(e,t){if(null==e)return{};var r,n,s={},c=Object.keys(e);for(n=0;n<c.length;n++)r=c[n],t.indexOf(r)>=0||(s[r]=e[r]);return s}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(n=0;n<c.length;n++)r=c[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(s[r]=e[r])}return s}var i=n.createContext({}),l=function(e){var t=n.useContext(i),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},u=function(e){var t=l(e.components);return n.createElement(i.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,s=e.mdxType,c=e.originalType,i=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),m=l(r),h=s,y=m["".concat(i,".").concat(h)]||m[h]||p[h]||c;return r?n.createElement(y,a(a({ref:t},u),{},{components:r})):n.createElement(y,a({ref:t},u))}));function h(e,t){var r=arguments,s=t&&t.mdxType;if("string"==typeof e||s){var c=r.length,a=new Array(c);a[0]=m;var o={};for(var i in t)hasOwnProperty.call(t,i)&&(o[i]=t[i]);o.originalType=e,o.mdxType="string"==typeof e?e:s,a[1]=o;for(var l=2;l<c;l++)a[l]=r[l];return n.createElement.apply(null,a)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},426:function(e,t,r){"use strict";r.r(t),r.d(t,{frontMatter:function(){return a},metadata:function(){return o},toc:function(){return i},default:function(){return u}});var n=r(2122),s=r(9756),c=(r(7294),r(3905)),a={id:"intro",slug:"/"},o={unversionedId:"intro",id:"intro",isDocsHomePage:!1,title:"Cypress Selectors",description:"npm",source:"@site/docs/intro.md",sourceDirName:".",slug:"/",permalink:"/cypress-selectors/",editUrl:"https://github.com/anton-kravchenko/cypress-selectors/edit/main/docs/docs/intro.md",version:"current",frontMatter:{id:"intro",slug:"/"},sidebar:"docs",next:{title:"Motivation",permalink:"/cypress-selectors/motivation"}},i=[],l={toc:i};function u(e){var t=e.components,r=(0,s.Z)(e,["components"]);return(0,c.kt)("wrapper",(0,n.Z)({},l,r,{components:t,mdxType:"MDXLayout"}),(0,c.kt)("p",null,(0,c.kt)("img",{parentName:"p",src:"https://github.com/anton-kravchenko/cypress-selectors/workflows/CI/badge.svg",alt:null}),"\n",(0,c.kt)("img",{parentName:"p",src:"https://github.com/anton-kravchenko/cypress-selectors/workflows/Verify/badge.svg",alt:null}),"\n",(0,c.kt)("img",{parentName:"p",src:"https://img.shields.io/npm/v/cypress-selectors",alt:"npm"}),"\n",(0,c.kt)("a",{parentName:"p",href:"https://github.com/anton-kravchenko/cypress-selectors/blob/main/LICENSE"},(0,c.kt)("img",{parentName:"a",src:"https://img.shields.io/badge/license-MIT-blue.svg",alt:"GitHub license"}))),(0,c.kt)("p",null,(0,c.kt)("inlineCode",{parentName:"p"},"cypress-selectors")," is a library that provides a bunch of convenient declarative selectors for Cypress."),(0,c.kt)("p",null,"It helps to organize and re-use selectors and turns this:"),(0,c.kt)("pre",null,(0,c.kt)("code",{parentName:"pre",className:"language-typescript"},"const getSearchInput = () => cy.get('input');\nconst getSubmitSearchButton = () => cy.get('[cypress-id]=submit-search');\nconst getSearchResults = () => cy.get('.search-result');\nconst getMain = () => cy.xpath(`//div[@cypress-id='main']`);\n\nit('should render search results', () => {\n  getSearchInput().type('search term');\n  getSubmitSearchButton().click();\n  getSearchResults().should('have.length', 4);\n  getMain().contains('The search has returned 4 results.');\n});\n")),(0,c.kt)("p",null,"into that:"),(0,c.kt)("pre",null,(0,c.kt)("code",{parentName:"pre",className:"language-typescript"},"class HomePage {\n  @ByType('input') static searchInput: Selector;\n  @ByAttribute('submit-search') static submitSearch: Selector;\n  @ByClass('search-result') static searchResults: Selector;\n  @ByXPath(`//div[@cypress-id='main']`) static main: Selector;\n}\n\nit('should render search results', () => {\n  HomePage.searchInput.type('search term');\n  HomePage.submitSearch.click();\n  HomePage.searchResults.should('have.length', 4);\n  HomePage.main.contains('The search has returned 4 results.');\n});\n")))}u.isMDXComponent=!0}}]);