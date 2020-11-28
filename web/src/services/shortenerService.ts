import api from './api';

export interface ShortenerResponse {
    id: number;
    url: string;
    code: string;
    urlShorten: string;
    hits?: number;
    updatedAt: string
}

async function getLink(code: string): Promise<ShortenerResponse> {
    const result = await api.get(`links/${code}`);

    return result.data as ShortenerResponse;
}

async function getStats(code: string): Promise<ShortenerResponse> {
    const result = await api.get(`links/${code}/stats`);

    return result.data as ShortenerResponse;
}

async function generate(url: string): Promise<ShortenerResponse> {
    const result = await api.post('links', { url });

    return result.data as ShortenerResponse;
}

export default {
    getLink,
    getStats,
    generate,
}