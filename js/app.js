var contractAddress = '0xa74476443119A942dE498590Fe1f2454d7D4aC0d';
var address='0xa353f8be5a6c8bee2118772ac14186bdd734a7e0';
var contractGolem = null;
var isAddress = false;

function startApp() {
  document.getElementById('balance').style.display = "none";
  document.getElementById('getBalance').disabled = true;


  var Contract = web3.eth.contract(abi);
  contractGolem = Contract.at(contractAddress);

  PromisifyContract.promisify(contractGolem);

  contractGolem.namePromise()
    .then(function(name) {
        document.getElementById('nameOf').innerText = name;
        document.getElementById('addressOf').innerText = contractAddress;

        //TODO only for init test address
        document.getElementById('address').value = address;
        onAddressKeyUp();
        //
    }).catch(function(error) {
      console.log('Error occurred!', error);
      alert('Error occurred!', error);
      contractGolem = null;
    });

 /* contractGolem.name(function(error, name) {
      if (error) {
        alert("Please use correct Contract Address and then try again!");
        return;
      }
      if (name) {
        document.getElementById('nameOf').innerText = name;
        document.getElementById('addressOf').innerText = contractAddress;
      }
  });*/

}

function onAddressKeyUp() {
  isAddress = web3.isAddress(document.getElementById('address').value);
  document.getElementById('getBalance').disabled = !isAddress;
  document.getElementById('validAddressMark').innerText = isAddress ? "valid": "invalid";
  if (isAddress) {
    address = document.getElementById('address').value;
  }
}

function getBalance() {
  if (contractGolem && isAddress) {
    contractGolem.balanceOfPromise(address)
    .then(function (balance) {
        console.log('Quantity ' + balance);
        document.getElementById('balance').style.display = "inline";
        document.getElementById('quantity').innerText = web3.fromWei(balance).toString();
    }).catch(function(error) {
      console.log('Error occurred (getBalance)!', error);
      alert('Error occurred (getBalance)!', error);
    });
        
    /*contractGolem.balanceOf(address, function(error, balance) {
      if (balance) {
        console.log('Quantity ' + balance);
      }
    });*/  
  }

}
