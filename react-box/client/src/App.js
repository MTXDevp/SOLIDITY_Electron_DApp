import React, { Component } from 'react';
import './App.css';
import web3 from './web3';
import ipfs from './ipfs';
import storeMyValue from './GuardarDatos';

class App extends Component {

state = {
ipfsHash:null,
buffer:'',
transactionHash:'',
gasUsed:'',
txReceipt: '' ,
};

captureFile =(event) => {
event.stopPropagation()
event.preventDefault()
const file = event.target.files[0]
let reader = new window.FileReader()
reader.readAsArrayBuffer(file)
reader.onloadend = () => this.convertToBuffer(reader)
};

convertToBuffer = async(reader) => {
//file is converted to a buffer for upload to IPFS
const buffer = await Buffer.from(reader.result);
//set this buffer -using es6 syntax
this.setState({buffer});
};

onSubmit = async (event) => {

event.preventDefault();
console.log("web3 value is ",web3.eth.getAccounts());
const accounts = await web3.eth.getAccounts();
console.log('Sending from Metamask account: ' , accounts[0]);
const ethAddress= await storeMyValue.options.address;
this.setState({ethAddress});

await ipfs.add(this.state.buffer, (err, ipfsHash) => {
console.log(err,ipfsHash);
this.setState({ ipfsHash:ipfsHash[0].hash });

storeMyValue.methods.set(this.state.ipfsHash).send({
from: accounts[0]
}, (error, transactionHash) => {
console.log("transaction hash is ",transactionHash);
this.setState({transactionHash});
});
})
};

render() {

return (
<div>
    <div class="header">
        <div class="sides">
            <a href="#" class="logo">BLOG</a>
        </div>
        <div class="sides">
            <a href="#" class="menu">-</a>
        </div>
        <div class="info">
            <h3>Un mundo mejor gracias a la tecnología</h3>
            <h1>Eco-Electron</h1>
            <div class="meta">
                <a  href="index.html" target="_b" class="author"></a>
            </div>
        </div>
    </div>
    <section class="content">
        <p>Nuestra idea satisface la necesidad de utilizar energías renovables y limpias. 
            Ayudando a las personas a obtener grandes beneficios económicos y un estilo de vida más benévolo con el medio ambiente.
            Con un sistema de  placas solares y un sistema de transmisión de energía creado por nosotros utilizando la tecnología Blockchain 
            que nos diferenciará del resto de empresas del sector.
        </p>
    </section>
    <div class="header">
    <div class="donut-chart-block block"> 
                    <h2>GRAFICA</h2>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div class="donut-chart">

      <div id="porcion1" class="recorte"><div class="quesito ios" data-rel="21"></div></div>
     <div id="porcion2" class="recorte"><div class="quesito mac" data-rel="39"></div></div>
     <div id="porcion3" class="recorte"><div class="quesito win" data-rel="31"></div></div>
     <div id="porcionFin" class="recorte"><div class="quesito linux" data-rel="9"></div></div>
    </div>
    </div>
    </div>
</div>
);
}
}

export default App;
