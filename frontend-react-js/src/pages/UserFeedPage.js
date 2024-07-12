import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./UserFeedPage.css";

import ActivityFeed from "../components/ActivityFeed";
import ActivityForm from "../components/ActivityForm";
import DesktopNavigation from "../components/DesktopNavigation";
import DesktopSidebar from "../components/DesktopSidebar";
import useAuth from "../hooks/useAuth";
import useFetch from "../hooks/useFetch";

export default function UserFeedPage() {
  const [activities, setActivities] = useState([]);
  const [popped, setPopped] = useState([]);
  const user = useAuth();
  const params = useParams();
  const title = `@${params.handle}`;

  const backend_url = `${process.env.REACT_APP_BACKEND_URL}/api/activities/${title}`;
  const { data } = useFetch(backend_url);

  useEffect(() => {
    if (data) {
      setActivities(data);
    }
  }, [data]);

  return (
    <article>
      <DesktopNavigation user={user} active={"profile"} setPopped={setPopped} />
      <div className="content">
        <ActivityForm popped={popped} setActivities={setActivities} />
        <ActivityFeed title={title} activities={activities} />
      </div>
      <DesktopSidebar user={user} />
    </article>
  );
}
