import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { dbConncet } from './config/db';
import { authRouter } from './features/auth/auth.route';
import employeeRouter from './features/employee/employee.route';
import { expenseRouter } from './features/expense/expense.route';
import productRouter from './features/production/production.route';
import cookieParser from 'cookie-parser';
import salesRouter from './features/sales/sales.routes';
import attendanceRouter from './features/attendance/attendance.route';
import salaryRouter from './features/salary/salary.route';
import overviewRouter from './features/overview/overview.routes';

const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));

app.use('/api/auth', authRouter);
app.use('/api/employee', employeeRouter);
app.use('/api/expense', expenseRouter);
app.use('/api/production', productRouter);
app.use('/api/sales', salesRouter);
app.use('/api/attendance', attendanceRouter);
app.use('/api/salary', salaryRouter);
app.use('/api/overview', overviewRouter);



app.get('/', (req,res)=>{
    res.send('Hello World');
})

const port = process.env.PORT || 5000;
app.listen(port, async()=>{
    await dbConncet();
    console.log('Server running at port:', port);
})