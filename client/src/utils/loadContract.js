import { ethers } from "ethers";
import { stakingICOAddress, stakingICOAbi } from "./constants";
import { toast } from "react-toastify";

async function loadContract(signer, chainId, setContract, address) {
  if (chainId !== 31337) {
    toast.error(
      "Please Change your network to BSC Testnet for Buying Tokens"
    );
    return;
  }
  const _stknICOContract = new ethers.Contract(
    stakingICOAddress,
    stakingICOAbi,
    signer
  );

  setContract({
    stknICO: _stknICOContract,
  });

  //Read From Contract

  async function requestData1() {
    const ICOstatess = await _stknICOContract.getICOState()
    console.log("ICO State is ", ICOstatess)
  }

  // await _stknICOContract.startICO();

  setInterval(requestData1, 2000);
  // console.log("Admin address is ", _stknICOContract.getAdmin())
  
  const tokensAvailable = ethers.utils.formatEther(
    await _stknICOContract.getICOTokenBalance()
  );

  const investorBalance = ethers.utils.formatEther(
    await _stknICOContract.investorBalanceOf(address)
  );

  

  return {
    tokensAvailable,
    investorBalance,
  };
}

export default loadContract;
