import TestInfo from '../Framework/TestInfo';
import TestSuite from '../Framework/TestSuite';
import { TestResult } from '../Framework/TestResult';
import ResultReporter from './ResultReporter';

export default class TestRunner {

    constructor(private reporters: ResultReporter[]) { }

    async runTest(name: string, info: TestInfo, suite: TestSuite) {
        this.reporters.forEach(r => r.testStarted(suite, name));
        if (info.value == null) {
            this.reporters.forEach(r => r.testIncomplete(suite, name));
            return TestResult.Incomplete;
        }

        try {
            await info.value.call(suite);
            this.reporters.forEach(r => r.testPassed(suite, name));
            return TestResult.Passed;

        } catch (error) {
            this.reporters.forEach(r => r.testFailed(suite, name, error));
            return TestResult.Failed;
        }
    }
}