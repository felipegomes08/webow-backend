type QueryParams = Record<string, string | undefined>;
type ConvertedField = Record<string, { [key: string]: string | number }>;

export function convertQueryParams(query: QueryParams): ConvertedField {
    const result: ConvertedField = {};

    for (const key in query) {
        if (query[key]) {
            const [field, operator] = key.split('.');

            if (operator) {
                result[field] = result[field] || {};
                result[field][operator] = query[key];
            } else {
                switch (field) {
                    case 'page':
                        result[field] = +query[key] as any
                        break;
                    case 'limit':
                        result[field] = +query[key] as any
                        break;
                    default:
                        result[field] = query[key] as any;
                }
            }
        }
    }

    return result;
}