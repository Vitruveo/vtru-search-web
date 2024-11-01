import { useEffect, useState } from 'react';
import { convertFromRaw, convertToRaw, Editor, EditorState } from 'draft-js';
import { Typography } from '@mui/material';

interface DescriptionProps {
    data?: string;
}
export default function Description({ data }: DescriptionProps) {
    const [displayText, setDisplayText] = useState<string | EditorState>('');

    useEffect(() => {
        if (!data) return;
        try {
            const rawContent = JSON.parse(data);
            const content = convertFromRaw(rawContent);
            const editorState = EditorState.createWithContent(content);
            const raw = convertToRaw(content);
            if (raw.blocks[0].text.length === 0) {
                setDisplayText('');
                return;
            }
            setDisplayText(editorState);
        } catch (error) {
            setDisplayText(data);
        }
    }, []);

    return (
        <Typography>
            {displayText instanceof EditorState ? (
                <Editor editorState={displayText} readOnly={true} onChange={() => {}} />
            ) : (
                <Typography variant="body1" sx={{ wordWrap: 'break-word' }}>
                    {displayText}
                </Typography>
            )}
        </Typography>
    );
}
