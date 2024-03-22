export type TranslateFunction = (args: any) => string;

export interface Translation {
    [key: string]: string | TranslateFunction;
}
