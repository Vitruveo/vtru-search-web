export interface RedirectType {
    [key: string]: CommonType & RedirectsPathsType;
}

export interface CommonType {
    xibit: {
        about_url: string;
    };
    vitruveo: {
        dreamverse_url: string;
        base_url: string;
        scope_url: string;
        domain: string;
    };
}

export interface RedirectsPathsType {
    xibit: {
        store_url: string;
        search_url: string;
        stores_url: string;
        studio_url: string;
        admin_url: string;
        airdrop_url: string;
        slideshow_url: string;
    };
    vitruveo: {
        explorer_url: string;
        web3_network_rpc: string;
    };
}

export interface RedirectsState {
    data: RedirectType;
    loading: boolean;
    error: string | null;
}
