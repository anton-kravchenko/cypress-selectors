const internalAliasLabel = 'INTERNAL_ALIAS_KEY';
const internalAliasKey: unique symbol = Symbol(internalAliasLabel);
const hostIDKey: unique symbol = Symbol('HOST_ID');
const byExternalAlias: unique symbol = Symbol('BY_EXTERNAL_ALIAS');

export { internalAliasKey, hostIDKey, byExternalAlias };
