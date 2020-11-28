import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Header from '../../components/Header';

import ShortenerService from '../../services/shortenerService';

import { RedirectContainer } from './styles';

type RouteParams = {
    code: string
}

export default function Redirect() {
    const params = useParams<RouteParams>();

    const [message, setMessage] = useState<string>("");
    
    useEffect(() => {
        (async function getStats() {
            try {
                const result = await ShortenerService.getLink(params.code);

                window.location.href = result.url;
            } catch (error) {
                setMessage("URL doesn't exist.");
            }
        })();
    }, [])

    return (
        <Container>
            <Header />
            { message ? (
                <RedirectContainer className="text-center">
                    <FontAwesomeIcon size="3x" color="#f8d7da" icon="exclamation-triangle" />
                    <p className="m-3">{message}</p>
                    <a className="btn btn-primary" href="/">Shorten URL</a>
                </RedirectContainer>
            ) : (
                <p className="text-center">Redirecting...</p>
            ) }
        </Container>
    );
}