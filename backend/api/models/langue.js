const mongoose = require('mongoose');

const langueSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nom: {
        type: String,

    },
    langue: {
        type: String,
    },
    niveauComprehension: {
        type: String,

    },
    niveauEcrit: {
        type: String,

    },
    niveauParler: {
        type: String,

    },

    created_at: Date,
    updated_at: Date
})
module.exports = mongoose.model('Langue', langueSchema);