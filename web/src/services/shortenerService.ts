import api from './api';

async function getLink(code: string) {
    const result = await api.get(`links/${code}`);

    return result.data;
}

async function getStats(code: string) {
    const result = await api.get(`links/${code}/stats`);

    return result.data;
}

async function generate(url: string) {
    const result = await api.post('links', url);

    return result.data;
}

export default {
    getLink,
    getStats,
    generate,
}