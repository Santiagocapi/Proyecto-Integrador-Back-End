const { MongoClient, ObjectId } = require("mongodb");

async function conectarBaseDeDatos() {
  const uri =
    "mongodb+srv://scapitani:santi1234@cluster0.eyalsgt.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    console.log("Conexión a la base de datos establecida.");
    const database = client.db("musicEvents");
    return database.collection("Events");

  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
    throw error;
  }
}

async function obtenerEventoPorId(eventoId) {
  const eventosCollection = await conectarBaseDeDatos();
  const objectId = new ObjectId(eventoId);
  return eventosCollection.findOne({ _id: objectId });
}


module.exports = { conectarBaseDeDatos, obtenerEventoPorId };