const generateQueryParam = (key: string, value: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set(key, value);
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
};

export default generateQueryParam;
