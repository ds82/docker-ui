'use strict';

angular.module('app', [])
  .constant('APP_NAME', 'boilerplate')
  .controller('AppCtrl', AppCtrl);

AppCtrl.$inject = ['APP_NAME'];
function AppCtrl(APP_NAME) {
  var vm = this;

  vm.APP_NAME = APP_NAME;
}

require('nw.gui').Window.get().showDevTools();
var fs = require('fs');

var CERT_PATH = process.env.DOCKER_CERT_PATH;

var Docker = require('dockerode');
var docker3 = new Docker({
  protocol: 'https',
  host: 'docker.vm',
  port: 4243,
  ca: fs.readFileSync(CERT_PATH + '/ca.pem'),
  cert: fs.readFileSync(CERT_PATH + '/cert.pem'),
  key: fs.readFileSync(CERT_PATH + '/key.pem')
});

console.log(docker3);

docker3.listContainers({all: true}, function(err, containers) {
  console.log(err);
  console.log('ALL: ' + containers);
  containers.forEach(function(container) {
    console.dir(container);
  });
});
