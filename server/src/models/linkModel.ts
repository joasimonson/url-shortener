import Sequelize, { Model, Optional } from 'sequelize';

import database from '../database';
import { Link } from './link';

interface ILinkCreationAttributes extends Optional<Link, "id"> {}

export interface ILinkModel extends Model<Link, ILinkCreationAttributes>, Link {}

const LinkModel = database.define<ILinkModel>('link', {
    id:	{
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey:	true,
        autoIncrement: true,
        allowNull: false
    },
    url: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    code: {
        type: Sequelize.STRING(20),
        unique: true,
        allowNull: false
    },
    urlShorten: {
        type: Sequelize.STRING(255),
        unique: true,
        allowNull: false
    },
    hits: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0
    },
});

export default LinkModel;