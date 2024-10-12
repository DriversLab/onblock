import "@stdlib/deploy";
import "@stdlib/ownable";

contract ReceiveAndWithdraw with Deployable, Ownable {

    owner: Address; // The address of the contract owner (deployer)

    init() {
        self.owner = sender(); // Set the deployer as the owner
    }

    // Function to withdraw all funds to the owner
    receive("withdraw") {
        send(SendParameters{
            to: self.owner,
            value: myBalance() - context().value, // Send all remaining balance minus the message value
            bounce: true,
            mode: SendRemainingBalance + SendIgnoreErrors
        });
    }

    // Accept incoming TON transfers
    receive() {
    }

    // Get the contract balance (for reference)
    get fun balance(): Int {
        return myBalance(); // Returns the contract's current balance in nano-tons
    }
}