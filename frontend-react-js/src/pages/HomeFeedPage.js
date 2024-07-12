import './HomeFeedPage.css';
import React, { useEffect, useState }  from "react";

import DesktopNavigation  from '../components/DesktopNavigation';
import DesktopSidebar     from '../components/DesktopSidebar';
import ActivityFeed from '../components/ActivityFeed';
import ActivityForm from '../components/ActivityForm';
import ReplyForm from '../components/ReplyForm';
import useAuth from '../hooks/useAuth';
import useFetch from '../hooks/useFetch';

export default function HomeFeedPage() {
  const [activities, setActivities] = useState([]);
  const [popped, setPopped] = useState(false);
  const [poppedReply, setPoppedReply] = useState(false);
  const [replyActivity, setReplyActivity] = useState({});
  const user = useAuth();
  const backend_url = `${process.env.REACT_APP_BACKEND_URL}/api/activities/home`;
  const { data, isLoading, error } = useFetch(backend_url);

  useEffect(() => {
    if (data) {
      setActivities(data);
    }
  }, [data]);


  return (
    <article>
      <DesktopNavigation user={user} active={'home'} setPopped={setPopped} />
      <div className='content'>
        <ActivityForm  
          popped={popped}
          setPopped={setPopped} 
          setActivities={setActivities} 
        />
        <ReplyForm 
          activity={replyActivity} 
          popped={poppedReply} 
          setPopped={setPoppedReply} 
          setActivities={setActivities} 
          activities={activities} 
        />
        <ActivityFeed 
          title="Home" 
          setReplyActivity={setReplyActivity} 
          setPopped={setPoppedReply} 
          activities={activities} 
        />
      </div>
      <DesktopSidebar user={user} />
    </article>
  );
}