const licenses = [
    {
        license: 'CC BY',
        infoLink: 'https://creativecommons.org/licenses/by/4.0/',
    },
    {
        license: 'CC BY-SA',
        infoLink: 'https://creativecommons.org/licenses/by-sa/4.0/',
    },
    {
        license: 'CC BY-NC',
        infoLink: 'https://creativecommons.org/licenses/by-nc/4.0/',
    },
    {
        license: 'CC BY-NC-SA',
        infoLink: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
    },
    {
        license: 'CC BY-ND',
        infoLink: 'https://creativecommons.org/licenses/by-nd/4.0/',
    },
    {
        license: 'CC BY-NC-ND',
        infoLink: 'https://creativecommons.org/licenses/by-nc-nd/4.0/',
    },
    {
        license: 'CC0',
        infoLink: 'https://creativecommons.org/publicdomain/zero/1.0/',
    },
];

export default function getInfoLink(licenseName: string) {
    return licenses.find((l) => l.license === licenseName)?.infoLink;
}
