// import { Helmet } from 'react-helmet';
import { Helmet, HelmetProvider } from 'react-helmet-async';

type Props = {
    description?: string;
    children: JSX.Element | JSX.Element[];
    title?: string;
    icon: string | null;
};

const PageContainer = ({ title, description, icon = null, children }: Props) => {
    return (
        <HelmetProvider>
            <div>
                <Helmet>
                    <title>{title}</title>
                    <meta name="description" content={description} />
                    <link rel="icon" href={icon || '../../../../public/images/logos/favicon.ico'} />
                </Helmet>
                {children}
            </div>
        </HelmetProvider>
    );
};

export default PageContainer;
