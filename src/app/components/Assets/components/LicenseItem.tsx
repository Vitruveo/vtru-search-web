import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';

interface Props {
    licenseChecked: string;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const LicenseItem = ({ handleChange, licenseChecked }: Props) => {
    return (
        <FormControl>
            <RadioGroup value={licenseChecked} onChange={handleChange}>
                <FormControlLabel value="nft" control={<Radio />} label="NFT" />
                <FormControlLabel value="nft auto" control={<Radio />} label="NFT – Auto-stake" />
            </RadioGroup>
        </FormControl>
    );
};
