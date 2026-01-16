import mongoose from "mongoose";

type ConnectionObject = {
	isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
	// If DB is already connected.
	if (connection.isConnected) {
		console.log("Using existing connection");
		return;
	}

	// Make a connection.
	try {
		const db = await mongoose.connect(process.env.MONGODB_URI as string);
		connection.isConnected = db.connections[0].readyState;
		console.log("New connection created");
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
}

export default dbConnect;
