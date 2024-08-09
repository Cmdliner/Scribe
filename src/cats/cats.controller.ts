import { Controller, Get, Header, Param, Post, Req, Res } from '@nestjs/common';
import { randomUUID } from 'crypto';
import type { Request, Response } from 'express';

@Controller('cats')
export class CatsController {
    private static cats = ["Tabby", "Fluffy", "Tommy", "Ginger Ball", "Whiskers", "Furnelia"];
    @Get()
    findAll(@Req() req: Request, @Res({passthrough: true}) res: Response) {
        console.log(req.hostname);
        res.status(201).json(CatsController.cats);
    }

 
    @Header('cat_id', `${randomUUID()}`)
    @Post('new')
    create() {
        CatsController.cats.push('new cat');
        return CatsController.cats;
    }

    @Get('M*n')
    something() {
        return "Yeah, you used the right wild card!"
    }

    @Get(':id')
    getSingleCat(@Param() params: string[]) {
        const id = params['id'];
        return `${CatsController.cats.length} - ${CatsController.cats[id]}`
    }
}