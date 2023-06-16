import Principal "mo:base/Principal";
import Map "mo:base/HashMap";
import Text "mo:base/Text";

actor {
  public query (message) func greet() : async Text {
    return "Hey There, " # Principal.toText(message.caller) # "!";
  };

  public query (message) func greet2() : async Text {
    return "Hey Hey, " # Principal.toText(message.caller) # "!";
  };

  type Name = Text;
  type Phone = Text;

  type Entry = {
    desc: Text;
    phone: Phone;
  };

  let phonebook = Map.HashMap<Name, Entry>(0, Text.equal, Text.hash);

  public func insert(name : Name, entry : Entry): async () {
    phonebook.put(name, entry);
  };

  public query func lookup(name : Name) : async ?Entry {
    phonebook.get(name)
  };

};