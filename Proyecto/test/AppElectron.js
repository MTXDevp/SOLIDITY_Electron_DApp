 var AppElectron = artifacts.require("AppElectron.sol");

  contract("AppElectron", function(accounts) {

//it se usa en entorno de pruebas para ver lo que hace el codigo
    it("should store the string 'Hey there!'", async () =>

   { const AppElectron = await AppElectron.deployed();

      Set myString to "Hey there!"


       await AppElectron.set("Hey there!", { from: accounts[0] });

        Get myString from public variable getter const storedString = await

         App.myString.call();

         assert.equal(storedString, "Hey there!", "The string was not stored");

            });
                  });
