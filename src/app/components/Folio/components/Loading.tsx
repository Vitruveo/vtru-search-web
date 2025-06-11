import { HueAnimation } from '../animations';

export const Loading = () => {
    return (
        <div className="h-screen w-full bg-black grid place-items-center">
            <HueAnimation>
                <img src="/images/logos/XIBIT-logo_dark.png" alt="Loading..." />
            </HueAnimation>
        </div>
    );
};
