import React from 'react';
import { HeaderContainer, Logo } from './styles';

import Icon from '../../assets/icon.png';

const Header: React.FC = (props) => {
    return (
        <HeaderContainer>
            <Logo src={Icon} alt='URL Shortener' />
            <h1></h1>
            <p>{props.children}</p>
        </HeaderContainer>
    );
}

export default Header;