import React from 'react';

import { Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function StackItem({ text, children }) {
    return (
        <Item>
            <Typography variant='h6'>{text}</Typography>
            <hr />
            {children}
        </Item>
    );
}

export default StackItem;
