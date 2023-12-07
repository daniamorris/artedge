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

    public type Elist = {
      name: Text;
      email: Text;
    };
    
    public type Pcount = {
      userPrincipal: Principal;
      points: Text;
    };
    
    public type Image = {
      imid: Text;
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

    public type FileBatch = {
      key: Text;
      fileName: Text;
      width: Text;
      height: Text;
    };

    public type BatchUpload = {
      upid: Text;
      pid: Text;
      batch: FileBatch;
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
      contact: Text;
      commissions: Text;
      payments: Text;
      points: Text;
      // nfts: Text;
      // wallet: Text;
      // payouts: Text;
      // transactions: Text;
      // social: Text;
    };
    
    public type User = {
      userPrincipal: Principal;
      profile: Text;
      profileLikes: Text;
      images: Text;
      imageLikes: Text;
      galleries: Text;
      gallerieLikes: Text;
      favorites: Text;
      points: Text;
      settings: Text;
      trainings: Text;
    };
    
};
