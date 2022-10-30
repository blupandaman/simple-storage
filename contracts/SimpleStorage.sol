// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract SimpleStorage {
  // this is initialized to zero by default
  uint256 favoriteNumber;

  mapping(string => uint256) public nameToFavoriteNumber;

  // similar to JS object
  struct Person {
    string name;
    uint256 favoriteNumber;
  }

  // array of people
  Person[] public people;

  // function that sets favoriteNumber to the parameter passed
  function store(uint256 _favoriteNubmer) public virtual {
    favoriteNumber = _favoriteNubmer;
  }

  // retrieves the value of favorite number
  // pure and view functions do not change data on the blockchain
  function retrieve() public view returns (uint256) {
    return favoriteNumber;
  }

  // adds a person to the people array
  function addPerson(string memory _name, uint256 _favoriteNubmer) public {
    people.push(Person(_name, _favoriteNubmer));
    nameToFavoriteNumber[_name] = _favoriteNubmer;
  }
}
