/*
 * Copyright 2018-2019 Jupyter Enterprise Gateway Developers
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
