import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express.json()); 
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const uri = process.env.DB_URI;

if (!uri) {
    throw new Error("L'URI de la base de données n'est pas définie dans les variables d'environnement.");
}

let db: any; 

//connexion mongodb
MongoClient.connect(uri)
  .then(client => {
    db = client.db("test"); 
    console.log("Connecté à la base de données MongoDB");

    app.listen(port, () => {
      console.log(`Service de cuisine en marche sur http://localhost:${port}`);
    });
  })
  .catch(error => console.error("Erreur de connexion à MongoDB:", error));

app.post('/orders', async (req: Request, res: Response) => {
    const order = { id: Date.now(), status: 'en préparation' };
    try {
        const collection = db.collection("orders");
        await collection.insertOne(order);
        res.status(201).json(order);
    } catch (error) {
        res.status(500).send("Erreur lors de l'ajout de la commande");
    }
});

app.patch('/orders/:id', async (req: any, res: any) => {
//app.patch('/orders/:id', async (req: Request<{ id: string }, { status: string }>, res: Response) => {
    const orderId = parseInt(req.params.id);
    const { status } = req.body;

    if (typeof status !== 'string') {
        return res.status(400).json({ error: "Le statut doit être une chaîne de caractères" });
    }

    try {
        const collection = db.collection("orders");
        const result = await collection.updateOne({ id: orderId }, { $set: { status } });

        if (result.matchedCount === 0) {
            return res.status(404).send('Commande non trouvée');
        }

        res.json({ id: orderId, status });
    } catch (error) {
        console.error("Erreur lors de la mise à jour de la commande :", error);
        res.status(500).send("Erreur lors de la mise à jour de la commande");
    }
});

app.get('/orders', async (req: Request, res: Response) => {
    try {
        const collection = db.collection("orders");
        const orders = await collection.find().toArray();
        res.json(orders);
    } catch (error) {
        res.status(500).send("Erreur lors de la récupération des commandes");
    }
});