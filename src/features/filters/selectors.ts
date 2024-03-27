import type { AppState } from '@/store/index';
import { FilterSliceState } from './types';

/**
 * Returns a field selector function for the user slice of the Redux state.
 * The field selector function allows selecting specific fields from the user slice.
 *
 * @template T - The type of fields to select from the user slice.
 * @param {T[]} fields - An array of field names to select from the user slice.
 * @returns {FieldSelector<Pick<FilterSliceState, T>>} - The field selector function.
 */

export const userSelector = <T extends keyof FilterSliceState>(fields: T[]) => {
    return (state: AppState): Pick<FilterSliceState, T> => {
        const selectedFields = {} as Pick<FilterSliceState, T>;

        fields.forEach((field) => {
            selectedFields[field] = state.user[field];
        });

        return selectedFields;
    };
};
