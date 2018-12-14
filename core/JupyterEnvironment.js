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

const child_process = require('child_process');
const fs = require('fs');
const path = require('path');

const JupyterEnvironment = /** @class */ (function () {

    function JupyterEnvironment() {
    }

    JupyterEnvironment.prototype.getKernelspecs = function () {

        let cmd = 'jupyter kernelspec list';
        let result = child_process.execSync(cmd)

        let kernelspecs = {};

        let lines = result.toString().split('\n');
        lines.forEach(function(line) {
            if(line.startsWith('  ')) {
                let separator_position = line.indexOf('/');
                let name = line.substring(0, separator_position).trim();
                let path = line.substring(separator_position, line.length).trim();

                console.log(name);
                console.log(path);

                let kernelspecContent = JSON.parse(fs.readFileSync(path + '/kernel.json', 'utf-8'));
                console.log(kernelspecContent);
                let kerlenspecDisplayName = kernelspecContent['display_name'];

                console.log(kerlenspecDisplayName);

                kernelspecs[name]=kerlenspecDisplayName;

                console.debug("Available kernelspecs")
                Object.keys(kernelspecs).forEach(function(key) {
                    console.debug(key + " => " + kernelspecs[key])
                });
            }
        });

        return kernelspecs;
    };


    JupyterEnvironment.prototype.getKernelspecLocation = function (kernelspecName) {

        let cmd = 'jupyter kernelspec list';
        let result = child_process.execSync(cmd)

        let kernelspecs = {};

        let lines = result.toString().split('\n');
        lines.forEach(function(line) {
            if(line.startsWith('  ')) {
                let separator_position = line.indexOf('/');
                let name = line.substring(0, separator_position).trim();
                let path = line.substring(separator_position, line.length).trim();

                console.log(name);
                console.log(path);

                kernelspecs[name]=path;

                console.debug("Available kernelspecs")
                Object.keys(kernelspecs).forEach(function(key) {
                    console.debug(key + " => " + kernelspecs[key]);
                });
            }
        });

        return kernelspecs[kernelspecName] + '/kernel.json';
    };

    return JupyterEnvironment;
}());

module.exports = JupyterEnvironment;
