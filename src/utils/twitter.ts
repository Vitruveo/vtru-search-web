export interface CreateTwitterIntentParams {
    url: string;
    hashtags?: string;
    text?: string;
    extra?: string;
}

export const createTwitterIntent = ({ url, hashtags, text, extra }: CreateTwitterIntentParams) => {
    const intent = new URL('https://x.com/intent/post');

    const timestamp = Date.now().toString();

    if (extra) intent.searchParams.append('url', `${url.trim()}?${extra.trim()}&c=${timestamp}\n\n`);
    else intent.searchParams.append('url', `${url.trim()}?c=${timestamp}\n\n`);

    if (hashtags) intent.searchParams.append('hashtags', `${hashtags.trim()}`);

    if (text) intent.searchParams.append('text', `${text.trim()}\n`);

    return intent.toString();
};
