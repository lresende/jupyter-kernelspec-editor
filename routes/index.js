const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();

const jupyterEnvironment = require('../core/JupyterEnvironment')

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('>>> Read list of kernelspecs');

    let jupyter = new jupyterEnvironment();
    let kernelspecs = jupyter.getKernelspecs();


    Object.keys(kernelspecs).forEach(function(key) {
        console.log(key + " => " + kernelspecs[key])
    });

    res.render('index', { title: 'Jupyter Kernelspec Editor', kernelspecs: kernelspecs });
});


router.get('/api/kernelspec/:name', function(req, res, next) {
    console.log('>>> Reading kernelspec content ==> ' + req.params.name);

    let jupyter = new jupyterEnvironment();

    let kernelspecName = req.params.name;
    let kernelspecLocation = jupyter.getKernelspecLocation(kernelspecName);

    console.log('Sending file ==> ' + kernelspecLocation);

    res.sendFile(kernelspecLocation);
});



module.exports = router;
