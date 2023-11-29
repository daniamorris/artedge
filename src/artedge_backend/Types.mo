import Principal "mo:base/Principal";
import Text "mo:base/Text";

module {

    public type Profile = {
      userPrincipal: Principal;
      // avatar: Blob;
      email: Text;
      username: Text;
      alias: Text;
      genre: Text;
      artState: Text;
      interests: Text;
    };
    
    public type Image = {
      key: Text;
      pid: Text;
      image: Text;
      title: Text;
      description: Text;
      tags: Text;
      likes: Text;
    };
    
    public type ImageFeed = {
      key: Text;
      images: Image;
    };

    public type Gallery = {
      key: Text;
      pid: Text;
      images: Image;
      title: Text;
      description: Text;
      tags: Text;
      likes: Text;
    };

    public type Account = {
      userPrincipal: Principal;
      social: Text;
      payments: Text;
      nfts: Text;
      wallet: Text;
      points: Text;
      payouts: Text;
      transactions: Text;
    };
    
};
