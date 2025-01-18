"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = process.env.PORT || 3000;
app.use(body_parser_1.default.json());
const uri = process.env.DB_URI;
if (!uri) {
    throw new Error("L'URI de la base de données n'est pas définie dans les variables d'environnement.");
}
let db; 

//connexion mongdb
mongodb_1.MongoClient.connect(uri)
    .then(client => {
    db = client.db("test"); 
    console.log("Connecté à la base de données MongoDB");
    app.listen(port, () => {
        console.log(`Service de cuisine en marche sur http://localhost:${port}`);
    });
})
    .catch(error => console.error("Erreur de connexion à MongoDB:", error));
//reception commande
app.post('/orders', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = { id: Date.now(), status: 'en préparation' };
    try {
        const collection = db.collection("orders");
        yield collection.insertOne(order);
        res.status(201).json(order);
    }
    catch (error) {
        res.status(500).send("Erreur lors de l'ajout de la commande");
    }
}));
app.patch('/orders/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = parseInt(req.params.id);
    const { status } = req.body;
    if (typeof status !== 'string') {
        return res.status(400).json({ error: "Le statut doit être une chaîne de caractères" });
    }
    try {
        const collection = db.collection("orders");
        const result = yield collection.updateOne({ id: orderId }, { $set: { status } });
        if (result.matchedCount === 0) {
            return res.status(404).send('Commande non trouvée');
        }
        res.json({ id: orderId, status });
    }
    catch (error) {
        console.error("Erreur lors de la mise à jour de la commande :", error);
        res.status(500).send("Erreur lors de la mise à jour de la commande");
    }
}));
//obtention de toutes les commandes 
app.get('/orders', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const collection = db.collection("orders");
        const orders = yield collection.find().toArray();
        res.json(orders);
    }
    catch (error) {
        res.status(500).send("Erreur lors de la récupération des commandes");
    }
}));
