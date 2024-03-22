'use client';

import React from 'react';
import Link from 'next/link';
import Container from '@mui/material/Container';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useRouter } from 'next/navigation';
import { Box, Button, Stack, Theme, Typography, useTheme } from '@mui/material';
import { useSelector } from '@/store/hooks';
import { useI18n } from '@/app/hooks/useI18n';

export interface FooterFormProps {
    maxHeight?: string;
    submitText?: string;
    progress?: number;
    children?: React.ReactNode;
    submitDisabled?: boolean;
    backPathRouter?: string;
    stepNumber?: number;
    backOnclick?: () => void;
    saveOnClick?: () => void;
}

export function FooterForm({
    maxHeight,
    submitText,
    children,
    submitDisabled,
    backPathRouter,
    stepNumber,
    backOnclick,
}: FooterFormProps) {
    const theme = useTheme();

    const customizer = useSelector((state) => state.customizer);
    const router = useRouter();

    const { language } = useI18n();

    const texts = {
        thisStep: language['studio.footer.thisStep'],
        completed: language['studio.footer.completed'],
        inProgress: language['studio.footer.inProgress'],
        notYet: language['studio.footer.notYet'],
        step: language['studio.footer.step'],
        of: language['studio.footer.of'],
        save: language['studio.footer.save'],
        back: language['studio.footer.back'],
    } as { [key: string]: string };

    const handleBackClick = () => {
        if (backOnclick) {
            backOnclick();
        } else {
            if (backPathRouter) {
                router.push(backPathRouter);
            } else {
                router.back();
            }
        }
    };

    const lgUp = useMediaQuery((th: Theme) => th.breakpoints.up('lg'));

    return (
        <Box position="relative" display="flex" flexDirection="column">
            <Box flexGrow={1}>
                <Container
                    sx={{
                        maxWidth: customizer.isLayout === 'boxed' ? 'lg' : '100%!important',
                        height: maxHeight || (lgUp ? `calc(100vh - 150px)` : `calc(100vh - 140px)`),
                        overflowY: 'auto',
                        overflowX: 'hidden',
                    }}
                >
                    {children}
                </Container>
            </Box>

            <Stack marginTop="auto" position={lgUp ? 'sticky' : 'fixed'} bottom={0} right={0} width="100%">
                <Box
                    justifyContent="center"
                    boxSizing="border-box"
                    display="flex"
                    flexDirection="column"
                    flexGrow={1}
                    height={80}
                    bgcolor={'#EFEFEF'}
                >
                    {stepNumber ? (
                        <Box marginInline={4} display="flex" alignItems="center" justifyContent="space-between">
                            {stepNumber && (
                                <Typography flexDirection="row" fontWeight="400" fontSize="1.1rem">
                                    {texts.step} {stepNumber} {texts.of} 6
                                </Typography>
                            )}

                            <Stack direction="row" alignItems="center" spacing={4} flexDirection="row-reverse">
                                <Button
                                    size="large"
                                    disabled={submitDisabled}
                                    type="submit"
                                    style={{ marginLeft: '20px', whiteSpace: 'nowrap', minWidth: 120 }}
                                    color="primary"
                                    variant="contained"
                                >
                                    {submitText || 'Save'}
                                </Button>

                                <Button
                                    size="large"
                                    onClick={!backPathRouter ? handleBackClick : undefined}
                                    variant="text"
                                >
                                    <Typography variant="subtitle2" color="GrayText" className="text-hover">
                                        {texts.back}
                                    </Typography>
                                </Button>
                            </Stack>
                        </Box>
                    ) : (
                        <Stack
                            marginInline={4}
                            direction="row"
                            alignItems="center"
                            spacing={4}
                            flexDirection="row-reverse"
                        >
                            <Button
                                size="large"
                                disabled={submitDisabled}
                                type="submit"
                                style={{ width: 120, marginLeft: '20px' }}
                                color="primary"
                                variant="contained"
                            >
                                {submitText || texts.save}
                            </Button>

                            <Link href={backPathRouter || '/home'} className="hover-text-primary">
                                <Typography variant="subtitle2" color="GrayText" className="text-hover">
                                    {texts.back}
                                </Typography>
                            </Link>
                        </Stack>
                    )}
                </Box>
            </Stack>
        </Box>
    );
}
