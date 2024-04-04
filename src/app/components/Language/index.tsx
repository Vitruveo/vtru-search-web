import React from 'react';
import { Avatar, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { useSelector, useDispatch } from '@/store/hooks';
import { Stack } from '@mui/system';
import { setLanguage } from '@/features/customizer/slice';
import { useI18n } from '@/app/hooks/useI18n';

const Language = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const customizer = useSelector((state) => state.customizer);
    const { language } = useI18n();

    const texts = {
        portuguesePTBR: language['studio.languages.portuguesePTBR'],
        englishUS: language['studio.languages.englishUS'],
        spanish: language['studio.languages.spanishES'],
        farsi: language['studio.languages.farsiFA'],
        russian: language['studio.languages.russianRU'],
    } as { [key: string]: string };

    const Languages = [
        {
            flagname: texts.englishUS,
            icon: '/images/flag/icon-flag-en-us.png',
            value: 'en_US',
        },
        {
            flagname: texts.portuguesePTBR,
            icon: '/images/flag/icon-flag-br.png',
            value: 'pt_BR',
        },
        {
            flagname: texts.spanish,
            icon: '/images/flag/icon-flag-es-ES.png',
            value: 'es_ES',
        },
        {
            flagname: texts.farsi,
            icon: '/images/flag/iran-old-flag.jpg',
            value: 'fa_IR',
        },
        {
            flagname: texts.russian,
            icon: '/images/flag/icon-flag-ru.png',
            value: 'ru_RU',
        },
    ];

    const currentLang = Languages.find((_lang) => _lang.value === customizer.currentLanguage) || Languages[1];

    const dispatch = useDispatch();

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <Avatar src={currentLang.icon} alt={currentLang.value} sx={{ width: 35, height: 35 }} />
            </IconButton>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                sx={{
                    '& .MuiMenu-paper': {
                        width: '200px',
                    },
                }}
            >
                {Languages.map((option, index) => (
                    <MenuItem key={index} sx={{ py: 2, px: 3 }} onClick={() => dispatch(setLanguage(option.value))}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Avatar src={option.icon} alt={option.icon} sx={{ width: 25, height: 25 }} />
                            <Typography> {option.flagname}</Typography>
                        </Stack>
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default Language;
