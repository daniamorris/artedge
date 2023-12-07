import Nat "mo:base/Nat";

    //included class that gets created with profile for images
    //or when they select create a gallery option
    //creates an asset canister for uploads for each identity
    //private uploads and editing public viewing of images

shared(msg) actor class Upload(init : Nat) {

  let owner = msg.caller;

  var count = init;

  public shared(msg) func inc() : async () {
    assert (owner == msg.caller);
    count += 1;
  };

  public func read() : async Nat {
    count
  };

  public shared(msg) func bump() : async Nat {
    assert (owner == msg.caller);
    count := 1;
    count;
  };
}
