import db from '../database/index.js';

const Materiel = db.Materiel;

export const createMateriel = async (req, res) => {
    try {
        
        const { designation, etat, quantite } = req.body;
        if (!designation || !etat || quantite === undefined) {
            return res.status(400).json({ error: "Please make sure to fill in all required fields" });
        }

        const materiel = await Materiel.create(req.body);
        res.status(201).json(materiel);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const fetchMateriel = async (req, res) => {
    try {
        const materiel = await Materiel.findAll();
        res.status(200).json(materiel);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const modifyMateriel = async (req, res) => {
    try {
        const { id, ...updateData } = req.body;

        if (!id) {
            return res.status(400).json({ error: "Missing ID in the request" });
        }

        const [nbUpdated] = await Materiel.update(updateData, {
            where: { id }
        });

        if (nbUpdated === 0) {
            return res.status(404).json({ error: "No equipment found with this ID" });
        }

        res.status(200).json({ success: "Equipment updated successifully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteMateriel = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ error: "Missing ID in the request" });
        }

        const nbDeleted = await Materiel.destroy({
            where: { id }
        });

        if (nbDeleted === 0) {
            return res.status(404).json({ error: "No equipment found with this ID" });
        }

        res.status(200).json({ success: "Equipment deleted successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const stat = async (req, res) => {
    try {
        const total = await Materiel.count();

        const bon = await Materiel.count({
            where: {
                etat: 'bon'
            }
        });
        const mauvais = await Materiel.count({
            where: {
                etat: 'mauvais'
            }
        });
        const abime = await Materiel.count({
            where: {
                etat: 'abimé'
            }
        });

        res.status(200).json({
            total,
            etat: {
                Bon : bon,
                Mauvais : mauvais,
                Abimé : abime
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}