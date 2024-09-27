export interface ResponseDashboard {
    creators: number;
    arts: number;
    consigned: number;
    activeConsigned: number;
    totalPrice: number;
    artsSold: number;
    averagePrice: number;
}

export interface DashboardState {
    loading: boolean;
    error: string | null;
    creators: number;
    arts: number;
    consigned: number;
    activeConsigned: number;
    totalPrice: number;
    artsSold: number;
    averagePrice: number;
}
