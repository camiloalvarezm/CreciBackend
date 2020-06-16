//puerto servidor

process.env.PORT = process.env.PORT || 3000;

//base de datos
process.env.URLDB =
  "mongodb+srv://camilo:ASVNgr6fnAPWaAeL@cluster0-h3bvk.mongodb.net/creci";

//seed token
process.env.SEED = "prueba-creci";

//caducidad token
process.env.CADUCIDAD_TOKEN = "1h";
