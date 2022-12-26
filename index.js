//Main dependencies and constants
    const express = require("express");
    const mongoose = require("mongoose");
    const app = express();
    const Product = require("./models/Product");

    app.use(
        express.urlencoded({
            extended: true,
        }),

    )

    app.use(express.json());

//;


//Routes with: CRUD
    app.get('/', (req, res) =>
    {
        
        try 
        {
            res.json({ message: "Hello World!" });
        }

        catch (error) 
        {
            res.json({message: error})
            console.log(error)    
        }

    });

    app.post('/products', async (req, res) =>
    
    {

        try 

            {
        
                const { name, category, price } = req.body;

                if (!name || !category || !price) 
                
                {
              
                    res.status(422).json({ error: 'All camps are obrigatory!' });
              
                }

            const products = 
            {
                name, category, price
            }

            await Product.create(products);
            res.status(201).json({message: "Success"});

        } 
        catch (error) 
        
        {
            
            console.log(error);    
        
        }


    });

    app.get('/products', async (req, res) =>
    {
        try 

        
        {

            const products = await Product.find();
            res.status(200).json(products);
        
        } 
        catch (error) 
        {

            console.log(error)
        
        }
    });

    app.get('/product/:id', async (req, res) =>
    {
        try 
        {

            const id = req.params.id;
            const product = await Product.findOne({_id: id});
            
            if (!product)
            
            {

                res.status(422).json({message: 'Not found'});
                return 
            
            }

            res.status(200).json(product);

        }
        catch (error) 
        {
            console.log(error);
        }
    });


    app.patch('/product/:id', async (req, res)=> 
    
    {

        try 
        
        {
            id = req.params.id;   
            const {name, category, price} = req.body;
            
            const products = 
            
            {
                name,
                category,
                price,
            }

            const update = await Product.updateOne({_id: id}, products);

            if (update.matchedCount === 0)
            
            {
            
                res.status(422).json({message: "Not found"});
                return 
            
            }

            res.status(200).json(products);

        }catch(error) 
        {

            console.log(error);
        
        }

    });

    app.delete("/product/:id", async (req, res) =>
    
    {
        try 
     
        {
            const id = req.params.id;
            const product = await Product.findOne({_id: id});

            if (!product)
            {
                res.status(422).json({message: 'not found'});
                return
            }

            await Product.deleteOne({_id: id})
            res.status(200).json({ message: 'Removed!' })
   
        } catch (error) 
        {
            console.log(error)    
        }
    })
//;

//Mongoose connect with main driver
    mongoose.connect
    (
    
        'mongodb+srv://ccod:eWqtVlff9dcTDiGQ@cluster0.oxfzeyg.mongodb.net/?retryWrites=true&w=majority'
    
    ).then(() => 
    {

        console.log("Its work!");
        app.listen(7777);

    }).catch((err) => 
        
        console.log(err)
    );
//;