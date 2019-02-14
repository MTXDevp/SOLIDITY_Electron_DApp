pragma solidity ^0.5.0;

contract SimpleStorage {
  string datosAlmacenados;

//graba un documento en la blockchain
  function set(string memory x) public {
    datosAlmacenados = x;
  }

//coje el hash criptográfico del documento almacenado
  function get() public view returns (string memory) {
    return datosAlmacenados;
  }
}
