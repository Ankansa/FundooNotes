import { client } from "../config/redis"
import HttpStatus from 'http-status-codes';
export const redisData=async(req,res,next)=>{
        const value = await client.get("note");
        if(value){
            const data = JSON.parse(value);
            res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: data,
            message: 'All notes fetched successfully from redis data'
            });

    
        }else{
            next();
            }
        };

