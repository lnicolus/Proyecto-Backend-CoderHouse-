import { Router } from "express";
import { getProducts, getProduct, deleteProduct, addProduct, updateProduct} from '../handler/handler.js';

const router = Router();

router.get('/', (req, res) => {
    res.send('Server en linea')
});

router.get('/products', (req, res) => {
    let products = getProducts();
    res.render('products', {products});
});


router.get('/products/:id', async (req, res) => {
    const id = req.params.id;
    let product = getProduct(id);
    res.send(product);
});

router.post('/products', (req, res) => {
    let newProduct = addProduct(req.body);
    res.redirect('/api/products');
});

router.put('/products/:id', (req, res) => {
    const id = req.params.id;
    let newProduct = req.body;
    let product = updateProduct(id, newProduct);
    res.send(product);
});

router.delete('/products/:id',  (req, res) => {
    const id = req.params.id;
    let product =  deleteProduct(id);
    res.send(product);
});

export default router;