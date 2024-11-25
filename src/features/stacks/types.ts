export interface GetStackParams {
    page: number;
    limit: number;
    sort: string;
}

export interface StackSliceState {
    loading: boolean;
    error: string | null;
    data: StackData;
    spotlight: {
        stack: Stack;
    }[];
    sort: string;
}

export interface Stack {
    _id: string;
    username: string;
    vault: {
        transactionhash: string | null;
        vaultAddress: string | null;
    };
    stacks: {
        id: string;
        path: string;
        assets: string[];
        fees?: number;
        title?: string;
        description?: string;
        display?: string;
        interval?: string;
        url?: string;
        createdAt: string;
        type: string;
        quantity: number;
    };
}

export interface StackData {
    data: Stack[];
    limit: number;
    page: number;
    total: number;
    totalPage: number;
}
