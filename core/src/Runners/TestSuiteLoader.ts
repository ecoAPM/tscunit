import TestSuite from "../Framework/TestSuite";
import FileSystem from "../IO/FileSystem";
import path from "path";

export default class TestSuiteLoader {

	constructor(private readonly file_system: FileSystem) {
	}

	static async loadTestSuite(file: string, filters: RegExp[]) {
		const module_path = TestSuiteLoader.getModulePath(__dirname, file);
		const test_class = await import(module_path);

		// The test suite must be the default export of the imported module
		if (!(test_class.default?.prototype instanceof TestSuite)) {
			return null;
		}

		// The prototype can still be an abstract class, which means getTest() will return undefined
		const tests = test_class.default.prototype.getTests(filters);
		if (!tests || Object.keys(tests).length === 0) {
			return null;
		}

		const suite: TestSuite = new test_class.default();
		suite.setTests(tests);
		return suite;
	}

	static getModulePath(current_dir: string, file: string) {
		const root = TestSuiteLoader.isFromNodeModules(path.resolve(current_dir))
			? `..${path.sep}..${path.sep}..${path.sep}..${path.sep}..`
			: `..${path.sep}..${path.sep}..`;
		const extension = FileSystem.extension(file);
		const module_name = extension.length > 0
			? file.substring(0, file.length - extension.length - 1)
			: file;
		return `${root}${path.sep}${module_name}`;
	}

	static isFromNodeModules(dir: string) {
		return dir.indexOf("node_modules") !== -1;
	}

	async loadTestSuites(dir: string, filters: RegExp[]): Promise<Record<string, TestSuite>> {
		const suites: Record<string, TestSuite> = {};

		const files = (await this.file_system.getFiles(dir))
			.filter((file) => FileSystem.extension(file) === FileSystem.extension(__filename));

		for (const file of files) {
			const suite = await TestSuiteLoader.loadTestSuite(file, filters);
			if (suite !== undefined && suite !== null) {
				suites[file] = suite;
			}
		}
		return suites;
	}
}