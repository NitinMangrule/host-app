declare module "remoteApp/MusicLibrary" {
  import { FC } from "react";

  interface MusicLibraryProps {
    userRole?: string;
  }

  const MusicLibrary: FC<MusicLibraryProps>;
  export default MusicLibrary;
}
