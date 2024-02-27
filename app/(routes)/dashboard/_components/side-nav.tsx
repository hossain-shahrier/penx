'use client';
import SideNavTop, { TEAM } from './side-nav-top';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useContext, useEffect, useState } from 'react';
import SideNavBottom from './side-nav-bottom';
import { useConvex, useMutation } from 'convex/react';
import { FileListContext } from '@/app/_context/FilesListContext';
import { toast } from 'sonner';
import { api } from '@/convex/_generated/api';

const SideNav = () => {
  const { user }: any = useKindeBrowserClient();
  const createFile = useMutation(api.files.createFile);
  const [activeTeam, setActiveTeam] = useState<TEAM | any>();
  const convex = useConvex();
  const [totalFiles, setTotalFiles] = useState<Number>();
  const { fileList_, setFileList_ } = useContext(FileListContext);
  useEffect(() => {
    activeTeam && getFiles();
  }, [activeTeam]);
  const onFileCreate = (fileName: string) => {
    createFile({
      fileName: fileName,
      teamId: activeTeam?._id,
      createdBy: user?.email,
      archive: false,
      document: '',
      whiteboard: '',
    }).then(
      (resp) => {
        if (resp) {
          getFiles();
          toast('File created successfully!');
        }
      },
      (e) => {
        toast('Error while creating file');
      }
    );
  };

  const getFiles = async () => {
    const result = await convex.query(api.files.getFiles, {
      teamId: activeTeam?._id,
    });
    setFileList_(result);
    setTotalFiles(result?.length);
  };

  return (
    <div
      className=" h-screen 
    fixed w-72 borde-r border-[1px] p-6
    flex flex-col
    "
    >
      <div className="flex-1">
        <SideNavTop
          user={user}
          setActiveTeamInfo={(activeTeam: TEAM) => setActiveTeam(activeTeam)}
        />
      </div>

      <div>
        <SideNavBottom totalFiles={totalFiles} onFileCreate={onFileCreate} />
      </div>
    </div>
  );
};

export default SideNav;
