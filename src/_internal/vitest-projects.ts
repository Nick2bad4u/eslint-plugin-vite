import type { TSESTree } from "@typescript-eslint/utils";

import { isDefined } from "ts-extras";

import {
    asObjectExpression,
    findPropertyByName,
    getStaticStringValue,
    matchesPropertyPath,
} from "./ast.js";

/** Supported inline Vitest project container kinds recognized by this plugin. */
export type VitestInlineProjectContainerKind = "projects" | "workspace";

/** Canonical inline Vitest project entry shape extracted from array literals. */
export type VitestInlineProjectEntry = Readonly<{
    containerKind: VitestInlineProjectContainerKind;
    entryNode: Readonly<TSESTree.CallExpression | TSESTree.ObjectExpression>;
    projectObject: TSESTree.ObjectExpression;
}>;

/** Supported helper wrappers for inline Vitest project objects. */
export type VitestProjectFactoryCallName = "defineConfig" | "defineProject";

const isVitestProjectFactoryCall = (
    node: Readonly<TSESTree.Node>
): node is TSESTree.CallExpression =>
    node.type === "CallExpression" &&
    node.callee.type === "Identifier" &&
    (node.callee.name === "defineConfig" ||
        node.callee.name === "defineProject");

/**
 * Resolve the object expression for an inline Vitest project entry when
 * possible.
 */
export const getInlineVitestProjectEntry = (
    element: Readonly<TSESTree.ArrayExpression["elements"][number]>,
    containerKind: VitestInlineProjectContainerKind
): undefined | VitestInlineProjectEntry => {
    if (element === null) {
        return undefined;
    }

    if (element.type === "ObjectExpression") {
        return {
            containerKind,
            entryNode: element,
            projectObject: element,
        };
    }

    if (!isVitestProjectFactoryCall(element)) {
        return undefined;
    }

    const [firstArgument] = element.arguments;

    if (firstArgument === undefined || firstArgument.type === "SpreadElement") {
        return undefined;
    }

    const projectObject = asObjectExpression(firstArgument);

    if (projectObject === undefined) {
        return undefined;
    }

    return {
        containerKind,
        entryNode: element,
        projectObject,
    };
};

/** Collect all statically readable inline Vitest project entries from an array. */
export const getInlineVitestProjectEntries = (
    arrayExpression: Readonly<TSESTree.ArrayExpression>,
    containerKind: VitestInlineProjectContainerKind
): readonly VitestInlineProjectEntry[] => {
    const projectEntries: VitestInlineProjectEntry[] = [];

    for (const element of arrayExpression.elements) {
        const projectEntry = getInlineVitestProjectEntry(
            element,
            containerKind
        );

        if (isDefined(projectEntry)) {
            projectEntries.push(projectEntry);
        }
    }

    return projectEntries;
};

/** Check whether a property is a `test.projects` array in a Vitest config. */
export const isVitestProjectsProperty = (
    node: Readonly<TSESTree.Property>
): boolean =>
    node.value.type === "ArrayExpression" &&
    matchesPropertyPath(node, ["test", "projects"]);

/** Resolve the `test` object inside a Vitest project configuration. */
export const getVitestProjectTestObject = (
    projectObject: Readonly<TSESTree.ObjectExpression>
): TSESTree.ObjectExpression | undefined => {
    const testProperty = findPropertyByName(projectObject, "test");

    if (testProperty?.value.type !== "ObjectExpression") {
        return undefined;
    }

    return testProperty.value;
};

/** Resolve the property node that declares a Vitest project name when present. */
export const getVitestProjectNameProperty = (
    projectObject: Readonly<TSESTree.ObjectExpression>
): TSESTree.Property | undefined => {
    const testObject = getVitestProjectTestObject(projectObject);
    const nestedNameProperty =
        testObject === undefined
            ? undefined
            : findPropertyByName(testObject, "name");

    if (nestedNameProperty !== undefined) {
        return nestedNameProperty;
    }

    return findPropertyByName(projectObject, "name");
};

/** Check whether a Vitest project config declares any project name. */
export const hasVitestProjectName = (
    projectObject: Readonly<TSESTree.ObjectExpression>
): boolean => getVitestProjectNameProperty(projectObject) !== undefined;

const getStaticStringValueFromPropertyValue = (
    value: Readonly<TSESTree.Property["value"]>
): string | undefined =>
    value.type === "Literal" || value.type === "TemplateLiteral"
        ? getStaticStringValue(value)
        : undefined;

/** Resolve a statically readable Vitest project name when possible. */
export const getStaticVitestProjectName = (
    projectObject: Readonly<TSESTree.ObjectExpression>
): string | undefined => {
    const nameProperty = getVitestProjectNameProperty(projectObject);

    if (nameProperty === undefined) {
        return undefined;
    }

    const nameValue = nameProperty.value;

    if (nameValue.type === "ObjectExpression") {
        const labelProperty = findPropertyByName(nameValue, "label");

        return labelProperty === undefined
            ? undefined
            : getStaticStringValueFromPropertyValue(labelProperty.value);
    }

    return getStaticStringValueFromPropertyValue(nameValue);
};

/**
 * Resolve the call-wrapper used for an inline Vitest project entry when
 * present.
 */
export const getVitestProjectFactoryCallName = (
    projectEntry: Readonly<VitestInlineProjectEntry>
): undefined | VitestProjectFactoryCallName =>
    projectEntry.entryNode.type === "CallExpression" &&
    projectEntry.entryNode.callee.type === "Identifier"
        ? (projectEntry.entryNode.callee.name as VitestProjectFactoryCallName)
        : undefined;
