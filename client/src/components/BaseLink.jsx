import { Link } from 'react-router-dom';

import { styled } from '@mui/material/styles';

const BaseLink = styled(Link)(() => ({
    textDecoration: 'none',
    color: 'inherit',
}));

export default BaseLink;
