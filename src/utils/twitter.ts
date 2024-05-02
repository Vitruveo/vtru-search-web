export interface CreateTwitterIntentParams {
    url: string;
    hashtags?: string;
}

export const createTwitterIntent = ({ url, hashtags }: CreateTwitterIntentParams) => {
    const intent = new URL('https://twitter.com/intent/tweet');

    intent.searchParams.append('url', url + `?c=${Date.now()}`);

    if (hashtags) {
        intent.searchParams.append('hashtags', hashtags);
    }

    return intent.toString();
};
