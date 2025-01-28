const config = require("./config");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const documentRoutes = require("./routes/documentRoutes");
const errorHandler = require("./errorHandler");
const smartcontractRoutes = require("./routes/smartcontractRoute");

const app = config.express();
const port = config.port;

app.use(config.bodyParser.json());

app.use(authRoutes);
app.use(userRoutes);
app.use(documentRoutes);
app.use(smartcontractRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
