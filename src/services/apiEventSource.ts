import { fetchEventSource } from '@microsoft/fetch-event-source';
import { BASE_URL_API } from '@/constants/api';
import store from '@/store';

interface FetchEventSourceParams<T> {
    query?: { [key: string]: string };
    path: string;
    callback(data: T): void;
}

export const list = async <T = undefined>({ callback, path, query }: FetchEventSourceParams<T>) => {
    const state = store.getState();
    const token = '';

    let url = `${BASE_URL_API}/${path}`;

    if (query) url = `${url}?${new URLSearchParams(query).toString()}`;

    const headers = {
        Accept: 'text/event-stream',
        Authorization: `Bearer ${token}`,
    };

    // return fetchEventSource(url, {
    //     method: 'GET',
    //     headers,
    //     onmessage(event) {
    //         const parsedData = JSON.parse(event.data);
    //         callback(parsedData);
    //     },
    //     onclose() {
    //         console.log('onclose fetchEventSource');
    //     },
    //     onerror() {
    //         console.log('onerror fetchEventSource');
    //     },
    //     async onopen(response) {
    //         console.log(`response onopen fetchEventSource: ${response}`);
    //     },
    // });
};
