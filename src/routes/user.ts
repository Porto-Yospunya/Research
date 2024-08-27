import express, { Request, Response, Router } from 'express';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
    res.send("Hello World");
})

module.exports = router;