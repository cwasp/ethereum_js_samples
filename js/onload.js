window.addEventListener('load', function() {
  if (typeof web3 !== 'undefined') {
    console.log("Web3 detected!");
    window.web3 = new Web3(web3.currentProvider);
    startApp();
  } else {
    alert("Please use Chrome, install Metamask and then try again!");
  }
})
