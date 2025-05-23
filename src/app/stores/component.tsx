import { useDispatch, useSelector } from '@/store/hooks';
import PageContainer from '../components/Container/PageContainer';
import Header from '../components/Header';
import Stores from '../components/Stores/storesGrid/storesList';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { SingleValue } from 'react-select';
import { actions } from '@/features/stores';
import { STORES_STORAGE_URL } from '@/constants/aws';

const Component = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.stores.paginated);
    const logo = useSelector((state) => state.stores.currentDomain?.organization?.formats?.logo?.square?.path);

    const [selectValues, setSelectValues] = useState({
        search: '',
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

    const onChangeSearch = useCallback((e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        dispatch(actions.setSearch(e!.target.value));
        setSelectValues((prev) => ({ ...prev, search: e!.target.value }));
    }, []);

    return (
        <PageContainer title="Stores" icon={logo ? `${STORES_STORAGE_URL}/${logo}` : null}>
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
                    actions={{ onChangeSort, onChangeSearch, onChangePage, onChangeLimit }}
                />
            </>
        </PageContainer>
    );
};

export default Component;
