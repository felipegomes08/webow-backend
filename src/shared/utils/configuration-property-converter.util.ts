export class ConfigurationPropertyConverter {

    static jsonToText(json: object) {
        let result = "";

        for (const [key, { value, description }] of Object.entries(json)) {
            if (description) {
                result += `# ${description}\n`;
            }
            const formattedValue =
                typeof value === "string" && !value.match(/^-?\d+(\.\d+)?$/)
                    ? `"${value}"`
                    : value;
            result += `${key} = ${formattedValue}\n`;
        }

        return result.trim();
    }

    static textToJson(text: string): object {
        const lines = text.split("\n");
        const result = {} as any;
        let lastComment = "";

        lines.forEach((line) => {
            line = line.trim();
            if (line.startsWith("#")) {
                lastComment = line.replace(/^#\s*/, "");
            } else if (line.includes("=")) {
                const [key, value] = line.split("=").map((part) => part.trim());
                const commentSplit = value.split("#");
                const actualValue = commentSplit[0].trim();
                const inlineComment = commentSplit[1]?.trim();

                result[key] = {
                    value: isNaN(Number(actualValue))
                        ? actualValue.replace(/^"|"$/g, "")
                        : parseFloat(actualValue),
                    description: inlineComment || lastComment,
                };
                lastComment = "";
            }
        });

        return result;
    }

}