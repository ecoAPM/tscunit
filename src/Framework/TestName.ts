export default class TestName {
    static toSentenceCase(test_name: string) {
        const result = test_name
            .replace(/_([A-Z])/gi, (substring: string, match: string) => match.toUpperCase())
            .replace(/([A-Z])/g, " $1")
            .trim();
        return result.charAt(0).toUpperCase() + result.slice(1);
    }
}