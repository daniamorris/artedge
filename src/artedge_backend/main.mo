import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Map "mo:base/HashMap";
import List "mo:base/List";
import Debug "mo:base/Debug";
import Blob "mo:base/Blob";
import Hash "mo:base/Hash";
import Nat8 "mo:base/Nat8";
import Cycles "mo:base/ExperimentalCycles";
import Counter "Counter";
import Upload "Upload";
import Types "./Types";

actor {
  //Upload
    var uploads = Map.HashMap<Text, Types.Image>(5, Text.equal, Text.hash);
    stable var imageCount: Nat = 0;

    public func saveBatchUpload(batch : Types.Image) : async () {
      let id: Nat = imageCount;
      let imid: Text = Nat.toText(imageCount);
      imageCount+=1;
      uploads.put(imid, batch);
    };

    public query func readImages (imid : Text) : async ?Types.Image {
      //1. auth
      //2. query data
      let imageResult : ?Types.Image = uploads.get(imid);
      //3. return requested post or null
      imageResult;

    };
    //included class that gets created with profile for images
    //creates an asset canister for uploads for each identity
    //private uploads and editing public viewing of images
    public func createUpload() : async () {
      //this is the test version final is in profile create
      Cycles.add(15_000_000_000);
      let U1 = await Upload.Upload(1);
      Debug.print("Main balance: " # debug_show(Cycles.balance())); // decreased by around 10_000_000
    };
    
  //Counter

    public func createCounter() : async () {
      Cycles.add(15_000_000_000);
      let C1 = await Counter.Counter(1);
      Debug.print("Main balance: " # debug_show(Cycles.balance())); // decreased by around 10_000_000
    };

  //profile 

    // public type Profile = {
    //   userPrincipal: Principal;
    //   // avatar: Blob;
    //   email: Text;
    //   username: Text;
    //   alias: Text;
    //   genre: Text;
    //   artState: Text;
    //   interests: Text;
    // };

    // var profiles and principalProfiles need permanant storage solutions
    var profiles = Map.HashMap<Text, Types.Profile>(5, Text.equal, Text.hash);
    var principalProfiles = Map.HashMap<Text, Principal>(5, Text.equal, Text.hash);

    stable var profileIdCount: Nat = 0;
    // var profileIdCount: Nat = 0;

    public query func hasProfile (proPrinc: Principal) : async Text {
      // var pairs = "";
      var keys = "";
      for ((key, value) in principalProfiles.entries()) {
        // pairs := "(" # key # ", " # Principal.toText(value) # ") " # pairs;
        // keys := key # keys;
        if (value != proPrinc){
          //do nothings
        } else {
        keys := key # keys;
        }
      };
      return keys;
    };

    public shared func deleteProPrinc (prokey: Text) : async (){
      principalProfiles.delete(prokey);
    };

    public func createProfile (profile : Types.Profile) : async Text {
      //1. auth
      //2. prepare data
      //fix this principal
      // let userPrincipal: Principal = Principal.toText(profile.caller);
      let id: Nat = profileIdCount;
      let stringId: Text = Nat.toText(profileIdCount);
      profileIdCount+=1;
      //3 create post 
      profiles.put(stringId, profile);
      principalProfiles.put(stringId, profile.userPrincipal);
      
      //this worked here but needs cycles to create each cansiter
      let myCounter = "C" # stringId;
      // let myCounter = await Counter.Counter(1);
      let myUpload = "U" # stringId;
      // let  myUpload = await Upload.Upload(1);
      //4 return confirmations
      (stringId);
    };

    public query func readProfile (stringId : Text) : async ?Types.Profile {
      //1. auth
      //2. query data
      let profileResult : ?Types.Profile = profiles.get(stringId);
      //3. return requested post or null
      profileResult;

    };

    public func updateProfile (stringId : Text, profile : Types.Profile) : async () {
      //1. auth
      //2. query data
      let profileResult : ?Types.Profile = profiles.get(stringId);
      //3. return requested post or null
      // profileResult;
      
          //4. update post data
          let updatedProfile : Types.Profile = {
            userPrincipal = profile.userPrincipal;
            email = profile.email;
            username = profile.username;
            alias = profile.alias;
            genre = profile.genre;
            artState = profile.artState;
            interests = profile.interests;
          };

        profiles.put(stringId, updatedProfile);
          // profiles.put(stringId, profile);
      // was erroring on (null) try null
      //3. return requested post or null
      // switch(){
      //   case (null) {
      //     "you're trying to update a non-existent profile";
      //   };
      //   case(?currentProfile){
      //     //4. update post data
      //     let updatedProfile : Profile = {
      //       userPrincipal = currentProfile.userPrincipal;
      //       email = profile.email;
      //       username = profile.username;
      //     };
      //     //5. update post
      //     profiles.put(stringId, updatedProfile);

      //     //6. return success
      //     "updated successfully";

      //   };
      // };
    };

    public func deleteProfile (stringId : Text) : async ?Types.Profile {
      //1. auth
      //2. query data
      let profileResult : ?Types.Profile = profiles.get(stringId);
      profiles.remove(stringId);
      //3. validate if exists
      // switch(){
      //   case (null) {
      //     // 3.1 return error
      //     "You're trying to delete a non-existent profile.";
      //   };
      //   case(_){
      //     //4. delete post
      //     ignore profiles.remove(stringId);

      //     //5. return success
      //     "updated successfully deleted";
      //     };
      //   };
    };  

    public func listProfiles() : async Text {
      var pairs = "";
      for ((key, value) in principalProfiles.entries()) {
        pairs := "(" # key # ", " # Principal.toText(value) # ") " # pairs
      };
      pairs
    };

  //utilities
    public query (message) func getCaller() : async Text {
      return Principal.toText(message.caller);
    };

    public query (message) func greet() : async Text {
      return "Hello, " # Principal.toText(message.caller) # "!";
    };
};
