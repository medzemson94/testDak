const express = require('express');


const router = express.Router();

const mongoose = require('mongoose');

const Langue = require('../models/langue');

router.get('/getLangue/:langueId', ((req, res, next) => {
    const id = req.params.projectId;
    console.log(id);

    Langue.find({ project_id: id })
        .select('nom  niveauComprehension  niveauParler  niveauEcrit _id connected_at updated_at')
        .exec()
        .then(docs => {
            console.log(docs);
            if (!docs) {
                return res.status(404).json({
                    message: "produit pas trouver"
                })
            }
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "Something wrong",
                error: err
            });
        });
}));
router.get('/', ((req, res, next) => {
    Langue.find()
        .exec()
        .then(docs => {
            console.log(docs);
            if (!docs) {
                return res.status(404).json({
                    message: "langue pas trouver"
                })
            }
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}));

router.post('/create', (req, res, next) => {
    const date = new Date()
    const langue = new Langue({
        _id: new mongoose.Types.ObjectId(),
        nom: req.body.nom,
        niveauComprehension: req.body.niveauComprehension,
        niveauEcrit: req.body.niveauEcrit,
        niveauParler: req.body.niveauEcrit,

        created_at: date,
        updated_at: date,

    })
    langue.save().then(
            result => {
                console.log(result);
                res.status(200).json({
                    message: langue
                })

            }
        )
        .catch(
            err => {
                console.log(err);
                res.status(500).json({
                    message: err
                })
            }
        )
    res.status(200).json({
        message: "Creation reussi",
        message: langue
    })
});
router.patch('/update/:id', (req, res, next) => {
    const id = req.params.id;
    const date = new Date()
    Langue.update({ _id: id }, {
        $set: {
            nom: req.body.nom,
            niveauComprehension: req.body.niveauComprehension,
            niveauEcrit: req.body.niveauEcrit,
            niveauParler: req.body.niveauEcrit,

            updated_at: date
        }
    }).exec().then(
        result => {
            console.log(result);
            res.status(200).json({
                message: "update reussi"
            })

        }
    ).catch(err => {
        res.status(500).json({
            message: err
        })
    });

});
router.delete('/delete/:id',  (req,res,next)=>{
    Langue.remove({_id:req.params.id}).then(
         result =>{
             console.log(result);
              res.status(200).json({
                   message : "suppression  reussie"
              })
                 
         }
    )
    .catch( err=>{
          console.log(err);
          res.status(500).json({
               message : "echec lors de la  suppression "
          })
    });
   
});
module.exports = router;