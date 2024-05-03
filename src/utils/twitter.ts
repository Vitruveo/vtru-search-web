export interface CreateTwitterIntentParams {
    url: string;
    hashtags?: string;
    text?: string;
}

export const createTwitterIntent = ({ url, hashtags, text }: CreateTwitterIntentParams) => {
    const intent = new URL('https://twitter.com/intent/tweet');

    intent.searchParams.append('url', url + `?c=${Date.now()}\n`);

    if (hashtags) {
        intent.searchParams.append('hashtags', hashtags);
    }

    if (text) {
        intent.searchParams.append('text', text + '\n');
    }

    return intent.toString();
};
