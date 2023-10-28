import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployOrganizationalController: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("OrganizationController", {
    from: deployer,
    args: [], // Add constructor arguments if there are any
    log: true,
  });

  // Get the deployed contract
};

export default deployOrganizationalController;

// Tags are useful if you have multiple deploy files and only want to run one of them.
deployOrganizationalController.tags = ["OrganizationController"];
