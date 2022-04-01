import { Router } from "express";
import { displayProducts, displayProductById, addProduct, updateProductData, deleteProductById } from '../controllers/handler.js';

const router = Router();
/* RUTAS
 */
router.get('/', (req, res) => {
    let products = displayProducts();
    res.send(products)
});

router.get('/products', (req, res) => {
    let products = displayProducts();
    res.send(products);
});

router.get('/products/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id)
    let searchById = displayProductById(id);    
    res.send(searchById);
});

router.post('/products', (req, res) => {    
    let add = addProduct(req.body);
    res.send(add);
});

router.put('/products/:id', (req, res) => {
    const id = req.params.id;
    let updatedProduct = req.body;
    let update = updateProductData(id, updatedProduct);
    res.send(update);
});

router.delete('/products/:id',  (req, res) => {
    const id = req.params.id;
    let erase =  deleteProductById(id);
    res.send(erase);
});

export default router;