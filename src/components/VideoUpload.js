import { useState } from 'react';
import { storage, db } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function VideoUpload() {
  const [video, setVideo] = useState(null);
  const [user] = useAuthState(auth);

  const handleUpload = async () => {
    const storageRef = ref(storage, `videos/${user.uid}/${video.name}`);
    await uploadBytes(storageRef, video);
    const url = await getDownloadURL(storageRef);

    // Guardar metadatos en Firestore
    await addDoc(collection(db, 'videos'), {
      userId: user.uid,
      url,
      createdAt: new Date(),
      status: 'pending'
    });
    alert('Video subido correctamente!');
  };

  return (
    <div>
      <input type="file" accept="video/*" onChange={(e) => setVideo(e.target.files[0])} />
      <button onClick={handleUpload}>Subir Video</button>
    </div>
  );
}