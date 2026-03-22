import type { TSESTree } from "@typescript-eslint/utils";

/** Convert a static string-ish AST node into its runtime string value. */
export const getStaticStringValue = (
    node:
        | null
        | Readonly<TSESTree.Expression>
        | Readonly<TSESTree.PrivateIdentifier>
): string | undefined => {
    if (node === null) {
        return undefined;
    }

    if (node.type === "Literal") {
        return typeof node.value === "string" ? node.value : undefined;
    }

    if (node.type === "TemplateLiteral" && node.expressions.length === 0) {
        return node.quasis[0]?.value.cooked ?? undefined;
    }

    return undefined;
};

/** Resolve the static key name for a property or member expression. */
export const getStaticPropertyName = (
    node: Readonly<TSESTree.MemberExpression> | Readonly<TSESTree.Property>
): string | undefined => {
    if (node.type === "Property") {
        if (!node.computed && node.key.type === "Identifier") {
            return node.key.name;
        }

        return getStaticStringValue(node.key);
    }

    if (!node.computed && node.property.type === "Identifier") {
        return node.property.name;
    }

    return getStaticStringValue(node.property);
};

/** Find a non-spread property by name inside an object expression. */
export const findPropertyByName = (
    objectExpression: Readonly<TSESTree.ObjectExpression>,
    propertyName: string
): TSESTree.Property | undefined => {
    for (const property of objectExpression.properties) {
        if (property.type !== "Property") {
            continue;
        }

        if (getStaticPropertyName(property) === propertyName) {
            return property;
        }
    }

    return undefined;
};

/** Resolve the static nested property path for an object property. */
export const getPropertyPath = (
    node: Readonly<TSESTree.Property>
): readonly string[] => {
    const propertyPath: string[] = [];
    let currentNode: Readonly<TSESTree.Node> = node;

    while (currentNode.type === "Property") {
        const propertyName = getStaticPropertyName(currentNode);

        if (propertyName === undefined) {
            return [];
        }

        propertyPath.unshift(propertyName);

        const parentObject: TSESTree.Node | undefined = currentNode.parent;

        if (parentObject?.type !== "ObjectExpression") {
            break;
        }

        const parentNode: TSESTree.Node | undefined = parentObject.parent;

        if (parentNode?.type !== "Property") {
            break;
        }

        currentNode = parentNode;
    }

    return propertyPath;
};

/** Check whether a property resolves to the provided nested path. */
export const matchesPropertyPath = (
    node: Readonly<TSESTree.Property>,
    expectedPath: readonly string[]
): boolean => {
    const propertyPath = getPropertyPath(node);

    return (
        propertyPath.length === expectedPath.length &&
        propertyPath.every((segment, index) => segment === expectedPath[index])
    );
};

/** Check whether a property path ends with the provided nested suffix. */
export const propertyPathEndsWith = (
    propertyPath: readonly string[],
    suffixPath: readonly string[]
): boolean => {
    if (suffixPath.length > propertyPath.length) {
        return false;
    }

    const offset = propertyPath.length - suffixPath.length;

    return suffixPath.every(
        (segment, index) => propertyPath[offset + index] === segment
    );
};

/** Check whether an AST node is the `import.meta` meta property. */
export const isImportMeta = (
    node: Readonly<TSESTree.Node>
): node is TSESTree.MetaProperty =>
    node.type === "MetaProperty" &&
    node.meta.name === "import" &&
    node.property.name === "meta";

/** Check whether a member expression is `import.meta.env`. */
export const isImportMetaEnvMemberExpression = (
    node: Readonly<TSESTree.Node>
): node is TSESTree.MemberExpression =>
    node.type === "MemberExpression" &&
    isImportMeta(node.object) &&
    getStaticPropertyName(node) === "env";

/** Check whether a member expression is `import.meta.glob`. */
export const isImportMetaGlobMemberExpression = (
    node: Readonly<TSESTree.Node>
): node is TSESTree.MemberExpression =>
    node.type === "MemberExpression" &&
    isImportMeta(node.object) &&
    getStaticPropertyName(node) === "glob";

/** Extract an object expression from a direct expression when possible. */
export const asObjectExpression = (
    node: null | Readonly<TSESTree.Expression>
): TSESTree.ObjectExpression | undefined =>
    node?.type === "ObjectExpression" ? node : undefined;
