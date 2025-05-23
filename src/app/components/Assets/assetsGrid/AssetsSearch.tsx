// material
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { IconSearch } from '@tabler/icons-react';

// redux
import { useDispatch } from '@/store/hooks';

// ----------------------------------------------------------------------
export default function ProductSearch() {
    const dispatch = useDispatch();

    return (
        <TextField
            id="outlined-search"
            placeholder="Search Asset"
            size="small"
            type="search"
            variant="outlined"
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <IconSearch size="14" />
                    </InputAdornment>
                ),
            }}
            fullWidth
        />
    );
}
