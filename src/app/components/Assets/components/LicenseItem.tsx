import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { useDispatch, useSelector } from '@/store/hooks';
import { actions } from '@/features/filters/slice';

export const LicenseItem = () => {
    const dispatch = useDispatch();
    const { licenseChecked } = useSelector((state) => state.filters);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(actions.changeLicenseChecked(event.target.value));
    };

    return (
        <FormControl>
            <RadioGroup value={licenseChecked} onChange={handleChange}>
                <FormControlLabel value="nft" control={<Radio />} label="NFT" />
                <FormControlLabel value="nft auto" control={<Radio />} label="NFT – Auto-stake" />
            </RadioGroup>
        </FormControl>
    );
};
