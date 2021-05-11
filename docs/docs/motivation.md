# Motivation

The idea behind the library is to provide a convenient way for defining Cypress selectors declaratively.

You can find the list of possible ways for dealing with selectors in Cypress in [the article](https://antosha-kravchenko.medium.com/dealing-with-selectors-in-cypress-8b9ac0dfe240) on Medium.

Here is a brief breakdown of how you can work with selectors:

## Hardcode 'em all 🤪

```typescript
it('should submit feedback form', () => {
  cy.get('.feedback-input').type(FEEDBACK);
  cy.get('.submit-button').click();
});
```

The easiest and probably not the best way.

## Store in constants and then reuse 🤔

```typescript
const SUBMIT_BUTTON_SELECTOR = '.submit-button';
const FEEDBACK_INPUT_SELECTOR = '.feedback-input';

it('should submit feedback form', () => {
  cy.get(FEEDBACK_INPUT_SELECTOR).type(FEEDBACK);
  cy.get(SUBMIT_BUTTON_SELECTOR).click();
});
```

Better than hardcoding but not convenient to define _child-parent_ relationship.

## Define a custom action for selecting elements 🧐

```typescript title="cypress/support/commands.ts"
const INTERNAL_ID_ATTRIBUTE = `cypress-id`;

/* Adds support for `getByInternalId` command that looks up elements
   based on `INTERNAL_ID_ATTRIBUTE` attribute */
Cypress.Commands.add('getByInternalId', { prevSubject: 'optional' }, (subject, internalId) =>
  subject
    ? /* Lookup within the given node */
      subject.find(`[${INTERNAL_ID_ATTRIBUTE}=${internalId}]`)
    : /* Look up globally */
      cy.get(`[${INTERNAL_ID_ATTRIBUTE}=${internalId}]`),
);
```

```typescript title="cypress/integration/test.ts"
const FEEDBACK_FORM_SELECTORS = {
  getSubmitButton: () => cy.getByInternalId('submit'),
  getFeedbackInput: () => cy.getByInternalId('feedback'),
};

it('should submit feedback form', () => {
  cy.get(FEEDBACK_FORM_SELECTORS.getSubmitButton()).type(FEEDBACK);
  cy.get(FEEDBACK_FORM_SELECTORS.getFeedbackInput()).click();
});
```

Even better since it unifies the way of querying elements and hides some of the complexity.

## Define selectors declaratively 😻

```typescript
class Selectors {
  @ById('main') static parent: Selector;
  @ByClass('button', { parent: Selectors.parent }) static children: Selector;
}
```

Seems to be the most optimal approach since:

- it allows to define selectors declaratively and concisely (no more constants / selector functions / custom actions / e.t.c)
- it makes it easy to access and reuse selectors - just access your selectors by reference and the lib will do querying for you
- it makes it easy to specify _child-parent_ relationship

The API is inspired by [Selenium](https://www.selenium.dev/selenium/docs/api/java/org/openqa/selenium/By.html) selectors.
