import Server from "./classes/Server";
import IndexRoute from "./routes/Index.route";
const app = new Server(process.env.PORT || 8080);

const index = new IndexRoute(app.getRoutes());
app.addRoute("/", index.router);

app.start();
