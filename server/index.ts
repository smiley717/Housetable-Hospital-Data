import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import * as bodyParser from "body-parser";
import env from "./env";
import router from "./routes";

const pgSession = connectPgSimple(session);

const isDev = env.NODE_ENV !== "production";
const PORT = env.PORT || 5000;

const app = express();

app.use(( req, res, next ) => {
	if (req.get("X-Forwarded-Proto") === "http") {
		res.redirect(301, `https://${req.headers.host}${req.url}`);
		return;
	}
	if (req.get("host").startsWith("www")) {
		res.redirect(301, `${env.CLIENT_ORIGIN}${req.url.slice(1)}`); //omit the forward slash from the req url because origin includes trailing forward slash
		return;
	}
	next();
});

if (isDev) {
	app.use(
		cors({
			origin: "http://localhost:3000",
			credentials: true,
		})
	);
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(
	session({
		store: new pgSession(),
		secret: env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 30 * 24 * 60 * 60 * 1000,
		},
	})
);

app.use("/api", router);

app.listen(PORT, function () {
	console.log(`Node server listening on port ${PORT}`);
});
