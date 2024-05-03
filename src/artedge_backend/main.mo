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
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import AssocList "mo:base/AssocList";
import Trie "mo:base/Trie";
import Buffer "mo:base/Buffer";
import Prelude "mo:base/Prelude";
import TrieMap "mo:base/TrieMap";
import MainAss "MainAss";
import Counter "Counter";
import Types "./Types";

actor {
  //Images
    //CRUD homepage feed returns a list of current art in order of timeframe newest to oldest and likes
    // need to add a timestamp to images for feed sort options
    var images = Map.HashMap<Text, Types.Image>(5, Text.equal, Text.hash);

    stable var imageIdCount: Nat = 0;
        //  var imageIdCount: Nat = 0;


    public func createImage (image : Types.Image) : async Text {
      let id: Nat = imageIdCount;
      let stringImId: Text = Nat.toText(imageIdCount);
      imageIdCount+=1;
      images.put(stringImId, image);
      stringImId;
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
    var imguploads = Map.HashMap<Text, Types.FileBatch>(5, Text.equal, Text.hash);
    stable var imguploadCount: Nat = 0;
    //  var imguploadCount: Nat = 0;

    public query func listImages () : async [(Text, Types.FileBatch)] {
      let allImages = Iter.toArray<(Text, Types.FileBatch)>(imguploads.entries());
      allImages
    };

    public query func listImgKeyByCan (canId: Text) : async Text {
      // var pairs = "";
      var keys = "";
      for ((key, value) in imguploads.entries()) {
        if (value.canId != canId){
          //do nothings
        } else {
        keys := key # ", " # keys;
        // myprofileIds := "{id: " # key # ", pid: "  # key # "}," # myprofileIds
        }
      };
      return keys;
    };

    //is this just a query?
    public shared func findImgDelete (imgKey: Text) : async Text {
      // var pairs = "";
      var keys = "";
      for ((key, value) in imguploads.entries()) {
        if (value.key != imgKey){
          //do nothings
        } else {
          // var mykey = key;
          // imguploads.delete(key);
          // deleteImg(key);
          keys := key # keys;
          //run the delete here? change to an update
          // myprofileIds := "{id: " # key # ", pid: "  # key # "}," # myprofileIds
        }
      };
      return keys;
    };

    public shared func deleteImg (stringId: Text) : async (){
      imguploads.delete(stringId);
    };

    public func saveImagesUpload(batch : Types.FileBatch) : async Text {
      let id: Nat = imguploadCount;
      let upid: Text = Nat.toText(imguploadCount);
      imguploadCount+=1;
      imguploads.put(upid, batch);
      (upid);
    };

    public query func readImgBatch (stringId : Text) : async ?Types.FileBatch {
      let uploadsResult : ?Types.FileBatch = imguploads.get(stringId);
      uploadsResult;
    };

    public func updateImg (stringId : Text, myimage : Types.FileBatch) : async ?Types.FileBatch {
      let imageResult : ?Types.FileBatch = imguploads.get(stringId);
          let updatedImage : Types.FileBatch = {
            key = myimage.key;
            fileName = myimage.fileName;
            width = myimage.width;
            height = myimage.height;
            canId = myimage.canId;
            title = myimage.title;
            description = myimage.description;
            pid = myimage.pid;
          };

        imguploads.put(stringId, updatedImage);
        // let updatedImageResult: ?Types.FileBatch = imguploads.get(stringId);
        // updatedImageResult;
        imageResult;
    };
    
    //not using these upload functions yet
    var uploads = Map.HashMap<Text, Types.BatchUpload>(5, Text.equal, Text.hash);
    stable var uploadCount: Nat = 0;
    // var uploadCount: Nat = 0;

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

    var principalCanisters = Map.HashMap<Text, Types.UCanisters>(5, Text.equal, Text.hash);
    stable var uploadCanCount: Nat = 0;
    // var uploadCanCount: Nat = 0;

    // not currently using hasCan 
     public shared(msg) func hasCan() : async Text {
      let owner = msg.caller; //logged in user
      // var pairs = "";
      var keys = "";
      for ((key, value) in principalCanisters.entries()) {
        if (value != owner){
          //do nothings
        } else {
        keys := key # keys;
        }
      };
      return keys;
    };
    
      public shared(msg) func getCan() : async Text {
      let owner = msg.caller; //logged in user
      // var pairs = "";
      var keys = "";
      for ((key, value) in principalCanisters.entries()) {
        if (value != owner){
          //do nothings
        } else {
        // this will only return the last cansiter per user if there are more than 1
        keys := Principal.toText(value.canisters);
        }
      };
      return keys;
    };

    public query func listCanisterIds() : async Text {
      var myCanisterIds = "";
      for ((key, value) in principalCanisters.entries()) {
        myCanisterIds := "{id: " # key # ", userPrincipal: "  # Principal.toText(value.userPrincipal) # ", Cansiter: "  # Principal.toText(value.canisters) # "}," # myCanisterIds
      };
      myCanisterIds
    };

    public func listCanisters () : async [(Text, Types.UCanisters)] {
      let userCanisters = Iter.toArray<(Text, Types.UCanisters)>(principalCanisters.entries());
      userCanisters
    };
    
    public query func getMyCanisterIds(user: Principal) : async Text {
      var myCanisterIds = "";
      for ((key, value) in principalCanisters.entries()) {
        if (value.userPrincipal == user){
        myCanisterIds := "{id: " # key # ", userPrincipal: "  # Principal.toText(value.userPrincipal) # ", Cansiter: "  # Principal.toText(value.canisters) # "}," # myCanisterIds
        };
      };
      myCanisterIds
    };

    public query func getMyUpCanister(user: Principal) : async Text {
      var myCanisterIds = "";
      for ((key, value) in principalCanisters.entries()) {
        if (value.userPrincipal == user){
        myCanisterIds := Principal.toText(value.canisters)
        // myCanisterIds := "{id: " # key # ", userPrincipal: "  # Principal.toText(value.userPrincipal) # ", Cansiter: "  # Principal.toText(value.canisters) # "}," # myCanisterIds
        };
      };
      myCanisterIds
    };

    public shared(msg) func createUploads() : async Text {
      let owner = msg.caller; //logged in user
      let admin = Principal.fromText("ca5oa-7rf2x-xzqab-v6t3b-uqjxk-otyig-i44g5-2chlx-36sa2-6n7f6-tae"); //admin Artedge
      // let artedge_bk = Principal.fromText("be2us-64aaa-aaaaa-qaabq-cai"); //needs this backend locally to work
      // let artedge_bk = Principal.fromText("fhltm-ziaaa-aaaal-adgrq-cai"); //needs this backend ic test to work
      let artedge_bk = Principal.fromText("6idei-pyaaa-aaaal-add5a-cai"); //needs this backend ic live to work
      // let artedge_ft = Principal.fromText("br5f7-7uaaa-aaaaa-qaaca-cai"); // frontend of artedge 
      // let upwallet = Principal.fromText("bnz7o-iuaaa-aaaaa-qaaaa-cai"); //needs a wallet local
      let upwallet = Principal.fromText("lh3ke-taaaa-aaaan-qlmmq-cai"); //needs a wallet ic
      let controllers : ?[Principal] = ?[artedge_bk, admin, upwallet];
      let mysetting = ?{
        compute_allocation : ?Nat = null;
        controllers = controllers;
        freezing_threshold : ?Nat = null;
        memory_allocation : ?Nat = null;
      };
      Cycles.add(200_000_000_000);
      let A1 = await (system MainAss.MainAss)(#new {settings = mysetting})(); //(system Lib.<id>)(<exp>)(<exp1>, ...​, <expn>)
      Debug.print("Main balance: " # debug_show(Cycles.balance())); // decreased by around 10_000_000
      let newCanisterprincipal = Principal.fromActor(A1);
      Debug.print("New CanisterID: " #debug_show(newCanisterprincipal)); //this worked can return the canisterID
      let mycanisterID = Principal.toText(newCanisterprincipal);
      Debug.print("New CanisterID: string " #debug_show(mycanisterID)); 
      //add Canister and principal to principalCanisters HashMap needs data update
      let id: Nat = uploadCanCount;
      let stringId: Text = Nat.toText(uploadCanCount);
      uploadCanCount+=1;
      let myUCanisters = {
        userPrincipal = owner;
        canisters = newCanisterprincipal;
      };
      principalCanisters.put(stringId, myUCanisters);
      // let newauth = Principal.fromText("umctk-oy4jw-63aq2-qqdms-zpgus-yjo6p-gwygw-royfz-nlq7z-r4glm-mqe"); 
      let auther = await A1.authorize(owner);
      mycanisterID;
    };

    public shared(msg) func authCounter() : async Text {
      let owner = msg.caller; //logged in user
      let artedge_bk = Principal.fromText("be2us-64aaa-aaaaa-qaabq-cai"); //needs this backend to work
      let mytext = "athorized";
    };

    public shared(msg) func createCounter() : async Text {
      let owner = msg.caller; //logged in user
      let admin = Principal.fromText("ca5oa-7rf2x-xzqab-v6t3b-uqjxk-otyig-i44g5-2chlx-36sa2-6n7f6-tae"); //admin Artedge
      let artedge_bk = Principal.fromText("be2us-64aaa-aaaaa-qaabq-cai"); //needs this backend to work
      let upwallet = Principal.fromText("bnz7o-iuaaa-aaaaa-qaaaa-cai"); //needs a wallet 
      let controllers : ?[Principal] = ?[owner, admin, artedge_bk, upwallet];
      let mysetting = ?{
        compute_allocation : ?Nat = null;
        controllers = controllers;
        freezing_threshold : ?Nat = null;
        memory_allocation : ?Nat = null;
      };
      Cycles.add(15_000_000_000);
      let C2 = await Counter.Counter(1);
      // let C2 = await (system Counter.Counter)(#new {settings = mysetting})(1); //(system Lib.<id>)(<exp>)(<exp1>, ...​, <expn>)
      Debug.print("Main balance: " # debug_show(Cycles.balance())); // decreased by around 10_000_000
      let newCanisterprincipal = Principal.fromActor(C2);
      Debug.print("New CanisterID: " #debug_show(newCanisterprincipal)); //this worked can return the canisterID
      let mycanisterID = Principal.toText(newCanisterprincipal);
      mycanisterID
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
    public query func deletePoints (proid : Nat) : async Nat {
      // created points buffer with profile registration
      pointsN.remove(proid); // returns the current profile points count
    };

    stable var profileIdCount: Nat = 0;
    // var profileIdCount: Nat = 0;
    stable var elistCount: Nat = 0;

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
    
    public query func listProfilIds() : async Text {
      var myprofileIds = "";
      for ((key, value) in principalProfiles.entries()) {
        // myprofileIds := "(" # key # ": " # key # "), " # myprofileIds
        // myprofileIds := key # "-" # myprofileIds
        myprofileIds := "{id: " # key # ", pid: "  # key # "}," # myprofileIds
      };
      myprofileIds
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
    
    public func createProfile (profile : Types.Profile) : async Text {
      let id: Nat = profileIdCount;
      let stringId: Text = Nat.toText(profileIdCount);
      profileIdCount+=1;
      profiles.put(stringId, profile);
      principalProfiles.put(stringId, profile.userPrincipal);
      pointsN.add(100);
      let account: Types.Account = {
        userPrincipal = profile.userPrincipal;
        contact = "";
        commissions = "";
        payments = "";
      };
      accounts.put(stringId, account);
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

    //also need to delete all media associated with profile and cansiter
    public func deleteProfile (stringId : Text) : async ?Types.Profile {
      let profileResult : ?Types.Profile = profiles.get(stringId);
      profiles.remove(stringId);
    };  

  //Account
    //CRUD that holds the additional account info
    var accounts = Map.HashMap<Text, Types.Account>(5, Text.equal, Text.hash);
    var principalAccounts = Map.HashMap<Text, Principal>(5, Text.equal, Text.hash);

    stable var accountIdCount: Nat = 0;
    // var accountIdCount: Nat = 0;

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
            // points = account.points;
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
