export interface APIResponse<T = unknown, E = unknown> {
    code: string;
    transaction: string;
    message: string;
    data?: T;
    args?: E;
}

export interface Framework {
    createdAt: Date | null;
    updatedAt: Date | null;
    createdBy: string | null;
    updatedBy: string | null;
}

export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends (infer U)[]
        ? DeepPartial<U>[]
        : T[P] extends readonly (infer U)[]
          ? readonly DeepPartial<U>[]
          : DeepPartial<T[P]>;
};
