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
<div className="App">
<header className="App-header">
<h1> IPFS Dapp</h1>
</header>
<hr />
<h3> Choose file to send to IPFS </h3>

<form onSubmit={this.onSubmit}>
<input type="file" onChange={this.captureFile}/>
<button type="submit"> Send it </button>
</form>

<hr/>
<table >
<thead>
<tr>
<th>Sl No</th>
<th>Values</th>
</tr>
</thead>
<tbody>
<tr>
<td>IPFS Hash # stored on Eth Contract</td>
<td>{this.state.ipfsHash}</td>
</tr>
<tr>

<td>Ethereum Contract Address</td>
<td>{this.state.ethAddress}</td>
</tr>
<tr>
<td>Tx Hash # </td>
<td>{this.state.transactionHash}</td>
</tr>
</tbody>
</table>
</div>);
}
}

export default App;
