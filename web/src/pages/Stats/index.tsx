import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { parseISO, formatRelative } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import Header from '../../components/Header';

import ShortenerService, { ShortenerResponse } from '../../services/shortenerService';

import { StatsContainer, StatsRow, StatsBox, StatsBoxTitle } from './styles';

type RouteParams = {
    code: string
}

export default function Stats() {
    const params = useParams<RouteParams>();

    const [message, setMessage] = useState<string>("");
    const [relativeDate, setRelativeDate] = useState<string>("");
    const [stats, setStats] = useState<ShortenerResponse>();

    useEffect(() => {
        (async function getStats() {
            try {
                let result = await ShortenerService.getStats(params.code);

                const parsedDate = parseISO(result.updatedAt);
                const currentDate = new Date();

                const formatRelativeDate = formatRelative(parsedDate, currentDate, {
                    locale: ptBR
                });

                setStats(result);
                setRelativeDate(formatRelativeDate);
            } catch (error) {
                setMessage("URL doesn't exist.");
            }
        })();
    }, [params.code])

    return (
        <Container>
            <Header>Statistics:</Header>
            { message ? (
                <StatsContainer className="text-center">
                    <FontAwesomeIcon size="3x" color="#f8d7da" icon="exclamation-triangle" />
                    <p className="m-3">{message}</p>
                    <a className="btn btn-primary" href="/">Shorten URL</a>
                </StatsContainer>
            ) : (
                <>
                    { stats && ( 
                        <StatsContainer className="text-center">
                            <p><b>{stats.urlShorten}</b></p>
                            <p>Redirect to: <br />{stats.url}</p>
                            <StatsRow>
                                <StatsBox>
                                    <b>{stats.hits}</b>
                                    <StatsBoxTitle>Visits</StatsBoxTitle>
                                </StatsBox>
                                <StatsBox>
                                    <b>{relativeDate}</b>
                                    <StatsBoxTitle>Last visit</StatsBoxTitle>
                                </StatsBox>
                            </StatsRow>
                            <a className="btn btn-primary" href="/">Shorten URL</a>
                        </StatsContainer>
                    )}
                </>
            ) }
        </Container>
    );
}