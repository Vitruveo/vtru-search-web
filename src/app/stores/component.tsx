import { useDispatch, useSelector } from '@/store/hooks';
import PageContainer from '../components/Container/PageContainer';
import Header from '../components/Header';
import Stores from '../components/Stores/storesGrid/storesList';
import { useCallback, useMemo, useState } from 'react';
import { SingleValue } from 'react-select';
import { actions } from '@/features/stores';

const Component = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.stores.paginated);

    const [selectValues, setSelectValues] = useState({
        limit: { value: '25', label: '25' },
        page: { value: '1', label: '1' },
        sort: { value: 'newToOld', label: 'latest' },
    });

    const optionsForSelectPage = useMemo(() => {
        const options: { value: string; label: string }[] = [];
        for (let i = 1; i <= data.totalPage; i++) {
            options.push({ value: i.toString(), label: i.toString() });
        }
        return options;
    }, [data.totalPage]);

    const onChangeLimit = useCallback((e: SingleValue<{ value: string; label: string }>) => {
        dispatch(actions.setLimit(Number(e!.value)));
        setSelectValues((prev) => ({ ...prev, limit: { value: e!.value, label: e!.label } }));
    }, []);

    const onChangePage = useCallback((e: SingleValue<{ value: string; label: string }>) => {
        dispatch(actions.setPage(Number(e!.value)));
        setSelectValues((prev) => ({ ...prev, page: { value: e!.value, label: e!.label } }));
    }, []);

    const onChangeSort = useCallback((e: SingleValue<{ value: string; label: string }>) => {
        dispatch(actions.setSort(e!.value));
        setSelectValues((prev) => ({ ...prev, sort: { value: e!.value, label: e!.label } }));
    }, []);

    return (
        <PageContainer title="Stores">
            <>
                <Header rssOptions={[]} />
                <Stores
                    data={{
                        stores: {
                            data: data.list,
                            total: data.total,
                            totalPage: data.totalPage,
                            page: data.page,
                            limit: data.limit,
                        },
                        selectValues,
                        optionsForSelectPage,
                    }}
                    actions={{ onChangeSort, onChangePage, onChangeLimit }}
                />
            </>
        </PageContainer>
    );
};

export default Component;
