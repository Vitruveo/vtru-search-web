import { FormControl, FormControlLabel, Checkbox } from '@mui/material';

interface Props {
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    checkedItems: { nft: boolean; print: boolean };
}

export const LicenseItem = ({ checkedItems, handleChange }: Props) => {
    return (
        <FormControl>
            <FormControlLabel
                value="nft"
                control={<Checkbox checked={checkedItems.nft} onChange={handleChange} />}
                label="NFT"
            />
            <FormControlLabel
                value="print"
                control={<Checkbox checked={checkedItems.print} onChange={handleChange} />}
                label="Print"
            />
        </FormControl>
    );
};
