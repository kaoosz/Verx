import express from "express";
import produtorRoutes from './src/routes/produtorRoutes';
import farmRoutes from './src/routes/farmRoutes';
import dashboardRoutes from './src/routes/dashboardRoutes';

export const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(produtorRoutes);
app.use(farmRoutes);
app.use(dashboardRoutes);
