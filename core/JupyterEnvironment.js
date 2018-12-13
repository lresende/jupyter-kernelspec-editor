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
