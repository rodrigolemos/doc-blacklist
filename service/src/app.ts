// import { getServerConnection } from './config/database';
import app from './server';

// getServerConnection();

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`App running on port ${port}`));
