import linkModel, { ILinkModel } from '../models/linkModel';
import { Link } from '../models/link';

async function findByCode(code: string) {
    return await linkModel.findOne<ILinkModel>({ where: { code} });
}

async function add(link: Link) {
    return await linkModel.create<ILinkModel>(link);
}

async function hit(code: string) {
    const link = await findByCode(code);

    if (!link) {
        return null;
    }

    link.hits!++;
    await link.save();
    return link;
}

export default {
    findByCode,
    add,
    hit,
}