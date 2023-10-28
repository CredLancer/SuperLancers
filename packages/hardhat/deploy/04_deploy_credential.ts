import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployCredentialToken: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("CredentialToken", {
    from: deployer,
    args: [], // Add constructor arguments if there are any
    log: true,
  });

};

export default deployCredentialToken;

deployCredentialToken.tags = ["CredentialToken"];
