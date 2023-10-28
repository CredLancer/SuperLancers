import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployCredentials: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("Credentials", {
    from: deployer,
    args: [], // Add constructor arguments if there are any
    log: true,
  });

  // Get the deployed contract
  // const credentials = await hre.ethers.getContract("Credentials", deployer);
};

export default deployCredentials;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags Credentials
deployCredentials.tags = ["Credentials"];
