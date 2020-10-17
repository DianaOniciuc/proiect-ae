const express = require('express');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());


const sequelize = new Sequelize('parfumuridb', 'username', '', {
   host: '127.0.0.1',
   dialect: 'mysql',
   operatorsAliases: false,
   pool: {
        "max": 1,
        "min": 0,
        "idle": 20000,
        "acquire": 20000
    }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Conexiunea s-a realizat cu succes!');
  })
  .catch(err => {
    console.error('Nu s-a putut realiza conexiunea la baza de date', err);
  });


//creare tabela Admin
const Admin = sequelize.define('admin', {
    idAdmin: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    parola: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
}, {
  timestamps: false
});

//creare tabela Brand
const Brand = sequelize.define('brand', {
    idBrand: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nume: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
});

//creare tabela Parfum
const Parfum = sequelize.define('parfum',{
    idParfum: {
        type: Sequelize.INTEGER, 
        primaryKey: true,
        autoIncrement: true
    },
    denumire:{
        type: Sequelize.STRING,
        allowNull: false
    },
    pret:{
       type: Sequelize.DECIMAL(10, 2),
       allowNull: false,
       defaultValue: 0.00
    },
    grupa: {
        type: Sequelize.STRING,
        allowNull: true
    },
    cantitate: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    image: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

//tabela CosCumparaturi
const CosCumparaturi = sequelize.define('cos', {
    idParfum: {
        type: Sequelize.INTEGER
    },
    cantitateComandata: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    id: {
        type: Sequelize.INTEGER, 
        primaryKey: true,
        autoIncrement: true
    }
},
    {
  timestamps: false
});

Parfum.belongsTo(Brand, { targetKey: 'nume', foreignKey: 'numeBrand' });
Parfum.belongsTo(CosCumparaturi, {targetKey: 'idParfum', foreignKey: 'idParfum'});

/*sequelize.sync({force: true}).then(()=>{
    console.log('Baza de date a fost creata cu succes!');


Brand.create({nume: "Lancome"});
Brand.create({nume: "Paco Rabanne"});
Brand.create({nume: "Hugo Boss"});
Parfum.create({denumire: "La Vie Est Belle", pret: 155, grupa: "floral", numeBrand: "Lancome"});
Parfum.create({denumire: "Tresor", pret: 354, grupa: "oriental", numeBrand: "Lancome"});
Parfum.create({denumire: " Tresor Midnight Rose", pret: 317, grupa: "lemnos", numeBrand: "Lancome"});
Parfum.create({denumire: "Ultraviolet", pret: 303, grupa: "oriental", numeBrand: "Paco Rabanne"});
Parfum.create({denumire: "Olympea", pret: 299, grupa: "oriental", numeBrand: "Paco Rabanne"});
Parfum.create({denumire: "BOSS Femme", pret: 170, grupa: "fructat", numeBrand: "Hugo Boss"});
Parfum.create({denumire: "BOSS Nuit", pret: 165, grupa: "floral", numeBrand: "Hugo Boss"});
Parfum.create({denumire: "BOSS Alive", pret: 214, grupa: "fructat", numeBrand: "Hugo Boss"});

});*/

app.get('/createdb', (request, response) => {
    sequelize.sync({force: true}).then(() => {
        response.status(200).send('tables created');
    }).catch((err) => {
        response.status(500).send(err);
    });
});

app.get('/brands', (req, res) => {
    Brand.findAll().then((brands) => {
        res.status(200).send(brands); 
    });
});

app.get('/parfumuri', (req, res) => {
    Parfum.findAll().then((parfumuri) => {
        res.status(200).send(parfumuri); 
    });
});

app.get('/cos', (req, res) => {
    Parfum.findAll({
        include: [{
            model: CosCumparaturi,
            required: true
        }]
    }).then((cos) => {
        res.status(200).send(cos); 
    });
});

app.post('/adauga-cos', (req, res) =>{
    CosCumparaturi.create({
        idParfum: req.body.idParfum,
        cantitateComandata: req.body.cantitateComandata
    }).then((brand) => {
        res.status(200).send(brand);
    }, (err) => {
        res.status(500).send(err);
    });
});

app.put('/actualizare-cos/:id', (req,res)=>{
    const id=req.params.id;
    CosCumparaturi.findOne(
    {
        where: {
            id: id
        }
    }).then((produs)=>{
        if(produs){
        produs.update({
        cantitateComandata: req.body.cantitateComandata
            });
        res.status(200).send('Cantitatea a fost actualizata cu succes!'); 
    }else{
        res.status(404).send('Produs not found');
    }
    });
});


app.delete('/cos', (req,res)=>{
    CosCumparaturi.destroy({truncate: true}).then((cos)=>{
        
        res.status(200).send('Cosul a fost sters cu succes'); 
    },(err)=>{
        res.status(404).send(err);
    });
    });


app.delete('/stergere-produs/:idParfum', (req,res)=>{
    const idParfum=req.params.idParfum;
    CosCumparaturi.destroy({
        where: {
            idParfum: idParfum
        }
    }).then((parfum)=>{
        if(parfum){
        res.status(200).send('Parfumul a fost sters din cos cu succes'); 
    }else{
        res.status(404).send('Parfum not found');
    }
    });
});


app.get('/admin', (req, res) => {
    Admin.findAll().then((admins) => {
        res.status(200).send(admins); 
    });
});

//login admin
app.post('/login', (req, res) => {
   Admin.findOne({where:{user: req.body.user, parola: req.body.parola}}).then((result) => {
       if(result) {
       res.status(200).send(result); 
       }
       else {
       res.status(404).send('could not find user');}
   });
});


app.get('/parfumuri/:idParfum', (req, res) => {
    const idParfum=req.params.idParfum;
    Parfum.findOne({where: {idParfum : idParfum}}).then((parfum) => {
        if(parfum){
        res.status(200).send(parfum); 
    }else{
        res.status(404).send('Parfum not found');
    }
    });
});

app.get('/branduri/:idBrand', (req, res) => {
    const idBrand=req.params.idBrand;
    Parfum.findOne({where: {idBrand : idBrand}}).then((brand) => {
        if(brand){
        res.status(200).send(brand); 
    }else{
        res.status(404).send('Brand not found');
    }
    });
});

app.delete('/stergere-brand/:idBrand', (req,res)=>{
    const idBrand=req.params.idBrand;
    Brand.destroy({
        where: {
            idBrand: idBrand
        }
    }).then((brand)=>{
        if(brand){
        res.status(200).send('Brandul a fost sters cu succes'); 
    }else{
        res.status(404).send('Brand not found');
    }
    });
});

app.delete('/stergere-parfum/:idParfum', (req,res)=>{
    const idParfum=req.params.idParfum;
    Parfum.destroy({
        where: {
            idParfum: idParfum
        }
    }).then((parfum)=>{
        if(parfum){
        res.status(200).send('Parfumul a fost sters cu succes'); 
    }else{
        res.status(404).send('Parfum not found');
    }
    });
});

app.post('/adaugare-brand', (req, res) =>{
    Brand.create({
        nume: req.body.nume
    }).then((brand) => {
        res.status(200).send(brand);
    }, (err) => {
        res.status(500).send(err);
    });
});

app.post('/adaugare-parfum', (req, res) =>{
    Parfum.create({
        denumire: req.body.denumire,
        pret: req.body.pret,
        grupa: req.body.grupa,
        cantitate: req.body.cantitate,
        numeBrand: req.body.numeBrand,
        image: req.body.image
    }).then((parfum) => {
        res.status(200).send(parfum);
    }, (err) => {
        res.status(500).send(err);
    });
});

app.put('/actualizare-brand/:idBrand', (req,res)=>{
    const idBrand=req.params.idBrand;
    Brand.findOne(
    {
        where: {
            idBrand: idBrand
        }
    }).then((brand)=>{
        if(brand){
        brand.update({
        nume: req.body.nume
            });
        res.status(200).send('Brandul a fost actualizat cu succes!'); 
    }else{
        res.status(404).send('Brand not found');
    }
    });
});

app.put('/actualizare-parfum/:idParfum', (req,res)=>{
    const idParfum=req.params.idParfum;
    Parfum.findOne(
    {
        where: {
            idParfum: idParfum
        }
    }).then((parfum)=>{
        if(parfum){
        parfum.update({
        denumire: req.body.denumire,
        pret: req.body.pret,
        grupa: req.body.grupa,
        cantitate: req.body.cantitate,
        numeBrand: req.body.numeBrand,
        image: req.body.image
            });
        res.status(200).send(parfum); 
    }else{
        res.status(404).send('Parfum not found');
    }
    });
});

app.listen(8081, ()=>{
    console.log('Server started on port 8081...');
});