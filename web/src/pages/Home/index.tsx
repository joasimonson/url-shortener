import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Container, InputGroup, FormControl, Button, Alert, Spinner } from 'react-bootstrap';

import Header from '../../components/Header';

import ShortenerService from '../../services/shortenerService';

import { ContentContainer, Form, AdsBlock } from './styles';

export default function Home() {
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [url, setUrl] = useState<string>("");
    const [urlShorten, setUrlShorten] = useState<string>("");

    function handleSetUrl(event: ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setUrl(value);
    }

    function handleCopyLink() {
        navigator.clipboard.writeText(urlShorten);
    }

    async function handleSubmit(event: FormEvent<HTMLElement>) {
        event.preventDefault();

        let msg = '', urlResult = '';

        setLoading(true);

        if (!url) {
            msg = "URL is required to shorten.";
        } else {
            try {
                const result = await ShortenerService.generate(url);

                urlResult = result.urlShorten;
                msg = "URL shortened successfully.";
            } catch (error) {
                msg = "Error ocurred to shorten URL.";
            }
        }

        setLoading(false);
        setMessage(msg);
        setUrlShorten(urlResult);
    }

    return (
        <Container>
            <Header>A new URL Shortener</Header>
            <ContentContainer>
                <Form onSubmit={handleSubmit}>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="URL to shorten"
                            defaultValue={url}
                            onChange={handleSetUrl}
                        />
                        <InputGroup.Append>
                            <Button variant="primary" type="submit" disabled={loading}>Shorten</Button>
                        </InputGroup.Append>
                    </InputGroup>
                    { loading ? (
                        <Spinner animation="border" />
                    ) : (
                        <>
                            { message &&
                                <>
                                    <Alert variant={urlShorten ? "success" : "danger"}>{message}</Alert>
                                    { urlShorten &&
                                        <>
                                            <a href={urlShorten}>{urlShorten}</a>
                                            <br />
                                            <Button variant="outline-secondary" onClick={handleCopyLink}>Copy</Button>
                                            <br />
                                            <p>Track statistics: {urlShorten + '/stats'}</p>
                                        </>
                                    }
                                </>
                            }
                        </>
                    ) }
                </Form>
            </ContentContainer>
            <ContentContainer>
                <AdsBlock>Adsense</AdsBlock>
            </ContentContainer>
        </Container>
    );
}