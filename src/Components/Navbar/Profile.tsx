import { useEffect, useState } from 'react';
import { ProfileModel } from '../../Models/ProfileModel';
import { getProfile } from '../../api';

const Profile = () => {

  const [profile, setProfile] = useState<ProfileModel | undefined>();

  useEffect(() => {
    (async () => {
      const data = await getProfile();
      setProfile(data);
    })();
    }, []);

  return (
    (profile ? <p>{`${profile.firstName} ${profile.lastName}`}</p> : <p>Guest</p>)
  );
}

export default Profile;
