import { Box, Button, CircularProgress, Link, Modal, Typography } from '@mui/material';
import { IconCreativeCommonsBy, IconCreativeCommonsNc, IconCreativeCommonsNd } from '@tabler/icons-react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    actions: {
        downloadMedia: () => void;
    };
    data: {
        loading: boolean;
    };
}

export default function ModalTermDownload({ isOpen, onClose, actions, data }: Props) {
    const { downloadMedia } = actions;
    const { loading } = data;

    return (
        <Modal open={isOpen} onClose={onClose} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
                width={'50vw'}
                height={'70vh'}
                p={2}
                bgcolor={'background.paper'}
            >
                <Typography variant="h2">Terms of use to Download</Typography>
                <Box
                    sx={{
                        overflowY: 'auto',
                        '&::-webkit-scrollbar': {
                            width: '8px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: '#888',
                            borderRadius: '4px',
                        },
                    }}
                    display={'flex'}
                    flexDirection={'column'}
                    gap={8}
                    width={'50vw'}
                    height={'70vh'}
                    p={4}
                >
                    <Box>
                        <Typography variant="h4" fontWeight={'bold'}>
                            You are free to:
                        </Typography>
                        <Box display={'flex'} flexDirection={'column'} gap={6} mt={4}>
                            <Typography variant="h6" pl={6}>
                                <strong>Share</strong> — copy and redistribute the material in any medium or format
                            </Typography>
                            <Typography variant="h6" pl={6}>
                                The licensor cannot revoke these freedoms as long as you follow the license terms.
                            </Typography>
                        </Box>
                    </Box>
                    <Box>
                        <Typography variant="h4" fontWeight={'bold'}>
                            Under the following terms:
                        </Typography>
                        <Box display={'flex'} flexDirection={'column'} mt={2}>
                            <Box display={'flex'} alignItems={'center'} gap={2} pl={6}>
                                <IconCreativeCommonsBy size={135} />
                                <Typography variant="h6">
                                    <strong>Attribution</strong> — You must give{' '}
                                    <Link
                                        href="https://creativecommons.org/licenses/by-nc-nd/4.0/#ref-appropriate-credit"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        appropriate credit
                                    </Link>
                                    , provide a link to the license, and{' '}
                                    <Link
                                        href="https://creativecommons.org/licenses/by-nc-nd/4.0/#ref-indicate-changes"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        indicate if changes were made
                                    </Link>
                                    . You may do so in any reasonable manner, but not in any way that suggests the
                                    licensor endorses you or your use.
                                </Typography>
                            </Box>
                            <Box display={'flex'} alignItems={'center'} gap={2} pl={6} mb={4}>
                                <IconCreativeCommonsNc size={60} />
                                <Typography variant="h6">
                                    <strong>NonCommercial</strong> — You may not use the material for{' '}
                                    <Link
                                        href="https://creativecommons.org/licenses/by-nc-nd/4.0/#ref-commercial-purposes"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        commercial purposes
                                    </Link>
                                    .
                                </Typography>
                            </Box>
                            <Box display={'flex'} alignItems={'center'} gap={2} pl={6}>
                                <IconCreativeCommonsNd size={68} />{' '}
                                <Typography variant="h6">
                                    <strong>NoDerivatives</strong> — If you{' '}
                                    <Link
                                        href="https://creativecommons.org/licenses/by-nc-nd/4.0/#ref-some-kinds-of-mods"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        remix, transform, or build upon
                                    </Link>{' '}
                                    the material, you may not distribute the modified material.
                                </Typography>
                            </Box>
                            <Box display={'flex'} alignItems={'center'} gap={2} pl={6}>
                                <IconCreativeCommonsNd size={100} style={{ opacity: 0 }} />{' '}
                                <Typography variant="h6">
                                    <strong>No additional restrictions</strong> — You may not apply legal terms or{' '}
                                    <Link
                                        href="https://creativecommons.org/licenses/by-nc-nd/4.0/#ref-technological-measures"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        technological measures
                                    </Link>{' '}
                                    that legally restrict others from doing anything the license permits.
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box>
                        <Typography variant="h4" fontWeight={'bold'}>
                            Notices:
                        </Typography>
                        <Box display={'flex'} flexDirection={'column'} gap={6} mt={4}>
                            <Typography variant="h6" pl={6}>
                                You do not have to comply with the license for elements of the material in the public
                                domain or where your use is permitted by an applicable{' '}
                                <Link
                                    href="https://creativecommons.org/licenses/by-nc-nd/4.0/#ref-exception-or-limitation"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    exception or limitation
                                </Link>
                                .
                            </Typography>
                            <Typography variant="h6" pl={6}>
                                No warranties are given. The license may not give you all of the permissions necessary
                                for your intended use. For example, other rights such as{' '}
                                <Link
                                    href="https://creativecommons.org/licenses/by-nc-nd/4.0/#ref-publicity-privacy-or-moral-rights"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    publicity, privacy, or moral rights
                                </Link>{' '}
                                may limit how you use the material.
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Box display={'flex'} gap={4} marginTop={2} width={'100%'} justifyContent={'end'}>
                    <Button variant="outlined" color="primary" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={downloadMedia}
                        disabled={loading}
                        sx={{ minWidth: 260 }}
                    >
                        {!loading ? 'Accept terms and Download Media' : <CircularProgress size={20} />}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}
