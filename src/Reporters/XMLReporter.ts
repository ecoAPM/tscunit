﻿import FileReporter from "./FileReporter";
import TestSuiteResults from "../Framework/TestSuiteResults";

export default abstract class XMLReporter extends FileReporter {
	async runCompleted(results: Record<string, TestSuiteResults>): Promise<void> {
		const xmlString = this.xml(results);
		await this.file_system.save(xmlString, this.path);
	}

	abstract xml(results: Record<string, TestSuiteResults>): string;
}