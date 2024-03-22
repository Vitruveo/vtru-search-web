// import { Helmet } from 'react-helmet';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { FooterForm, FooterFormProps } from '../footerForm';

type Props = {
    maxHeight?: string;
    description?: string;
    children: JSX.Element | JSX.Element[];
    title?: string;
    submitText?: string;
} & FooterFormProps;

const PageContainerFooter = ({
    title,
    maxHeight,
    description,
    submitText,
    children,
    stepNumber,
    backOnclick,
    backPathRouter,
    saveOnClick,
    submitDisabled,
}: Props) => (
    <FooterForm
        maxHeight={maxHeight}
        stepNumber={stepNumber}
        submitText={submitText}
        backPathRouter={backPathRouter}
        submitDisabled={submitDisabled}
        backOnclick={backOnclick}
        saveOnClick={saveOnClick}
    >
        <HelmetProvider>
            <div>
                <Helmet>
                    <title>{title}</title>
                    <meta name="description" content={description} />
                </Helmet>
                {children}
            </div>
        </HelmetProvider>
    </FooterForm>
);

export default PageContainerFooter;
