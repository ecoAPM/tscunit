import { Test, TestSuite } from "../../xunit";
import { AssertionError } from "assert";
import InstanceOf from "../../src/Assertions/InstanceOf";

export default class InstanceOfTests extends TestSuite {
	@Test()
	async ReturnsWhenTrue() {
		//arrange
		const value = new class X extends TestSuite {
		};

		//act
		InstanceOf(TestSuite, value);

		//assert
		this.assert.true(true);
	}

	@Test()
	async ThrowsWhenFalse() {
		//arrange
		const value = new class X {
		};

		try {
			//act
			InstanceOf(TestSuite, value);
			throw new Error("Assertion failed");
		} catch (exception) {

			//assert
			this.assert.instanceOf(AssertionError, exception);
		}
	}

	@Test()
	async ExpectedValueIsTypeName() {
		//arrange
		const value = new class X {
		};

		try {
			//act
			InstanceOf(TestSuite, value);
			throw new Error("Assertion failed");
		} catch (exception) {

			//assert
			this.assert.equal(TestSuite.name, (exception as AssertionError).expected);
		}
	}
}