/* eslint-disable no-undef */
const poonya = require("../src/poonya")
    , assert = require("assert");

describe("poonya-common-test", () => {
    describe("#scope", () => {
        it("Should return SomeValue-1 and SomeValue", async () => {
            const pattern = new poonya.ExecutionPattern({
                path: __dirname + "/src/unit-scope-1",
            });

            assert.notStrictEqual(await pattern.result().complete(), [
                "SomeValue-1",
                "SomeValue",
            ]);
        });

        it("Should return SomeValue and null", async () => {
            const pattern = new poonya.ExecutionPattern({
                path: __dirname + "/src/unit-scope-2",
            });

            assert.notStrictEqual(await pattern.result().complete(), ["SomeValue", null]);
        });

        it("Should return an array with numbers", async () => {
            const pattern = new poonya.ExecutionPattern({
                path: __dirname + "/src/unit-scope-3",
            });

            assert.notStrictEqual(await pattern.result().complete(), [
                5,
                10,
                30,
                120,
                600,
                3600,
                25200,
                201600,
                1814400,
                18144000,
                199584000,
            ]);
        });
    });

    describe("#object-notation", () => {
        it("Should return two empty objects", async () => {
            const pattern = new poonya.ExecutionPattern({
                path: __dirname + "/src/unit-object-literal-0",
            });

            assert.deepStrictEqual(await pattern.result().complete(), [{
                Field1: 'value1',
                Field2: [
                    1,
                    2,
                    3,
                    4
                ],
                Field3: 0
            }]);
        });

        it("Should return one filled object", async () => {
            const pattern = new poonya.ExecutionPattern({
                path: __dirname + "/src/unit-object-literal-1",
            });

            assert.deepStrictEqual(await pattern.result().complete(), [{
                field1: 1,
                field2: 2,
                field3: 3,
                field4: 4,
                field5: {
                    field1: 1,
                    field2: 2,
                    field3: {
                        field1: 1,
                        field2: 2
                    }
                },
                field6: 6
            }]);
        });

        it("Should return indexed object", async () => {
            const pattern = new poonya.ExecutionPattern({
                path: __dirname + "/src/unit-object-literal-2",
            });

            assert.deepStrictEqual(await pattern.result().complete(), [{
                "0": 0,
                "1": 1,
                "2": 2,
                "3": 3,
                "4": 4,
                "5": 5,
                "6": 6,
                "7": 7,
                "8": 8,
                "9": 9
            }]);
        });
    });

    describe("#object-field-edit", () => {
        it("Should return one field with string which equals 'NOT 1'", async () => {
            const pattern = new poonya.ExecutionPattern({
                path: __dirname + "/src/unit-object-edit-field-0",
            });

            assert.deepStrictEqual(await pattern.result().complete(), [{
                field1: "NOT 1"
            }]);
        });

        it("Should return filed, with 2 subfield which equals 'NOT 1' and 'NOT 2'", async () => {
            const pattern = new poonya.ExecutionPattern({
                path: __dirname + "/src/unit-object-edit-field-1",
            });

            assert.deepStrictEqual(await pattern.result().complete(), [{
                field1: {
                    subfield1: "NOT 1",
                    subfield2: "NOT 2"
                }
            }]);
        });

        it("Should return 'NOT OBJECT' contains string field", async () => {
            const pattern = new poonya.ExecutionPattern({
                path: __dirname + "/src/unit-object-edit-field-2",
            });

            assert.deepStrictEqual(await pattern.result().complete(), [{
                field1: 'NOT OBJECT'
            }]);
        });
    });

    describe("#object-inheritance", () => {
        it("Checking the inheritance of fields from an object", async () => {
            const pattern = new poonya.ExecutionPattern({
                path: __dirname + "/src/unit-object-inheritance-0",
            });

            assert.deepStrictEqual(await pattern.result().complete(), [
                true,
                {
                    field1: 1,
                    SomeField: 1
                }
            ]);
        });

        it("Should return an array with numbers from 0 to 5", async () => {
            const pattern = new poonya.ExecutionPattern({
                path: __dirname + "/src/unit-object-inheritance-1",
            });

            assert.deepStrictEqual(await pattern.result().complete(), [
                [1, 2, 3, 4, 5]
            ]);
        });

        it("Should return empty array", async () => {
            const pattern = new poonya.ExecutionPattern({
                path: __dirname + "/src/unit-object-inheritance-2",
            });

            assert.deepStrictEqual(await pattern.result().complete(), [[]]);
        });
    });

    describe("#object-static-methods", () => {
        it("Should return an array with values ​​from 0 to 5", async () => {
            const pattern = new poonya.ExecutionPattern({
                path: __dirname + "/src/unit-object-static-0",
            });

            assert.deepStrictEqual(await pattern.result().complete(), [
                [0, 1, 2, 3, 4, 5]
            ]);
        });

        it("Should return an empty array", async () => {
            const pattern = new poonya.ExecutionPattern({
                path: __dirname + "/src/unit-object-static-1",
            });

            assert.deepStrictEqual(await pattern.result().complete(), [[]]);
        });

        it("Should return an empty object", async () => {
            const pattern = new poonya.ExecutionPattern({
                path: __dirname + "/src/unit-object-static-2",
            });

            assert.deepStrictEqual(await pattern.result().complete(), [{}]);
        });
    });
});