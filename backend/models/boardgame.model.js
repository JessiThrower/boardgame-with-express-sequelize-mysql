module.exports = (sequelize, Sequelize) => {
    const Boardgame = sequelize.define("boardgame", {
        name: {
            type: Sequelize.STRING
        },
        type: {
            type: Sequelize.STRING
        },
        company: {
            type: Sequelize.STRING
        },
        players: {
            type: Sequelize.INTEGER
        },
        description: {
            type: Sequelize.STRING
        },
        year: {
            type: Sequelize.INTEGER
        },
        filename: {
            type: Sequelize.STRING
        }
    });

    return Boardgame;
};