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
import Array "mo:base/Array";
import AssocList "mo:base/AssocList";
import Counter "Counter";
import Upload "Upload";
import Types "./Types";
import Trie "mo:base/Trie";
import Buffer "mo:base/Buffer";

actor {
  //Images
    //CRUD homepage feed returns a list of current art in order of timeframe newest to oldest and likes
    // need to add a timestamp to images for feed sort options
    var images = Map.HashMap<Text, Types.Image>(5, Text.equal, Text.hash);

    stable var imageIdCount: Nat = 0;

    public func createImage (image : Types.Image) : async Text {
      let id: Nat = imageIdCount;
      let stringImId: Text = Nat.toText(imageIdCount);
      imageIdCount+=1;
      images.put(stringImId, image);
      (stringImId);
    };

    public query func readImage (stringImId : Text) : async ?Types.Image {
      let imageResult : ?Types.Image = images.get(stringImId);
      imageResult;
    };

    public func updateImage (stringImId : Text, myimage : Types.Image) : async ?Types.Image {
      let imageResult : ?Types.Image = images.get(stringImId);
          let updatedImage : Types.Image = {
            imid = myimage.imid;
            pid = myimage.pid;
            image = myimage.image;
            title = myimage.title;
            description = myimage.description;
            tags = myimage.tags;
            likes = myimage.likes;
          };

        images.put(stringImId, updatedImage);
        let updatedImageResult: ?Types.Image = images.get(stringImId);
        updatedImageResult;
    };

    public func deleteImage (stringImId : Text) : async ?Types.Image {
      let imagesResult : ?Types.Image = images.get(stringImId);
      images.remove(stringImId);
    }; 

  //Gallery
    //CRUD returns a list of images and their descriptions for a gallery

  //Upload
    //CRUD need to iterate over uploads to get the individual image data
    var uploads = Map.HashMap<Text, Types.BatchUpload>(5, Text.equal, Text.hash);
    stable var uploadCount: Nat = 0;

    public func saveBatchUpload(batch : Types.BatchUpload) : async Text {
      let id: Nat = uploadCount;
      let upid: Text = Nat.toText(uploadCount);
      uploadCount+=1;
      uploads.put(upid, batch);
      (upid);
    };

    public query func readBatch (stringId : Text) : async ?Types.BatchUpload {
      let uploadsResult : ?Types.BatchUpload = uploads.get(stringId);
      uploadsResult;
    };

  //Counter
    //added as class that tracks the user interactions as points for future tokens and DAO
    //gets created in the createProfile() func
    //updates with user activity
    //displays points total in profile

    public func createCounter() : async () {
      Cycles.add(15_000_000_000);
      let C1 = await Counter.Counter(1);
      Debug.print("Main balance: " # debug_show(Cycles.balance())); // decreased by around 10_000_000
    };

    //testing counter
      stable var count = 0;

      public shared(msg) func inc() : async Nat {
        // assert (owner == msg.caller);
        count += 1;
        count;
      };
      
      public shared(msg) func inc10() : async Nat {
        // assert (owner == msg.caller);
        count += 10;
        count
      };
      
      public shared(msg) func inc100() : async Nat {
        // assert (owner == msg.caller);
        count += 100;
        count;
      };

      public query func read() : async Nat {
        count
      };

      public shared(msg) func bump() : async Nat {
        // assert (owner == msg.caller);
        count := 1;
        count;
      };
      
      public shared(msg) func zero() : async Nat {
        // assert (owner == msg.caller);
        count := 0;
        count;
      };

      public shared(msg) func setCount(preCount: Nat) : async Nat {
        // assert (owner == msg.caller);
        count := preCount;
        count;
      };

  //Profiles
    //var profiles and principalProfiles need permanant storage solutions
    var profiles = Map.HashMap<Text, Types.Profile>(5, Text.equal, Text.hash);
    var emailList = Map.HashMap<Text, Types.Elist>(5, Text.equal, Text.hash);
    var principalProfiles = Map.HashMap<Text, Principal>(5, Text.equal, Text.hash);
    // var profileCounters = Map.HashMap<Text, Types.Pcount>(5, Text.equal, Text.hash);
    let pointsN = Buffer.Buffer<Nat>(3);

    public func addPoints (proid : Nat, count : Nat) : async () {
      // created points buffer with profile registration
      pointsN.put(proid, count); // updates the current profile points count
    };
    public query func readPoints (proid : Nat) : async Nat {
      // created points buffer with profile registration
      pointsN.get(proid); // returns the current profile points count
    };

    // stable var profileIdCount: Nat = 0;
    stable var elistCount: Nat = 0;
    var profileIdCount: Nat = 0;

    public query func hasProfile (proPrinc: Principal) : async Text {
      // var pairs = "";
      var keys = "";
      for ((key, value) in principalProfiles.entries()) {
        if (value != proPrinc){
          //do nothings
        } else {
        keys := key # keys;
        }
      };
      return keys;
    };

    public query func listProfiles() : async Text {
      var pairs = "";
      for ((key, value) in principalProfiles.entries()) {
        pairs := "(" # key # ", " # Principal.toText(value) # ") " # pairs
      };
      pairs
    };

    public shared func deleteProPrinc (prokey: Text) : async (){
      principalProfiles.delete(prokey);
    };

    public func betaList (blist : Types.Elist) : async Text {
      let id: Nat = elistCount;
      let stringId: Text = Nat.toText(elistCount);
      elistCount+=1;
      emailList.put(stringId, blist);      
      (stringId);
    };

    public query func readBetaList (stringId : Text) : async ?Types.Elist {
      let elistResult : ?Types.Elist = emailList.get(stringId);
      elistResult;
    };

    // public query func readCounter (stringId : Text) : async ?Types.Pcount {
    //   let countResult : ?Types.Pcount = profileCounters.get(stringId);
    //   countResult;
    // };

    // public func updateCounter (stringId : Text, myCounter : Types.Pcount) : async () {
    //   let counterResult : ?Types.Pcount = profileCounters.get(stringId);
    //   let stringCount: Text = Nat.toText(count);
    //   let updatedCounter : Types.Pcount = {
    //     userPrincipal = myCounter.userPrincipal;
    //     points = stringCount;
    //   };
    //   profileCounters.put(stringId, updatedCounter);
    // };
    
    public func createProfile (profile : Types.Profile) : async Text {
      let id: Nat = profileIdCount;
      let stringId: Text = Nat.toText(profileIdCount);
      profileIdCount+=1;
      profiles.put(stringId, profile);
      principalProfiles.put(stringId, profile.userPrincipal);
      pointsN.add(100);

      //initial counter
      // let myCounter : Types.Pcount = {
      //   userPrincipal = profile.userPrincipal;
      //   points = "100";
      // };
      // profileCounters.put(stringId, myCounter);

      //this works here not sure how to get the canisterId
      // var myCounter: Text = "C" # stringId;
      // Cycles.add(15_000_000_000);
      // let C1 = await Counter.Counter(1);
      // let myUpload = "U" # stringId;
      // Cycles.add(15_000_000_000);
      // let  myUpload = await Upload.Upload(1);
      // Debug.print("Made a counter" # myCounter # " Main balance: " # debug_show(Cycles.balance())); // decreased by around 10_000_000
      (stringId);
    };

    public query func readProfile (stringId : Text) : async ?Types.Profile {
      let profileResult : ?Types.Profile = profiles.get(stringId);
      profileResult;
    };

    public func updateProfile (stringId : Text, profile : Types.Profile) : async () {
      let profileResult : ?Types.Profile = profiles.get(stringId);
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
          // if I wanted to return updated change return to async ?Types.Profile
        // let updatedProfileResult: ?Types.Profile = profiles.get(stringId);
        // updatedProfileResult;
    };

    public func deleteProfile (stringId : Text) : async ?Types.Profile {
      let profileResult : ?Types.Profile = profiles.get(stringId);
      profiles.remove(stringId);
    };  

  //Account
    //CRUD that holds the additional account info
    var accounts = Map.HashMap<Text, Types.Account>(5, Text.equal, Text.hash);
    var principalAccounts = Map.HashMap<Text, Principal>(5, Text.equal, Text.hash);

    stable var accountIdCount: Nat = 0;

    public query func hasAccount (proPrinc: Principal) : async Text {
      // var pairs = "";
      var keys = "";
      for ((key, value) in principalAccounts.entries()) {
        if (value != proPrinc){
          //do nothings
        } else {
        keys := key # keys;
        }
      };
      return keys;
    };

    public query func listAccounts() : async Text {
      var pairs = "";
      for ((key, value) in principalAccounts.entries()) {
        pairs := "(" # key # ", " # Principal.toText(value) # ") " # pairs
      };
      pairs
    };

    public shared func deleteAcoPrinc (prokey: Text) : async (){
      principalAccounts.delete(prokey);
    };

    public func createAccount (account : Types.Account) : async Text {
        let id: Nat = accountIdCount;
        let stringId: Text = Nat.toText(accountIdCount);
        accountIdCount+=1;
        accounts.put(stringId, account);
        principalAccounts.put(stringId, account.userPrincipal);
        (stringId);
    };

    public query func readAccount (stringId : Text) : async ?Types.Account {
      let accountResult : ?Types.Account = accounts.get(stringId);
      accountResult;
    };

    public func updateAccount (stringId : Text, account : Types.Account) : async () {
      let accountResult : ?Types.Account = accounts.get(stringId);
          let updatedAccount : Types.Account = {
            userPrincipal = account.userPrincipal;
            contact = account.contact;
            commissions = account.commissions;
            payments = account.payments;
            points = account.points;

          };

        accounts.put(stringId, updatedAccount);
    };

    public func deleteAccount (stringId : Text) : async ?Types.Account {
      let accountResult : ?Types.Account = accounts.get(stringId);
      accounts.remove(stringId);
    }; 

  //Utilities
    public query (message) func getCaller() : async Text {
      return Principal.toText(message.caller);
    };

    public query (message) func greet() : async Text {
      return "Hello, " # Principal.toText(message.caller) # "!";
    };

    public shared (msg) func whoami() : async Principal {
        msg.caller
    };

  //NFT
    // CRUD import class to create NFT's and trade them

  //Money
    //walllet management and Fiat payment systems like stripe
    //initially shows types of payments artist accepts

  //Training
    //training modules as a module with build in tracking
};
