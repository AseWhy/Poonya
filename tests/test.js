const poonya = require("../poonya"),
    assert = require("assert");

describe("poonya", () => {
    describe("#scope", () => {
        it("Should return SomeValue-1 and SomeValue", () => {
            const test_pattern = new poonya.ExcecutionPattern({
                path: __dirname + "/src/unit-scope-1",
            });

            assert.notStrictEqual(test_pattern.result(), [
                "SomeValue-1",
                "SomeValue",
            ]);
        });

        it("Should return SomeValue and null", () => {
            const test_pattern = new poonya.ExcecutionPattern({
                path: __dirname + "/src/unit-scope-2",
            });

            assert.notStrictEqual(test_pattern.result(), ["SomeValue", null]);
        });

        it("Should return an array with numbers", () => {
            const test_pattern = new poonya.ExcecutionPattern({
                path: __dirname + "/src/unit-scope-3",
            });

            assert.notStrictEqual(test_pattern.result(), [
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
        it("Should return two empty objects", () => {
            const test_pattern = new poonya.ExcecutionPattern({
                path: __dirname + "/src/unit-object-literal-0",
            });

            assert.deepStrictEqual(test_pattern.result(), [{},{}]);
        });

        it("Should return one filled object", () => {
            const test_pattern = new poonya.ExcecutionPattern({
                path: __dirname + "/src/unit-object-literal-1",
            });

            assert.deepStrictEqual(test_pattern.result(), [{
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
    })
});
