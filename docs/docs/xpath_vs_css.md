# XPath vs CSS

The library supports two selector engines `XPath` and `CSS`. Below is the list of selectors powered by these engines.

`XPath`:

- [@ByXPath](/cypress-selectors/api-reference/selectors#byxpath)
- [@ByName](/cypress-selectors/api-reference/selectors#byname)
- [@ByExactText](/cypress-selectors/api-reference/selectors#byexacttext)
- [@ByPartialText](/cypress-selectors/api-reference/selectors#bypartialtext)
- [@ByExactLinkText](/cypress-selectors/api-reference/selectors#byexactlinktext)
- [@ByPartialLinkText](/cypress-selectors/api-reference/selectors#bypartiallinktext)

`CSS`:

- [@BySelector](/cypress-selectors/api-reference/selectors#byselector)
- [@ById](/cypress-selectors/api-reference/selectors#byid)
- [@ByType](/cypress-selectors/api-reference/selectors#bytype)
- [@ByClass](/cypress-selectors/api-reference/selectors#byclass)
- [@ByAttribute](/cypress-selectors/api-reference/selectors#byattribute)

If you want to use "full selectors" selectors, use [@BySelector](/cypress-selectors/api-reference/selectors#byselector) for specifying `CSS` selectors and [@ByXPath](/cypress-selectors/api-reference/selectors#byxpath) for `XPath` selectors.
