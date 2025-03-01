import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function VideoList({ isAdmin = false }) {
  const [videos, setVideos] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    let q;
    if (isAdmin) {
      q = query(collection(db, 'videos'));
    } else {
      q = query(collection(db, 'videos'), where('userId', '==', user?.uid));
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setVideos(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, [user, isAdmin]);

  return (
    <div>
      {videos.map(video => (
        <div key={video.id}>
          <video src={video.url} controls width="300" />
          <p>Subido el: {video.createdAt?.toDate().toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
}