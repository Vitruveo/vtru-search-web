import { QRCodeSVG } from 'qrcode.react';
import { IconCamera } from '@tabler/icons-react';

interface QRCodeProps {
    size?: number;
    value: string;
    windowOrientation: string;
}

export const QRCode = ({ size = 128, value, windowOrientation }: QRCodeProps) => {
    const logoSize = size * 0.15;

    return (
        <div className="flex flex-col gap-4 items-center mx-auto qrCode">
            <div className="flex items-center gap-2">
                <IconCamera color="white" size={windowOrientation === 'vertical' ? '3vw' : '1.8vw'} />
                <p style={{ whiteSpace: 'nowrap' }}>Scan QR Code</p>
            </div>
            <QRCodeSVG
                imageSettings={{
                    src: '/images/icons/xibit-icon-redondo-litemode.png',
                    height: logoSize,
                    width: logoSize,
                    excavate: true,
                }}
                value={value}
                bgColor="transparent"
                fgColor="white"
                className="w-full"
                width={'100%'}
                height={'100%'}
            />
        </div>
    );
};
