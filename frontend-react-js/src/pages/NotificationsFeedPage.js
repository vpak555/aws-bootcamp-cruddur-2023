import React, { useState, useEffect } from "react";
import "./NotificationsFeedPage.css";

import ActivityFeed from "../components/ActivityFeed";
import ActivityForm from "../components/ActivityForm";
import DesktopNavigation from "../components/DesktopNavigation";
import DesktopSidebar from "../components/DesktopSidebar";
import ReplyForm from "../components/ReplyForm";
import useAuth from "../hooks/useAuth";
import useFetch from "../hooks/useFetch";

export default function NotificationsFeedPage() {
  const [activities, setActivities] = useState([]);
  const [popped, setPopped] = useState(false);
  const [poppedReply, setPoppedReply] = useState(false);
  const [replyActivity, setReplyActivity] = useState({});
  const user = useAuth();
  const backend_url = `${process.env.REACT_APP_BACKEND_URL}/api/activities/notifications`;
  const { data } = useFetch(backend_url);

  useEffect(() => {
    if (data) {
      setActivities(data);
    }
  }, [data]);

  return (
    <article>
      <DesktopNavigation
        user={user}
        active={"notifications"}
        setPopped={setPopped}
      />
      <div className="content">
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
          title="Notifications"
          setReplyActivity={setReplyActivity}
          setPopped={setPoppedReply}
          activities={activities}
        />
      </div>
      <DesktopSidebar user={user} />
    </article>
  );
}
