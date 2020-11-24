import { Request, Response } from 'express';
import { Link } from '../models/link';
import linksRepository from '../repositories/linksRepository';

function generateCode(): string {
    let text = '';
    const possibilities = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) {
        text += possibilities.charAt(Math.floor(Math.random() * possibilities.length));
    }

    return text;
}

async function post(req: Request, res: Response) {
    const link = req.body as Link;
    link.code = generateCode();
    link.hits = 0;

    const result = await linksRepository.add(link);

    if (!result.id) {
        return res.status(400);
    }

    link.id = result.id;

    return res.status(201).json(link);
}

async function get(req: Request, res: Response) {
    const code = req.params.code as string;
    const link = await linksRepository.findByCode(code);

    if (!link) {
        return res.sendStatus(404);
    }

    return res.json(link)
}

async function hit(req: Request, res: Response) {
    const code = req.params.code as string;
    const link = await linksRepository.hit(code);

    if (!link) {
        return res.sendStatus(404);
    }

    return res.json(link)
}

export default {
    post,
    get,
    hit,
}