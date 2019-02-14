import web3 from './web3';

// es la dirección del contrato que puede obtener
//de SampleStorage.json en la carpeta de compilación
const address="0xf31052ecA93aC1ad5b8bAfF25D2a8B2711C4c2bf";

//interfaz binaria de la aplicación que puede obtener
// de SampleStorage.json en la carpeta de compilación
const abi = [
  {
    "constant": false,
    "inputs": [
      {
        "name": "x",
        "type": "string"
      }
    ],
    "name": "set",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x4ed3885e"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "get",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x6d4ce63c"
  }
];

export default new web3.eth.Contract(abi, address);
