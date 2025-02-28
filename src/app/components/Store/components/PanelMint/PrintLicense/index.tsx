import { Box, Modal } from '@mui/material';
import { PanelMintProps } from '../component';
import Shop from './shop';
import Details from './detail';
import Checkout from './checkout';
import { useSelector } from '@/store/hooks';

interface PrintLicenseModalPropsType extends PanelMintProps {}

const PrintLicenseModal = (props: PrintLicenseModalPropsType) => {
    const selectedProduct = useSelector((state) => state.ecommerce.selectedProduct);
    const checkoutInProgress = useSelector((state) => state.ecommerce.checkoutInProgress);

    return (
        <Modal
            sx={{ height: '100vh', zIndex: 9999 }}
            open={props.data.stateModalPrintLicense}
            onClose={props.actions.handleCloseModalPrintLicense}
        >
            <Box>
                {checkoutInProgress ? <Checkout /> : selectedProduct ? <Details {...props} /> : <Shop {...props} />}
            </Box>
        </Modal>
    );
};

export default PrintLicenseModal;
