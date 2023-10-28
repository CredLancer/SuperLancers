// deployQuestController.js
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployQuestController: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  // Deploy the Credentials and OrganizationController contracts first
  const credentials = await deploy("Credentials", {
    from: deployer,
    args: [], // Add constructor arguments for Credentials if any
    log: true,
  });

  const organizationController = await deploy("OrganizationController", {
    from: deployer,
    args: [], // Add constructor arguments for OrganizationController if any
    log: true,
  });

  // Use the addresses of the deployed contracts in the QuestController deployment
  await deploy("QuestController", {
    from: deployer,
    args: [
      organizationController.address,
      credentials.address,
      // Add any additional constructor arguments for QuestController if any
    ],
    log: true,
  });

  // Get the deployed contract
};

export default deployQuestController;
