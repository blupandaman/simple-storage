import { TransactionRequest } from "@ethersproject/providers";
import { assert } from "chai";
import { ethers } from "hardhat";
import { SimpleStorage__factory } from "./../typechain-types/factories/SimpleStorage__factory";
import { SimpleStorage } from "./../typechain-types/SimpleStorage";

describe("SimpleStorage", () => {
  let simpleStorageFactory: SimpleStorage__factory;
  let simpleStorage: SimpleStorage;

  beforeEach(async () => {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await simpleStorageFactory.deploy();
  });

  it("Should start with a favorite number of 0", async () => {
    const expectedValue = "0";
    const currentValue = await simpleStorage.retrieve();
    assert.equal(currentValue.toString(), expectedValue);
  });

  it("Should update when we call store", async () => {
    const expectedValue = "3";
    const txResponse = await simpleStorage.store(expectedValue);
    await txResponse.wait(1);

    const currentValue = await simpleStorage.retrieve();
    assert.equal(currentValue.toString(), expectedValue);
  });

  it("Should start with an empty people array", async () => {
    const expectedValue = 0;
    const currentArray = simpleStorage.people.length;
    assert.equal(currentArray, expectedValue);
  });

  it("Should add a Person when we call addPerson", async () => {
    const expectedName = "Tester";
    const expectedNumber = 7;
    const txResponse = await simpleStorage.addPerson(
      expectedName,
      expectedNumber
    );
    await txResponse.wait(1);

    const currentValue = await simpleStorage.people(0);
    assert.equal(currentValue.toString(), `${expectedName},${expectedNumber}`);
  });
});
