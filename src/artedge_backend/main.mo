import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Nat "mo:base/Nat";

actor {

  public query (message) func greet() : async Text {
    return "Hello, " # Principal.toText(message.caller) # "!";
  };
    public query (message2) func greet2() : async Text {
    return Principal.toText(message2.caller);
  };

  stable var points = 0;

  // Get the value of the points.
  public query func get() : async Nat {
    return points;
  };

  // Set the value of the points.
  public func set(n : Nat) : async () {
    points := n;
  };

  // Increment the value of the points.
  public func inc() : async () {
    points += 1;
  };

};
