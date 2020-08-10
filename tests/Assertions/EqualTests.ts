import { TestSuite, Test } from "../../xunit";
import Equal from "../../src/Assertions/Equal";
import { AssertionError } from "assert";

export default class EqualTests extends TestSuite {
    @Test()
    async ReturnsWhenTrue() {
        //arrange
        const value1 = 123;
        const value2 = 123;

        //act
        Equal(value1, value2);

        //assert
        this.assert.true(true);
    }

    @Test()
    async ThrowsWhenFalse() {
        //arrange
        const value1 = 123;
        const value2 = 234;

        try {
            //act
            Equal(value1, value2);

        }
        catch (exception) {

            //assert
            this.assert.instanceOf(AssertionError, exception);
        }
    }
}