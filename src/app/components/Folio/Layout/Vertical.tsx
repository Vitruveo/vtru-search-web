import { PopupAnimation } from '../animations';
import {
    BackgroundOverlay,
    MediaRenderer,
    LayoutContainer,
    QRCode,
    CreatorInformation,
    Description,
} from '../components';
import { LayoutInterface } from '../types';
import { buildAssetURL } from '../utils';

export const VerticalLayout = ({
    avatar,
    username,
    title,
    image,
    QRCodeValue,
    preAsset,
    preAvatar,
    display,
    alternativeSetting,
    hasStack,
}: LayoutInterface) => {
    const assetSrc = buildAssetURL(image);

    const FooterContent = () => (
        <footer
            className={`h-[20%] flex gap-8 p-0 bg-[rgba(0,0,0,0.67)] justify-center ${hasStack ? 'small:hidden' : ''}`}
            style={{
                maxWidth: '100%',
                maxHeight: '100%',
            }}
        >
            <div className="flex items-center justify-between w-full p-2">
                <PopupAnimation key={Date.now() + 1}>
                    <CreatorInformation
                        className="max-w-[18vw] self-center"
                        username={username}
                        avatar={avatar}
                        preAvatar={preAvatar}
                    />
                </PopupAnimation>

                <div className="flex flex-col gap-2">
                    <Description description={title} />
                </div>

                <PopupAnimation key={Date.now() + 2}>
                    <QRCode value={QRCodeValue} windowOrientation="vertical" />
                </PopupAnimation>
            </div>
        </footer>
    );

    return (
        <LayoutContainer>
            <img src={preAsset} alt="pre-asset" style={{ display: 'none' }} />

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '3.704%',
                    gap: '2%',
                    width: '100%',
                }}
            >
                {display === 'left/up' ? (
                    <FooterContent />
                ) : (
                    display === 'alternate' && alternativeSetting % 2 === 0 && <FooterContent />
                )}
                <main
                    className="flex justify-center items-center w-full h-full m-0 p-0"
                    style={{
                        maxWidth: '100%',
                        maxHeight: '80%',
                    }}
                >
                    <PopupAnimation className="h-full relative" key={Date.now()}>
                        <MediaRenderer src={assetSrc} />
                        <BackgroundOverlay src={assetSrc} />
                    </PopupAnimation>
                </main>
                {display === 'right/down' ? (
                    <FooterContent />
                ) : (
                    display === 'alternate' && alternativeSetting % 2 !== 0 && <FooterContent />
                )}
            </div>
        </LayoutContainer>
    );
};
