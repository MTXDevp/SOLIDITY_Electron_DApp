//o, Protocolo para inicializar ipfs y conectar nuestro programa a
//ipfs infura
//

const IPFS = require('ipfs-api');
const ipfs = new IPFS({host:'ipfs.infura.io', port: 5001, protocol: 'https'});
export default ipfs;
